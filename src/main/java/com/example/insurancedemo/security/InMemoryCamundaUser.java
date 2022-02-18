package com.example.insurancedemo.security;

import org.camunda.bpm.engine.identity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class InMemoryCamundaUser implements User, UserDetails {

    private UserDetails delegate;

    private String firstName;
    private String lastName;
    private String email;

    public InMemoryCamundaUser(UserDetails userDetails) {
        this.delegate = userDetails;
    }

    @Override
    public String getId() {
        return getUsername();
    }

    @Override
    public void setId(String id) {
        throw new UnsupportedOperationException("User id cannot be changed");
    }

    @Override
    public String getFirstName() {
        return firstName;
    }

    @Override
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Override
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String getLastName() {
        return lastName;
    }

    @Override
    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return delegate.getAuthorities();
    }

    @Override
    public String getPassword() {
        return delegate.getPassword();
    }

    @Override
    public String getUsername() {
        return delegate.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return delegate.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return delegate.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return delegate.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return delegate.isEnabled();
    }

    @Override
    public void setPassword(String password) {
        throw new UnsupportedOperationException("User password cannot be changed");
    }
}
