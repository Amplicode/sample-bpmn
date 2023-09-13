package com.example.insurancedemo.security;

import jakarta.servlet.*;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.ProcessEngines;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class CamundaRestAuthenticationFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        ProcessEngine engine = ProcessEngines.getDefaultProcessEngine();

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String username;

        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }


        try {
            engine.getIdentityService().setAuthentication(username, getUserGroups(username));
            chain.doFilter(request, response);
        } finally {
            clearAuthentication(engine);
        }
    }

    private void clearAuthentication(ProcessEngine engine) {
        engine.getIdentityService().clearAuthentication();
    }

    private List<String> getUserGroups(String userId){

        List<String> groupIds;

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        groupIds = authentication.getAuthorities().stream()
                .map(res -> res.getAuthority())
                .map(res -> res.substring(5)) // Strip "ROLE_"
                .collect(Collectors.toList());

        return groupIds;

    }
}
