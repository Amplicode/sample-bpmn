package com.example.insurancedemo.service.messagebroker;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class SimpleAssessmentServiceImpl implements AssessmentService {

    private final static Logger logger = LoggerFactory.getLogger(AssessmentService.class);

    private final Random random = new Random();

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        logger.info("Assessment started");

        final boolean isClaimAccepted = assessClaim();
        if (!isClaimAccepted) {
            // Set the notification text
            execution.setVariable("text", "Mr Insured,\n" +
                    "Unfortunately, your insurance claim was rejected.");
        }
        execution.setVariable("isClaimAccepted", isClaimAccepted);

        logger.info("Assessment ended");
    }

    @Override
    public boolean assessClaim() {
        return random.nextBoolean();
    }

    @Override
    public String checkStatus(Long assessmentId) {
        return null;
    }
}
