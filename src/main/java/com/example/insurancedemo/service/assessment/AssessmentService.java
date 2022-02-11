package com.example.insurancedemo.service.assessment;

import org.camunda.bpm.engine.delegate.JavaDelegate;

public interface AssessmentService extends JavaDelegate {

    boolean assessClaim();

    String checkStatus(Long assessmentId);
}
