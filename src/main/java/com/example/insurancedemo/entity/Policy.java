package com.example.insurancedemo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "policy")
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "policy_type_id", nullable = false)
    private PolicyType policyType;

    @ManyToOne(optional = false)
    @JoinColumn(name = "policy_holder_id", nullable = false)
    private PolicyHolder policyHolder;

    @Column(name = "insurance_premium", nullable = false, precision = 19, scale = 2)
    private BigDecimal insurancePremium;

    @Column(name = "insurance_sum", nullable = false, precision = 19, scale = 2)
    private BigDecimal insuranceSum;

    @Column(name = "case_description", length = 1024)
    private String caseDescription;

    public PolicyHolder getPolicyHolder() {
        return policyHolder;
    }

    public void setPolicyHolder(PolicyHolder policyHolder) {
        this.policyHolder = policyHolder;
    }

    public String getCaseDescription() {
        return caseDescription;
    }

    public void setCaseDescription(String caseDescription) {
        this.caseDescription = caseDescription;
    }

    public BigDecimal getInsuranceSum() {
        return insuranceSum;
    }

    public void setInsuranceSum(BigDecimal insuranceSum) {
        this.insuranceSum = insuranceSum;
    }

    public BigDecimal getInsurancePremium() {
        return insurancePremium;
    }

    public void setInsurancePremium(BigDecimal insurancePremium) {
        this.insurancePremium = insurancePremium;
    }

    public PolicyType getPolicyType() {
        return policyType;
    }

    public void setPolicyType(PolicyType policyType) {
        this.policyType = policyType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}