//package com.example.insurancedemo.config;
//
//import com.example.insurancedemo.security.CustomInMemoryUserDetailsService;
//import org.camunda.bpm.engine.ProcessEngine;
//import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
//import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//@Component
//public class CustomIdentityProviderPlugin implements ProcessEnginePlugin {
//
//    private CustomInMemoryUserDetailsService userService;
//
//    @Autowired
//    public CustomIdentityProviderPlugin(CustomInMemoryUserDetailsService userService) {
//        this.userService = userService;
//    }
//
//    @Override
//    public void preInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
//        CustomIdentityProviderFactory identityProviderFactory = new CustomIdentityProviderFactory(userService);
//        processEngineConfiguration.setIdentityProviderSessionFactory(identityProviderFactory);
//    }
//
//    @Override
//    public void postInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
//
//    }
//
//    @Override
//    public void postProcessEngineBuild(ProcessEngine processEngine) {
//
//    }
//}
