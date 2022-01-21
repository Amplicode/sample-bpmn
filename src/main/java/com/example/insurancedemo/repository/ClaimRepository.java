package com.example.insurancedemo.repository;

import com.example.insurancedemo.entity.Claim;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClaimRepository extends JpaRepository<Claim, Long> {
}