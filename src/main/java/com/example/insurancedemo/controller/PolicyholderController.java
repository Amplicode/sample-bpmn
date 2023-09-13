package com.example.insurancedemo.controller;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.example.insurancedemo.dto.PolicyInputDto;
import com.example.insurancedemo.dto.PolicyOutputDto;
import com.example.insurancedemo.dto.PolicyholderDto;
import com.example.insurancedemo.entity.Policy;
import com.example.insurancedemo.entity.Policyholder;
import com.example.insurancedemo.mapper.PolicyMapper;
import com.example.insurancedemo.mapper.PolicyholderMapper;
import com.example.insurancedemo.repository.PolicyRepository;
import com.example.insurancedemo.repository.PolicyholderRepository;
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
public class PolicyholderController {
    private final PolicyholderRepository crudRepository;
    private final PolicyholderMapper mapper;

    public PolicyholderController(PolicyholderRepository crudRepository, PolicyholderMapper mapper) {
        this.crudRepository = crudRepository;
        this.mapper = mapper;
    }

    @QueryMapping(name = "policyholderList")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional(readOnly = true)
    @NonNull
    public List<PolicyholderDto> findAll() {
        return crudRepository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @QueryMapping(name = "policyholder")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional(readOnly = true)
    @NonNull
    public PolicyholderDto findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updatePolicyholder")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional
    @NonNull
    public PolicyholderDto update(@Argument @NonNull PolicyholderDto input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        Policyholder entity = new Policyholder();
        mapper.partialUpdate(input, entity);
        entity = crudRepository.save(entity);
        return mapper.toDto(entity);
    }

    @MutationMapping(name = "deletePolicyholder")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        Policyholder entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }
}
