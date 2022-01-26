package com.example.insurancedemo.service.bpm;

import com.example.insurancedemo.entity.Policy;
import com.example.insurancedemo.repository.PolicyRepository;
import com.example.insurancedemo.support.BPMSupport;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class RaisePremiumService implements JavaDelegate {

    private final PolicyRepository policyRepository;

    public RaisePremiumService(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @Override
    public void execute(DelegateExecution execution) throws Exception {

        final long policyId = BPMSupport.parseLongVariable(execution, "policyId");
        final Policy policy = policyRepository.getById(policyId);

        final BigDecimal insurancePremium = (BigDecimal) execution.getVariable("insurancePremium");

        policy.setInsurancePremium(insurancePremium);

        policyRepository.save(policy);

        execution.setVariable("insurancePremium", insurancePremium);
    }
}
