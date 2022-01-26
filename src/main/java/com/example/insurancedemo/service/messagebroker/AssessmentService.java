package com.example.insurancedemo.service.messagebroker;

import org.camunda.bpm.engine.delegate.JavaDelegate;

public interface AssessmentService extends JavaDelegate {

    boolean assessClaim(Long claimId);

    String checkStatus(Long assessmentId);
}
