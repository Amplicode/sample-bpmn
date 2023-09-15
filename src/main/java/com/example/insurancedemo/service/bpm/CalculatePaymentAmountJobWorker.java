package com.example.insurancedemo.service.bpm;

import com.example.insurancedemo.entity.Claim;
import com.example.insurancedemo.entity.Policy;
import com.example.insurancedemo.exception.ClaimNotFoundException;
import com.example.insurancedemo.repository.ClaimRepository;
import com.example.insurancedemo.support.BPMSupport;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;

@Service
public class CalculatePaymentAmountJobWorker {

    private static final Logger logger = LoggerFactory.getLogger(CalculatePaymentAmountJobWorker.class);

    private final ClaimRepository claimRepository;

    public CalculatePaymentAmountJobWorker(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }

    @JobWorker(type = "calculatePaymentAmount")
    public Map<String, Object> calculatePaymentAmount(ActivatedJob job) throws Exception {
        logger.info("Payment Amount calculation started");

        Map<String, Object> variablesMap = job.getVariablesAsMap();

        final long claimId = (long) variablesMap.get("claimId");

        final Optional<Claim> claimOptional = claimRepository.findById(claimId);

        if (claimOptional.isPresent()) {
            final Claim claim = claimOptional.get();
            final Policy policy = claim.getPolicy();

            final BigDecimal insuranceSum = policy.getInsuranceSum();

            final BigDecimal amount = BPMSupport.randomBigDecimal(insuranceSum);

            final String formattedAmount = BPMSupport.formatBigDecimalVariable(amount);

            logger.info("Calculated Payment Amount = " + BPMSupport.formatBigDecimal(amount));
            logger.info("Payment Amount calculation ended");

            return Map.of("amount", formattedAmount);
        } else {
            throw new ClaimNotFoundException("Claim with ID " + claimId + " is not found");
        }
    }
}
