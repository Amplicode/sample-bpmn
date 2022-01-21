package com.example.insurancedemo.repository;

import com.example.insurancedemo.entity.Policyholder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyholderRepository extends JpaRepository<Policyholder, Long> {
}