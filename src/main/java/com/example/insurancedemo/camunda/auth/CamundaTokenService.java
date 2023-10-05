package com.example.insurancedemo.camunda.auth;


import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.builder.api.DefaultApi20;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.oauth.OAuth20Service;
import com.github.scribejava.core.oauth2.clientauthentication.ClientAuthentication;
import com.github.scribejava.core.oauth2.clientauthentication.RequestBodyAuthenticationScheme;
import io.camunda.zeebe.spring.client.properties.ZeebeClientConfigurationProperties;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@Component
public class CamundaTokenService {
    private final String clientId;
    private final String clientSecret;


    public CamundaTokenService(ZeebeClientConfigurationProperties zeebeeProperties) {
        this.clientId = "amplicode";
        this.clientSecret = "SIzeGhAJz64mX4w791TvRWNPIwC9vFyh";
    }

    public String getAccessToken() {
        try (OAuth20Service service = new ServiceBuilder(clientId)
                .apiSecret(clientSecret)
                .build(CamundaSelfManagedApi.instance())) {
            OAuth2AccessToken accessToken = service.getAccessTokenClientCredentialsGrant();
            return accessToken.getAccessToken();
        } catch (IOException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

//    public static class CamundaCloudApi extends DefaultApi20 {
//        protected CamundaCloudApi() {
//        }
//
//        private static class InstanceHolder {
//
//            private static final CamundaCloudApi INSTANCE = new CamundaCloudApi();
//        }
//
//        public static CamundaCloudApi instance() {
//            return CamundaCloudApi.InstanceHolder.INSTANCE;
//        }
//
//        @Override
//        public String getAccessTokenEndpoint() {
//            return "https://login.cloud.camunda.io/oauth/token";
//        }
//
//        @Override
//        protected String getAuthorizationBaseUrl() {
//            return "https://login.cloud.camunda.io/oauth/token";
//        }
//
//        @Override
//        public ClientAuthentication getClientAuthentication() {
//            return new RequestBodyAuthenticationScheme() {
//                @Override
//                public void addClientAuthentication(OAuthRequest request, String apiKey, String apiSecret) {
//                    super.addClientAuthentication(request, apiKey, apiSecret);
//                    request.addParameter("audience", "tasklist.camunda.io");
//                }
//            };
//        }
//    }

    public static class CamundaSelfManagedApi extends DefaultApi20 {
        private final String authUrl;

        public CamundaSelfManagedApi(String authUrl) {
            this.authUrl = authUrl;
        }

        @Override
        public String getAccessTokenEndpoint() {
            return "http://keycloak.camunda.127.0.0.1.nip.io/auth/realms/camunda-platform/protocol/openid-connect/token";
        }

        @Override
        protected String getAuthorizationBaseUrl() {
            return "http://keycloak.camunda.127.0.0.1.nip.io/auth/realms/camunda-platform/protocol/openid-connect/token";
        }

        @Override
        public ClientAuthentication getClientAuthentication() {
            return RequestBodyAuthenticationScheme.instance();
    }

}
