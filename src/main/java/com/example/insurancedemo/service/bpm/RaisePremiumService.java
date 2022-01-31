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
public class RaisePremiumService implements JavaDelegate {

    private static final Logger logger = LoggerFactory.getLogger(RaisePremiumService.class);

    private final PolicyRepository policyRepository;

    public RaisePremiumService(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        logger.info("Insurance Premium increase started");

        final long policyId = BPMSupport.parseLongVariable(execution, "policyId");
        final Policy policy = policyRepository.getById(policyId);

        final BigDecimal insurancePremium = BPMSupport.parseBigDecimalVariable(execution, "insurancePremium");

        policy.setInsurancePremium(insurancePremium);

        policyRepository.save(policy);

        logger.info("Insurance Premium increase ended");
    }
}
