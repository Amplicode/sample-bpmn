package com.example.insurancedemo;

import io.camunda.zeebe.spring.client.EnableZeebeClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
//@EnableZeebeClient
public class InsuranceDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(InsuranceDemoApplication.class, args);
    }
}
