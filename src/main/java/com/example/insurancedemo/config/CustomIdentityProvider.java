package com.example.insurancedemo.config;

import com.example.insurancedemo.security.CustomGroupQuery;
import com.example.insurancedemo.security.CustomInMemoryUserDetailsService;
import com.example.insurancedemo.security.CustomTenantQuery;
import com.example.insurancedemo.security.CustomUserQuery;
import com.example.insurancedemo.security.InMemoryCamundaUser;
import org.camunda.bpm.engine.BadUserRequestException;
import org.camunda.bpm.engine.identity.Group;
import org.camunda.bpm.engine.identity.GroupQuery;
import org.camunda.bpm.engine.identity.NativeUserQuery;
import org.camunda.bpm.engine.identity.Tenant;
import org.camunda.bpm.engine.identity.TenantQuery;
import org.camunda.bpm.engine.identity.User;
import org.camunda.bpm.engine.identity.UserQuery;
import org.camunda.bpm.engine.impl.context.Context;
import org.camunda.bpm.engine.impl.identity.ReadOnlyIdentityProvider;
import org.camunda.bpm.engine.impl.interceptor.CommandContext;
import org.camunda.bpm.engine.impl.persistence.entity.GroupEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomIdentityProvider implements ReadOnlyIdentityProvider {

    private CustomInMemoryUserDetailsService userService;

    @Autowired
    public CustomIdentityProvider(CustomInMemoryUserDetailsService userService) {
        this.userService = userService;
    }

    @Override
    public User findUserById(String userId) {
        return userService.loadUserByUsername(userId);
    }

    @Override
    public UserQuery createUserQuery() {
        return new CustomUserQuery(Context.getProcessEngineConfiguration().getCommandExecutorTxRequired());
    }

    @Override
    public UserQuery createUserQuery(CommandContext commandContext) {
        return new CustomUserQuery();
    }

    @Override
    public NativeUserQuery createNativeUserQuery() {
        throw new BadUserRequestException("not supported");
    }

    @Override
    public boolean checkPassword(String userId, String password) {
        if (userId == null || password == null || userId.isEmpty() || password.isEmpty()) {
            return false;
        }
        final User user = userService.loadUserByUsername(userId);
        if (user == null) return false;
        String userPassword = user.getPassword();
        if (userPassword.startsWith("{noop}")) {
            userPassword = userPassword.substring(6);
        }
        return userPassword.equals(password);
    }

    @Override
    public Group findGroupById(String groupId) {
        return null;
    }

    @Override
    public GroupQuery createGroupQuery() {
        return new CustomGroupQuery(Context.getProcessEngineConfiguration().getCommandExecutorTxRequired());
    }

    @Override
    public GroupQuery createGroupQuery(CommandContext commandContext) {
        return new CustomGroupQuery();
    }

    @Override
    public Tenant findTenantById(String tenantId) {
        return null;
    }

    @Override
    public TenantQuery createTenantQuery() {
        return new CustomTenantQuery(Context.getProcessEngineConfiguration().getCommandExecutorTxRequired());
    }

    @Override
    public TenantQuery createTenantQuery(CommandContext commandContext) {
        return new CustomTenantQuery();
    }

    @Override
    public void flush() {

    }

    @Override
    public void close() {

    }

    public long findUserCountByQueryCriteria(CustomUserQuery query) {
        return findUserByQueryCriteria(query).size();
    }

    public List<User> findUserByQueryCriteria(CustomUserQuery query) {

        Collection<User> userList = new ArrayList<>(userService.loadAllUsers());

        if (query.getId() != null)
            userList.removeIf(user -> !user.getId().equals(query.getId()));
        if (query.getFirstName() != null)
            userList.removeIf(user -> !user.getFirstName().equals(query.getFirstName()));
        if (query.getLastName() != null)
            userList.removeIf(user -> !user.getLastName().equals(query.getLastName()));
        if (query.getEmail() != null)
            userList.removeIf(user -> !user.getEmail().equals(query.getEmail()));
//        if (query.getGroupId() != null)
//            users.removeIf(user -> !user.getGroup().getId().equals(query.getGroupId()));

        return new ArrayList<>(userList);

//        return userService.findAll().stream()
//                .filter(user -> user.getId().equals(query.getId()))
//                .filter(user -> user.getFirstName().equals(query.getFirstName()))
//                .filter(user -> user.getLastName().equals(query.getLastName()))
//                .filter(user -> user.getEmail().equals(query.getEmail()))
//                .filter(user -> user.getGroup().getId().equals(query.getGroupId()))
//                .collect(Collectors.toList());

//        return Collections.emptyList();
    }

    public long findGroupCountByQueryCriteria(CustomGroupQuery query) {
        return findGroupByQueryCriteria(query).size();
    }

    public List<Group> findGroupByQueryCriteria(CustomGroupQuery query) {
        Collection<InMemoryCamundaUser> users;
        if (query.getUserId() != null) {
            users = List.of(userService.loadUserByUsername(query.getUserId()));
        } else {
            users = userService.loadAllUsers();
        }
        return users.stream().map(InMemoryCamundaUser::getAuthorities)
                .flatMap(Collection::stream)
                .map(grantedAuthority -> {
                    String authority = grantedAuthority.getAuthority();
                    if (authority.startsWith("ROLE_")) {
                        authority = authority.substring(5);
                    }
                    final GroupEntity groupEntity = new GroupEntity(authority);
                    groupEntity.setName(authority);
                    return groupEntity;
                }).distinct().collect(Collectors.toList());
    }
}
