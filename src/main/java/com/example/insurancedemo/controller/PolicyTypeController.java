package com.example.insurancedemo.controller;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.example.insurancedemo.dto.PolicyInputDto;
import com.example.insurancedemo.dto.PolicyOutputDto;
import com.example.insurancedemo.dto.PolicyTypeDto;
import com.example.insurancedemo.entity.Policy;
import com.example.insurancedemo.entity.PolicyType;
import com.example.insurancedemo.mapper.PolicyMapper;
import com.example.insurancedemo.mapper.PolicyTypeMapper;
import com.example.insurancedemo.repository.PolicyRepository;
import com.example.insurancedemo.repository.PolicyTypeRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class PolicyTypeController {
    private final PolicyTypeRepository crudRepository;
    private final PolicyTypeMapper mapper;

    public PolicyTypeController(PolicyTypeRepository crudRepository, PolicyTypeMapper mapper) {
        this.crudRepository = crudRepository;
        this.mapper = mapper;
    }

    @QueryMapping(name = "policyTypeList")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional(readOnly = true)
    @NonNull
    public List<PolicyTypeDto> findAll() {
        return crudRepository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @QueryMapping(name = "policyType")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional(readOnly = true)
    @NonNull
    public PolicyTypeDto findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updatePolicyType")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional
    @NonNull
    public PolicyTypeDto update(@Argument @NonNull PolicyTypeDto input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        PolicyType entity = new PolicyType();
        mapper.partialUpdate(input, entity);
        entity = crudRepository.save(entity);
        return mapper.toDto(entity);
    }

    @MutationMapping(name = "deletePolicyType")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        PolicyType entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }
}
