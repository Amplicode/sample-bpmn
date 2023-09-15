package com.example.insurancedemo.service.bpm;

import com.example.insurancedemo.entity.Claim;
import com.example.insurancedemo.entity.Policy;
import com.example.insurancedemo.exception.IncorrectPolicyholderException;
import com.example.insurancedemo.repository.ClaimRepository;
import com.example.insurancedemo.repository.PolicyRepository;
import com.example.insurancedemo.support.BPMSupport;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class RegisterClaimJobWorker {

    private static final Logger logger = LoggerFactory.getLogger(RegisterClaimJobWorker.class);

    private final ClaimRepository claimRepository;
    private final PolicyRepository policyRepository;

    public RegisterClaimJobWorker(ClaimRepository claimRepository, PolicyRepository policyRepository) {
        this.claimRepository = claimRepository;
        this.policyRepository = policyRepository;
    }

    @JobWorker(type = "registerClaim")
    public Map<String, Object> registerClaim(ActivatedJob job) {
        logger.info("Registration of Claim started");

        Map<String, Object> variablesMap = job.getVariablesAsMap();

        long policyId = BPMSupport.parseLongVariable(variablesMap, "policyId");

        Policy policy = policyRepository.findById(policyId)
                .orElseThrow(() -> new EntityNotFoundException("Policy with ID = " + policyId + " is not found"));

        long policyholderId = BPMSupport.parseLongVariable(variablesMap, "policyholderId");
        if (Objects.equals(policy.getPolicyholder().getId(), policyholderId)) {
            final String description = (String) variablesMap.get("description");

            Claim claim = new Claim();

            claim.setPolicy(policy);
            claim.setDescription(description);
            claim.setTimestamp(OffsetDateTime.now());

            Claim savedClaim = claimRepository.save(claim);

            Map<String, Object> outputVariablesMap = new HashMap<>();

            outputVariablesMap.put("claimId", savedClaim.getId());

            // Set the notification text
            outputVariablesMap.put("text", "Mr Insured,\n" + "Unfortunately, your insurance claim was rejected.");   // TODO: should be in another place

            outputVariablesMap.put("insuranceSum", BPMSupport.formatBigDecimalVariable(policy.getInsuranceSum()));

            logger.info("Registration of Claim ended");

            return outputVariablesMap;
        } else {
            throw new IncorrectPolicyholderException("Incorrect Policyholder ID for Policy with ID = " + policyId);
        }
    }
}
