package com.example.insurancedemo.controller;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.example.insurancedemo.dto.PolicyInputDto;
import com.example.insurancedemo.dto.PolicyOutputDto;
import com.example.insurancedemo.entity.Policy;
import com.example.insurancedemo.mapper.PolicyMapper;
import com.example.insurancedemo.repository.PolicyRepository;
import io.camunda.zeebe.client.ZeebeClient;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
public class PolicyController {
    private final PolicyRepository crudRepository;
    private final PolicyMapper mapper;
    private final ZeebeClient zeebeClient;

    public PolicyController(PolicyRepository crudRepository, PolicyMapper mapper, ZeebeClient zeebeClient) {
        this.crudRepository = crudRepository;
        this.mapper = mapper;
        this.zeebeClient = zeebeClient;
    }

    @QueryMapping(name = "policyList")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional(readOnly = true)
    @NonNull
    public List<PolicyOutputDto> findAll() {
        return crudRepository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @QueryMapping(name = "policy")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional(readOnly = true)
    @NonNull
    public PolicyOutputDto findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updatePolicy")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional
    @NonNull
    public PolicyOutputDto update(@Argument @NonNull PolicyInputDto input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        Policy entity = new Policy();
        mapper.partialUpdate(input, entity);
        entity = crudRepository.save(entity);
        return mapper.toDto(entity);
    }

    @MutationMapping(name = "deletePolicy")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        Policy entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    @MutationMapping(name = "runClaimProcess")
    @Transactional
    @Secured({"ROLE_FULL_ACCESS"})
    public void runProcess(@Argument @NonNull Long policyId) {
        Policy entity = crudRepository.findById(policyId)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", policyId)));

        Map<String, Object> variables = new HashMap<>();
        variables.put("policyId", entity.getId().toString());
        if (entity.getPolicyholder() != null) {
            variables.put("policyholderId", entity.getPolicyholder().getId().toString());
        }

        zeebeClient.newCreateInstanceCommand()
                .bpmnProcessId("InsuranceClaimProcessing")
                .latestVersion()
                .variables(variables).send().join();
    }
}
