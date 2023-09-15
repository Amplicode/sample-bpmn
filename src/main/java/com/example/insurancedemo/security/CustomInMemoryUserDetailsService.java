//package com.example.insurancedemo.security;
//
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//import java.util.Collection;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//import static java.util.Arrays.stream;
//
//public class CustomInMemoryUserDetailsService implements UserDetailsService {
//    private final Map<String, InMemoryCamundaUser> users;
//
//    public CustomInMemoryUserDetailsService() {
//        this.users = new HashMap<>();
//    }
//
//    public CustomInMemoryUserDetailsService(UserDetails... userDetails) {
//        this.users = stream(userDetails)
//                .collect(Collectors.toMap(UserDetails::getUsername, InMemoryCamundaUser::new));
//    }
//
//    public Collection<InMemoryCamundaUser> loadAllUsers() {
//        return users.values();
//    }
//
//    @Override
//    public InMemoryCamundaUser loadUserByUsername(String username) throws UsernameNotFoundException {
//        return Optional
//                .ofNullable(users.get(username))
//                .orElseThrow(() -> new UsernameNotFoundException("User does not exist"));
//    }
//}
