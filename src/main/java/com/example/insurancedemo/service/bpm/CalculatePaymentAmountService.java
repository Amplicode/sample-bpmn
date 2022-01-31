package com.example.insurancedemo.service.bpm;

import com.example.insurancedemo.entity.Claim;
import com.example.insurancedemo.entity.Policy;
import com.example.insurancedemo.exception.ClaimNotFoundException;
import com.example.insurancedemo.repository.ClaimRepository;
import com.example.insurancedemo.support.BPMSupport;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class CalculatePaymentAmountService implements JavaDelegate {

    private static final Logger logger = LoggerFactory.getLogger(CalculatePaymentAmountService.class);

    private final ClaimRepository claimRepository;

    public CalculatePaymentAmountService(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        logger.info("Payment Amount calculation started");

        final long claimId = (long) execution.getVariable("claimId");

        final Optional<Claim> claimOptional = claimRepository.findById(claimId);

        if (claimOptional.isPresent()) {
            final Claim claim = claimOptional.get();
            final Policy policy = claim.getPolicy();

            final BigDecimal insuranceSum = policy.getInsuranceSum();

            final BigDecimal amount = BPMSupport.randomBigDecimal(insuranceSum);

            final String formattedAmount = BPMSupport.formatBigDecimalVariable(amount);

            logger.info("Calculated Payment Amount = " + BPMSupport.formatBigDecimal(amount));

            execution.setVariable("amount", formattedAmount);

            logger.info("Payment Amount calculation ended");
        } else {
            throw new ClaimNotFoundException("Claim with ID " + claimId + " is not found");
        }
    }
}
