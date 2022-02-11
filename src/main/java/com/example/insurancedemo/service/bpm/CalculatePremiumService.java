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
import java.math.MathContext;

@Service
public class CalculatePremiumService implements JavaDelegate {

    private static final Logger logger = LoggerFactory.getLogger(CalculatePremiumService.class);

    private final PolicyRepository policyRepository;

    public CalculatePremiumService(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        logger.info("Insurance Premium calculation started");

        final long policyId = BPMSupport.parseLongVariable(execution, "policyId");

        final Policy policy = policyRepository.getById(policyId);

        final BigDecimal insurancePremium = policy.getInsurancePremium();

        logger.info("Former Insurance Premium is " + BPMSupport.formatBigDecimal(insurancePremium));

//        final BigDecimal insuranceSum = policy.getInsuranceSum();

//        logger.info("Insurance Sum is " + BPMSupport.formatBigDecimal(insuranceSum));

//        final BigDecimal amount = BPMSupport.parseBigDecimalVariable(execution, "amount");

//        final BigDecimal unchangedPremiumLimit = insuranceSum.divide(BigDecimal.valueOf(2), new MathContext(insuranceSum.precision()));

//        logger.info("Limit of unchanged Premium is " + BPMSupport.formatBigDecimal(unchangedPremiumLimit));

//        if (amount.compareTo(unchangedPremiumLimit) >= 0) {
        final BigDecimal newInsurancePremium = insurancePremium.multiply(BigDecimal.valueOf(2),
                new MathContext(insurancePremium.precision()));

        execution.setVariable("insurancePremium", BPMSupport.formatBigDecimalVariable(newInsurancePremium));

        // Variable "text" is for possible notification creation; maybe it's better to put out this functionality into
        // a suitable service task.
        execution.setVariable("text", "Mr Insured,\n" +
                "The payment on your insurance claim exceeded the limit. The future insurance premium is " +
                "set to " + newInsurancePremium + ".");

        execution.setVariable("isPremiumChanged", true);

        logger.info("Premium changed and is " + BPMSupport.formatBigDecimal(newInsurancePremium) + " now.");
//        } else {
//            execution.setVariable("isPremiumChanged", false);
//            logger.info("Premium did not change");
//        }
        logger.info("Insurance Premium calculation ended");
    }
}
