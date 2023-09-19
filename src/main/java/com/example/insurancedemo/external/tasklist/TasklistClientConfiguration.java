package com.example.insurancedemo.external.tasklist;

import com.example.insurancedemo.external.tasklist.ApiClient;
import com.example.insurancedemo.external.tasklist.api.TaskApi;
import com.example.insurancedemo.external.tasklist.api.VariablesApi;
import com.example.insurancedemo.external.tasklist.api.FormApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Instantiates generated "tasklist" OpenAPI client classes as beans.
 */
@Configuration
public class TasklistClientConfiguration {

    @Bean("tasklistApiClient")
    public ApiClient apiClient(
            @Value("${sample-bpmn.openapi.client.tasklist.base-path}") String basePath,
            @Value("${sample-bpmn.openapi.client.tasklist.api-key}") String apiKey
    ) {
        ApiClient client = new ApiClient();
        client.setBasePath(basePath);
        client.setApiKey(apiKey);

        return client;
    }

    @Bean("tasklistTaskApi")
    public TaskApi taskApi(ApiClient apiClient) {
        return new TaskApi(apiClient);
    }

    @Bean("tasklistVariablesApi")
    public VariablesApi variablesApi(ApiClient apiClient) {
        return new VariablesApi(apiClient);
    }

    @Bean("tasklistFormApi")
    public FormApi formApi(ApiClient apiClient) {
        return new FormApi(apiClient);
    }
}

