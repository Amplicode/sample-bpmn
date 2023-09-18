package com.example.insurancedemo.dto;

import java.math.BigDecimal;

public class PolicyOutputDto {

    private Long id;
    private String name;
    private PolicyTypeDto policyType;
    private PolicyholderDto policyholder;
    private BigDecimal insurancePremium;
    private BigDecimal insuranceSum;
    private String caseDescription;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PolicyTypeDto getPolicyType() {
        return policyType;
    }

    public void setPolicyType(PolicyTypeDto policyType) {
        this.policyType = policyType;
    }

    public PolicyholderDto getPolicyholder() {
        return policyholder;
    }

    public void setPolicyholder(PolicyholderDto policyholder) {
        this.policyholder = policyholder;
    }

    public BigDecimal getInsurancePremium() {
        return insurancePremium;
    }

    public void setInsurancePremium(BigDecimal insurancePremium) {
        this.insurancePremium = insurancePremium;
    }

    public BigDecimal getInsuranceSum() {
        return insuranceSum;
    }

    public void setInsuranceSum(BigDecimal insuranceSum) {
        this.insuranceSum = insuranceSum;
    }

    public String getCaseDescription() {
        return caseDescription;
    }

    public void setCaseDescription(String caseDescription) {
        this.caseDescription = caseDescription;
    }
}
