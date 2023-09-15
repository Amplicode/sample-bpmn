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
public class RaisePremiumJobWorker {

    private static final Logger logger = LoggerFactory.getLogger(RaisePremiumJobWorker.class);

    private final PolicyRepository policyRepository;

    public RaisePremiumJobWorker(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @JobWorker(type = "raisePremium")
    public void raisePremium(ActivatedJob job) {
        logger.info("Insurance Premium increase started");

        Map<String, Object> variablesMap = job.getVariablesAsMap();

        final long policyId = BPMSupport.parseLongVariable(variablesMap, "policyId");
        final Policy policy = policyRepository.findById(policyId).orElseThrow();

        final BigDecimal insurancePremium = BPMSupport.parseBigDecimalVariable(variablesMap, "insurancePremium");

        policy.setInsurancePremium(insurancePremium);

        policyRepository.save(policy);

        logger.info("Insurance Premium increase ended");
    }
}
