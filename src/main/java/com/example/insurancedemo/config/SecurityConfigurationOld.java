//package com.example.insurancedemo.config;
//
//import com.example.insurancedemo.security.CamundaRestAuthenticationFilter;
//import com.example.insurancedemo.security.CustomInMemoryUserDetailsService;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpStatus;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.HttpStatusEntryPoint;
//
//import javax.servlet.http.HttpServletResponse;
//
//@Configuration
//@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
//public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailsService());
//    }
//
//    @Bean
//    public CustomInMemoryUserDetailsService userDetailsService() {
//        final UserDetails admin = User.withUsername("admin")
//                .password("{noop}admin")
//                .authorities("ROLE_ADMIN", "camunda-admin").build();
//        final UserDetails assessor1 = User.withUsername("homer")
//                .password("{noop}homer")
//                .authorities("ROLE_ASSESSOR").build();
//        final UserDetails assessor2 = User.withUsername("marge")
//                .password("{noop}marge")
//                .authorities("ROLE_ASSESSOR").build();
//        final UserDetails client = User.withUsername("client")
//                .password("{noop}client")
//                .authorities("ROLE_USER")
//                .build();
//        return new CustomInMemoryUserDetailsService(admin, assessor1, assessor2, client);
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.formLogin()
//                .successHandler((request, response, authentication) -> response.setStatus(HttpServletResponse.SC_OK))
//                .failureHandler((request, response, exception) -> response.setStatus(HttpServletResponse.SC_UNAUTHORIZED))
//                .permitAll()
//                .and()
//                .exceptionHandling()
//                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
//                .and()
//                .authorizeRequests()
//                .antMatchers("/engine-rest/**").authenticated()
//                .antMatchers("/graphql").permitAll()
//                .antMatchers("/graphql/**").permitAll()
//                .and()
//                .cors()
//                .and()
//                .csrf().disable();
//    }
//
//    @Bean
//    public FilterRegistrationBean statelessUserAuthenticationFilter() {
//        FilterRegistrationBean filterRegistration = new FilterRegistrationBean();
//        filterRegistration.setFilter(new CamundaRestAuthenticationFilter());
//        filterRegistration.setOrder(102); // make sure the filter is registered after the Spring Security Filter Chain
////        filterRegistration.addUrlPatterns("/rest/*");
//        return filterRegistration;
//    }
//}
