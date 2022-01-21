package com.example.insurancedemo.repository;

import com.example.insurancedemo.entity.PolicyType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyTypeRepository extends JpaRepository<PolicyType, Long> {
}