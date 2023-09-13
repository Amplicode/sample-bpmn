//package com.example.insurancedemo.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//import static org.springframework.util.StringUtils.trimLeadingCharacter;
//import static org.springframework.util.StringUtils.trimTrailingCharacter;
//
//@Configuration
//public class MvcConfiguration implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        CorsConfiguration corsConfiguration = new CorsConfiguration();
//        corsConfiguration.setAllowCredentials(true);
//        corsConfiguration.addAllowedOriginPattern("http://localhost:[*]");
//        corsConfiguration.addAllowedHeader("*");
//        corsConfiguration.addAllowedMethod("*");
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", corsConfiguration);
//        if (isConfigured(corsConfiguration)) {
//            registry.addMapping("/**").combine(corsConfiguration);
//        }
//    }
//
//
//    private boolean isConfigured(CorsConfiguration corsConfiguration) {
//        return corsConfiguration.getAllowedOrigins() != null && !corsConfiguration.getAllowedOrigins().isEmpty() || corsConfiguration.getAllowedOriginPatterns() != null && !corsConfiguration.getAllowedOriginPatterns().isEmpty();
//    }
//
//    private String normalizeUrl(String url) {
//        return trimTrailingCharacter(trimLeadingCharacter(url, '/'), '/');
//    }
//}
