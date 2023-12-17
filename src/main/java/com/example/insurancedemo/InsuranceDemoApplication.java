package com.example.insurancedemo;

import io.camunda.zeebe.spring.client.annotation.Deployment;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
@Deployment(resources = "classpath*:/bpmn/**/*.bpmn")
public class InsuranceDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(InsuranceDemoApplication.class, args);
    }
}
