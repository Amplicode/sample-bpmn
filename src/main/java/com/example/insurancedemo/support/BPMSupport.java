package com.example.insurancedemo.support;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.ParseException;
import java.util.Map;
import java.util.Random;

public class BPMSupport {

    private static final Random random;

    private static final DecimalFormat variableDecimalFormat;

    private static final DecimalFormat decimalFormat;

    static {
        random = new Random();

        final DecimalFormatSymbols variableDFS = new DecimalFormatSymbols();
        variableDFS.setDecimalSeparator('.');
        variableDFS.setGroupingSeparator(',');
        variableDecimalFormat = new DecimalFormat("#0.00E0", variableDFS);
        variableDecimalFormat.setParseBigDecimal(true);

        final DecimalFormatSymbols DFS = new DecimalFormatSymbols();
        DFS.setDecimalSeparator('.');
        DFS.setGroupingSeparator(',');
        decimalFormat = new DecimalFormat("0.00", DFS);
    }

    public static BigDecimal randomBigDecimal(BigDecimal range) {
        final double doubleRange = range.add(BigDecimal.valueOf(Math.pow(10, -(range.scale() + 1)))).doubleValue();
        final BigDecimal amount = BigDecimal.valueOf(random.nextDouble() * doubleRange);
        return amount.setScale(range.scale(), RoundingMode.HALF_UP);
    }

    public static long parseLongVariable(Map<String, Object> variablesMap, String variableName) {
        return Long.parseLong((String) variablesMap.get(variableName));
    }

    public static BigDecimal parseBigDecimalVariable(Map<String, Object> variablesMap, String variableName) {
        try {
            return (BigDecimal) variableDecimalFormat.parse((String) variablesMap.get(variableName));
        } catch (ParseException e) {
            throw new RuntimeException("Variable " + variableName + " can not be parsed correctly");
        }
    }

    public static String formatBigDecimalVariable(BigDecimal bd) {
        return variableDecimalFormat.format(bd);
    }

    public static String formatBigDecimal(BigDecimal bd) {
        return decimalFormat.format(bd);
    }

}
