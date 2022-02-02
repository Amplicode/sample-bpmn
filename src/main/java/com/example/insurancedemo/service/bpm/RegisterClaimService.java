package com.example.insurancedemo.service.bpm;

import com.example.insurancedemo.entity.Claim;
import com.example.insurancedemo.entity.Policy;
import com.example.insurancedemo.exception.IncorrectPolicyholderException;
import com.example.insurancedemo.repository.ClaimRepository;
import com.example.insurancedemo.repository.PolicyRepository;
import com.example.insurancedemo.support.BPMSupport;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Optional;

@Service
public class RegisterClaimService implements JavaDelegate {

    private static final Logger logger = LoggerFactory.getLogger(RegisterClaimService.class);

    private final ClaimRepository claimRepository;
    private final PolicyRepository policyRepository;

    public RegisterClaimService(ClaimRepository claimRepository, PolicyRepository policyRepository) {
        this.claimRepository = claimRepository;
        this.policyRepository = policyRepository;
    }

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        logger.info("Registration of Claim started");

        final long policyId = BPMSupport.parseLongVariable(execution, "policyId");

        final Optional<Policy> policyOptional = policyRepository.findById(policyId);

        if (policyOptional.isEmpty()) {
            throw new EntityNotFoundException("Policy with ID = " + policyId + " is not found");
        }

        final Policy policy = policyOptional.get();

        final long policyholderId = BPMSupport.parseLongVariable(execution, "policyholderId");

        if (policy.getPolicyholder().getId().equals(policyholderId)) {
            final String description = (String) execution.getVariable("description");
            final OffsetDateTime now = OffsetDateTime.now();

            final Claim claim = new Claim();

            claim.setPolicy(policy);
            claim.setDescription(description);
            claim.setTimestamp(now);

            final Claim savedClaim = claimRepository.save(claim);

            execution.setVariable("claimId", savedClaim.getId());

            // Set the notification text
            execution.setVariable("text", "Mr Insured,\n" +
                    "Unfortunately, your insurance claim was rejected.");   // TODO: should be in another place

            final BigDecimal insuranceSum = policy.getInsuranceSum();

            execution.setVariable("insuranceSum", BPMSupport.formatBigDecimalVariable(insuranceSum));

            logger.info("Registration of Claim ended");
        } else {
            throw new IncorrectPolicyholderException("Incorrect Policyholder ID for Policy with ID = " + policyId);
        }
    }
}
