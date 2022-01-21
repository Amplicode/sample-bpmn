package com.example.insurancedemo.repository;

import com.example.insurancedemo.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
}