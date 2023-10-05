package com.example.insurancedemo.camunda.model;

public enum CamundaTaskState {
    CREATED("CREATED"),

    COMPLETED("COMPLETED"),

    CANCELED("CANCELED");

    private String value;

    CamundaTaskState(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }

    public static CamundaTaskState fromValue(String value) {
        for (CamundaTaskState b : CamundaTaskState.values()) {
            if (b.value.equals(value)) {
                return b;
            }
        }
        throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
}
