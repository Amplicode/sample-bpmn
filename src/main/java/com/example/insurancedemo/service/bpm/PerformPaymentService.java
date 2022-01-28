package com.example.insurancedemo.service.bpm;

import com.example.insurancedemo.entity.Policy;
import com.example.insurancedemo.repository.PolicyRepository;
import com.example.insurancedemo.support.BPMSupport;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PerformPaymentService implements JavaDelegate {

    private final PolicyRepository policyRepository;

    public PerformPaymentService(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        final long policyId = BPMSupport.parseLongVariable(execution, "policyId");
        final BigDecimal amount = BPMSupport.parseBigDecimalVariable(execution, "amount");

        final Policy policy = policyRepository.getById(policyId);

        policy.setInsuranceSum(policy.getInsuranceSum().subtract(amount));

        policyRepository.save(policy);
    }
}
