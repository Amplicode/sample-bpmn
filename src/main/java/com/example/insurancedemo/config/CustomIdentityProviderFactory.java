//package com.example.insurancedemo.config;
//
//import com.example.insurancedemo.security.CustomInMemoryUserDetailsService;
//import org.camunda.bpm.engine.impl.identity.ReadOnlyIdentityProvider;
//import org.camunda.bpm.engine.impl.interceptor.Session;
//import org.camunda.bpm.engine.impl.interceptor.SessionFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class CustomIdentityProviderFactory implements SessionFactory {
//    private CustomInMemoryUserDetailsService userService;
//
//    @Autowired
//    public CustomIdentityProviderFactory(CustomInMemoryUserDetailsService userService) {
//        this.userService = userService;
//    }
//
//    @Override
//    public Class<?> getSessionType() {
//        return ReadOnlyIdentityProvider.class;
//    }
//
//    @Override
//    public Session openSession() {
//        return new CustomIdentityProvider(userService);
//    }
//}
