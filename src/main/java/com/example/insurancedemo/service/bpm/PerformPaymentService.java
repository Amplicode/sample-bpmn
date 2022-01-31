package com.example.insurancedemo.service.bpm;

import com.example.insurancedemo.entity.Policy;
import com.example.insurancedemo.repository.PolicyRepository;
import com.example.insurancedemo.support.BPMSupport;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PerformPaymentService implements JavaDelegate {

    private static final Logger logger = LoggerFactory.getLogger(PerformPaymentService.class);

    private final PolicyRepository policyRepository;

    public PerformPaymentService(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        logger.info("Payment performing started");

        final long policyId = BPMSupport.parseLongVariable(execution, "policyId");
        final BigDecimal amount = BPMSupport.parseBigDecimalVariable(execution, "amount");

        final Policy policy = policyRepository.getById(policyId);

        final BigDecimal formerInsuranceSum = policy.getInsuranceSum();

        final BigDecimal newInsuranceSum = formerInsuranceSum.subtract(amount);

        policy.setInsuranceSum(newInsuranceSum);

        logger.info("New Insurance Sum = " + BPMSupport.formatBigDecimal(newInsuranceSum) + ", i.e. " +
                BPMSupport.formatBigDecimal(formerInsuranceSum) + " (former Insurance Sum) - " +
                BPMSupport.formatBigDecimal(amount) + " (Payment Amount)");

        policyRepository.save(policy);

        logger.info("Payment performing ended. Business Process completed");
    }
}
