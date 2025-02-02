package com.example.insurancedemo.dto;

import java.time.OffsetDateTime;

public class ClaimInputDto {

    private Long id;
    private PolicyInputDto policy;
    private OffsetDateTime timestamp;
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PolicyInputDto getPolicy() {
        return policy;
    }

    public void setPolicy(PolicyInputDto policy) {
        this.policy = policy;
    }

    public OffsetDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(OffsetDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
