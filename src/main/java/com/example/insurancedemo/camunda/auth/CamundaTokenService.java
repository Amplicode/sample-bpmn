package com.example.insurancedemo.camunda.auth;


import com.example.insurancedemo.camunda.TaskListClientConfigurationProperties;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.builder.api.DefaultApi20;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.github.scribejava.core.oauth2.clientauthentication.ClientAuthentication;
import com.github.scribejava.core.oauth2.clientauthentication.RequestBodyAuthenticationScheme;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@Component
public class CamundaTokenService {
    private final TaskListClientConfigurationProperties taskListProperties;

    public CamundaTokenService(TaskListClientConfigurationProperties taskListProperties) {
        this.taskListProperties = taskListProperties;
    }

    public String getTaskListAccessToken() {
        try (OAuth20Service service = new ServiceBuilder(taskListProperties.getClientId())
                .apiSecret(taskListProperties.getClientSecret())
                .build(new CamundaSelfManagedApi(taskListProperties.getAuthUrl()))) {
            OAuth2AccessToken accessToken = service.getAccessTokenClientCredentialsGrant();
            return accessToken.getAccessToken();
        } catch (IOException | ExecutionException | InterruptedException e) {
            throw new RuntimeException("Unable to retrieve access token", e);
        }
    }

    public static class CamundaSelfManagedApi extends DefaultApi20 {
        private final String authUrl;

        public CamundaSelfManagedApi(String authUrl) {
            this.authUrl = authUrl;
        }

        @Override
        public String getAccessTokenEndpoint() {
            return authUrl;
        }

        @Override
        protected String getAuthorizationBaseUrl() {
            return authUrl;
        }

        @Override
        public ClientAuthentication getClientAuthentication() {
            return RequestBodyAuthenticationScheme.instance();
        }
    }
}
