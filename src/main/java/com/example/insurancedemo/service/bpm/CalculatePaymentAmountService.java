package com.example.insurancedemo.service.bpm;

import com.example.insurancedemo.entity.Claim;
import com.example.insurancedemo.entity.Policy;
import com.example.insurancedemo.exception.ClaimNotFoundException;
import com.example.insurancedemo.repository.ClaimRepository;
import com.example.insurancedemo.support.BPMSupport;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class CalculatePaymentAmountService implements JavaDelegate {

    private final ClaimRepository claimRepository;

    public CalculatePaymentAmountService(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        final long claimId = (long) execution.getVariable("claimId");

        final Optional<Claim> claimOptional = claimRepository.findById(claimId);

        if (claimOptional.isPresent()) {
            final Claim claim = claimOptional.get();
            final Policy policy = claim.getPolicy();

            final BigDecimal insuranceSum = policy.getInsuranceSum();

            final BigDecimal amount = BPMSupport.randomBigDecimal(insuranceSum);

            execution.setVariable("amount", BPMSupport.formatBigDecimal(amount));
        } else {
            throw new ClaimNotFoundException("Claim with ID " + claimId + " is not found");
        }
    }
}
