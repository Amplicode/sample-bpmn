package com.example.insurancedemo.support;

import org.camunda.bpm.engine.delegate.DelegateExecution;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.ParseException;
import java.util.Random;

public class BPMSupport {

    private static final Random random;

    private static final DecimalFormat decimalFormat;

    static {
        random = new Random();
        final DecimalFormatSymbols dfs = new DecimalFormatSymbols();
        dfs.setDecimalSeparator('.');
        dfs.setGroupingSeparator(',');
        decimalFormat = new DecimalFormat("#0.00E0", dfs);
        decimalFormat.setParseBigDecimal(true);
    }

    public static BigDecimal randomBigDecimal(BigDecimal range) {
        final double doubleRange = range.add(BigDecimal.valueOf(Math.pow(10, -(range.scale() + 1)))).doubleValue();
        final BigDecimal amount = BigDecimal.valueOf(random.nextDouble() * doubleRange);
        return amount.setScale(range.scale(), RoundingMode.HALF_UP);
    }

    public static long parseLongVariable(DelegateExecution execution, String variableName) {
        return Long.parseLong((String) execution.getVariable(variableName));
    }

    public static BigDecimal parseBigDecimalVariable(DelegateExecution execution, String variableName) {
        try {
            return (BigDecimal) decimalFormat.parse((String) execution.getVariable(variableName));
        } catch (ParseException e) {
            throw new RuntimeException("Variable " + variableName + " can not be parsed correctly");
        }
    }

    public static String formatBigDecimal(BigDecimal number) {
        return decimalFormat.format(number);
    }
}
