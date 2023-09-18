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
import java.math.MathContext;
import java.util.HashMap;
import java.util.Map;

@Service
public class CalculatePremiumJobWorker {

    private static final Logger logger = LoggerFactory.getLogger(CalculatePremiumJobWorker.class);

    private final PolicyRepository policyRepository;

    public CalculatePremiumJobWorker(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @JobWorker(type = "calculatePremium")
    public Map<String, Object> calculatePremium(ActivatedJob job) throws Exception {
        logger.info("Insurance Premium calculation started");

        Map<String, Object> variablesMap = job.getVariablesAsMap();

        final long policyId = BPMSupport.parseLongVariable(variablesMap, "policyId");

        final Policy policy = policyRepository.findById(policyId).orElseThrow();

        final BigDecimal insurancePremium = policy.getInsurancePremium();

        logger.info("Former Insurance Premium is " + BPMSupport.formatBigDecimal(insurancePremium));

        final BigDecimal newInsurancePremium = insurancePremium.multiply(BigDecimal.valueOf(2),
                new MathContext(insurancePremium.precision()));

        Map<String, Object> outputVariablesMap = new HashMap<>();

        outputVariablesMap.put("insurancePremium", BPMSupport.formatBigDecimalVariable(newInsurancePremium));

        // Variable "text" is for possible notification creation; maybe it's better to put out this functionality into
        // a suitable service task.
        outputVariablesMap.put("text", "Mr Insured,\n" +
                "The payment on your insurance claim exceeded the limit. The future insurance premium is " +
                "set to " + newInsurancePremium + ".");

        outputVariablesMap.put("isPremiumChanged", true);

        logger.info("Premium changed and is " + BPMSupport.formatBigDecimal(newInsurancePremium) + " now.");

        logger.info("Insurance Premium calculation ended");
        return outputVariablesMap;
    }
}
