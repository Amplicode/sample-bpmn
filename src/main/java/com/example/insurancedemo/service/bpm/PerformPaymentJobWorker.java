package com.example.insurancedemo.service.bpm;

import com.example.insurancedemo.entity.Policy;
import com.example.insurancedemo.repository.PolicyRepository;
import com.example.insurancedemo.support.BPMSupport;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class PerformPaymentJobWorker {

    private static final Logger logger = LoggerFactory.getLogger(PerformPaymentJobWorker.class);

    private final PolicyRepository policyRepository;

    public PerformPaymentJobWorker(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @JobWorker(type = "performPayment")
    public void performPayment(ActivatedJob job) throws Exception {
        logger.info("Payment performing started");

        Map<String, Object> variablesMap = job.getVariablesAsMap();

        final long policyId = BPMSupport.parseLongVariable(variablesMap, "policyId");
        final BigDecimal amount = BPMSupport.parseBigDecimalVariable(variablesMap, "amount");

        final Policy policy = policyRepository.findById(policyId).orElseThrow();

        final BigDecimal formerInsuranceSum = policy.getInsuranceSum();

        final BigDecimal newInsuranceSum = formerInsuranceSum.subtract(amount);

        policy.setInsuranceSum(newInsuranceSum);

        logger.info("New Insurance Sum = " + BPMSupport.formatBigDecimal(newInsuranceSum) + ", i.e. " + BPMSupport.formatBigDecimal(formerInsuranceSum) + " (former Insurance Sum) - " + BPMSupport.formatBigDecimal(amount) + " (Payment Amount)");

        policyRepository.save(policy);

        logger.info("Payment performing ended. Business Process completed");
    }
}
