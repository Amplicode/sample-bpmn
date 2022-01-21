package com.example.insurancedemo.dto;

import java.math.BigDecimal;

public class PolicyInputDto {

    private Long id;
    private String name;
    private Long policyType;    // ID
    private Long policyholder;  // ID
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

    public Long getPolicyType() {
        return policyType;
    }

    public void setPolicyType(Long policyType) {
        this.policyType = policyType;
    }

    public Long getPolicyholder() {
        return policyholder;
    }

    public void setPolicyholder(Long policyholder) {
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
