package com.example.insurancedemo.config;

import io.camunda.operate.CamundaOperateClient;
import io.camunda.operate.exception.OperateException;
import io.camunda.tasklist.CamundaTaskListClient;
import io.camunda.tasklist.exception.TaskListException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CamundaConfiguration {

    @Value("${tasklist.client.base-url}")
    private String taskListBaseUrl;
    @Value("${tasklist.client.keycloak-url}")
    private String taskListKeycloakUrl;
    @Value("${tasklist.client.keycloak-realm}")
    private String taskListKeycloakRealm;
    @Value("${tasklist.client.clientId}")
    private String taskListClientId;
    @Value("${tasklist.client.clientSecret}")
    private String taskListClientSecret;

    @Value("${operate.client.base-url}")
    private String operateBaseUrl;
    @Value("${operate.client.keycloak-url}")
    private String operateKeycloakUrl;
    @Value("${operate.client.keycloak-realm}")
    private String operateKeycloakRealm;
    @Value("${operate.client.clientId}")
    private String operateClientId;
    @Value("${operate.client.clientSecret}")
    private String operateClientSecret;

    @Bean
    public CamundaTaskListClient camundaTaskListClient() throws TaskListException {
        io.camunda.tasklist.auth.SelfManagedAuthentication authentication = new io.camunda.tasklist.auth.SelfManagedAuthentication()
                .clientId(taskListClientId)
                .clientSecret(taskListClientSecret)
                .keycloakUrl(taskListKeycloakUrl)
                .keycloakRealm(taskListKeycloakRealm);

        return new CamundaTaskListClient.Builder()
                .authentication(authentication)
                .taskListUrl(taskListBaseUrl)
                .build();
    }

    @Bean
    public CamundaOperateClient camundaOperateClient() throws OperateException {
        io.camunda.operate.auth.SelfManagedAuthentication authentication = new io.camunda.operate.auth.SelfManagedAuthentication()
                .clientId(operateClientId)
                .clientSecret(operateClientSecret)
                .keycloakUrl(operateKeycloakUrl)
                .keycloakRealm(operateKeycloakRealm);

        return new CamundaOperateClient.Builder()
                .authentication(authentication)
                .operateUrl(operateBaseUrl)
                .build();
    }
}
