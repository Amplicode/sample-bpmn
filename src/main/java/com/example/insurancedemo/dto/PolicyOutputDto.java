package com.example.insurancedemo.dto;

public class PolicyOutputDto {

    private Long id;
    private String name;
    private PolicyTypeDto policyType;
    private PolicyholderDto policyholder;
    private String insurancePremium;
    private String insuranceSum;
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

    public String getInsurancePremium() {
        return insurancePremium;
    }

    public void setInsurancePremium(String insurancePremium) {
        this.insurancePremium = insurancePremium;
    }

    public String getInsuranceSum() {
        return insuranceSum;
    }

    public void setInsuranceSum(String insuranceSum) {
        this.insuranceSum = insuranceSum;
    }

    public String getCaseDescription() {
        return caseDescription;
    }

    public void setCaseDescription(String caseDescription) {
        this.caseDescription = caseDescription;
    }
}
