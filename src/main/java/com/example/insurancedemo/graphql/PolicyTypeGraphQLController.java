package com.example.insurancedemo.graphql;

import com.example.insurancedemo.repository.PolicyTypeRepository;
import com.example.insurancedemo.dto.PolicyTypeDto;
import com.example.insurancedemo.entity.PolicyType;
import com.example.insurancedemo.mapper.PolicyTypeMapper;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLNonNull;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@GraphQLApi
@Service
public class PolicyTypeGraphQLController {

    private final PolicyTypeRepository repository;
    private final PolicyTypeMapper mapper;

    public PolicyTypeGraphQLController(PolicyTypeRepository repository, PolicyTypeMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @GraphQLQuery(name = "policyTypes")
    public List<PolicyTypeDto> findAll() {
        return repository.findAll().stream()
                .map(mapper::fromEntity)
                .collect(Collectors.toList());
    }

    @GraphQLQuery(name = "policyType")
    public PolicyTypeDto findById(@GraphQLArgument(name = "id") @GraphQLNonNull Long id) {
        final Optional<PolicyType> policyholder = repository.findById(id);

        if (policyholder.isPresent()) {
            return mapper.fromEntity(policyholder.get());
        }

        throw new NoSuchElementException("Policy Type with ID " + id + " is not found");
    }

    @GraphQLMutation(name = "upsert_PolicyType")
    public PolicyTypeDto upsert(@GraphQLArgument(name = "dto") PolicyTypeDto dto) {
        final PolicyType policyType = repository.save(mapper.fromDto(dto));
        return mapper.fromEntity(policyType);
    }

    @GraphQLMutation(name = "delete_PolicyType")
    public void delete(@GraphQLArgument(name = "id") @GraphQLNonNull Long id) {
        repository.deleteById(id);
    }
}
