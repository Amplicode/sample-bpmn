package com.example.insurancedemo.support;

import org.camunda.bpm.engine.delegate.DelegateExecution;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Random;

public class BPMSupport {

    private static final Random random = new Random();

    public static BigDecimal randomBigDecimal(BigDecimal range) {
        final double doubleRange = range.add(BigDecimal.valueOf(Math.pow(10, -(range.scale() + 1)))).doubleValue();
        final BigDecimal amount = BigDecimal.valueOf(random.nextDouble() * doubleRange);
        return amount.setScale(range.scale(), RoundingMode.HALF_UP);
    }

    public static long parseLongVariable(DelegateExecution execution, String variableName) {
        return Long.parseLong((String) execution.getVariable(variableName));
    }
}
