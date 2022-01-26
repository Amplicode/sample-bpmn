package com.example.insurancedemo.service.messagebroker;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class SimpleAssessmentServiceImpl implements AssessmentService {

    private final Random random = new Random();

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        final long claimId = (long) execution.getVariable("claimId");
        execution.setVariable("isClaimAccepted", assessClaim(claimId));
    }

    @Override
    public boolean assessClaim(Long claimId) {
        return random.nextBoolean();
    }

    @Override
    public String checkStatus(Long assessmentId) {
        return null;
    }
}
