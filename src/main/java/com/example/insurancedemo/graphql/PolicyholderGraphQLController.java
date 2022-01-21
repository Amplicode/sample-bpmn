package com.example.insurancedemo.graphql;

import com.example.insurancedemo.dto.PolicyholderDto;
import com.example.insurancedemo.entity.Policyholder;
import com.example.insurancedemo.mapper.PolicyholderMapper;
import com.example.insurancedemo.repository.PolicyholderRepository;
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
public class PolicyholderGraphQLController {

    private final PolicyholderRepository repository;
    private final PolicyholderMapper mapper;

    public PolicyholderGraphQLController(PolicyholderRepository repository, PolicyholderMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @GraphQLQuery(name = "policyholders")
    public List<PolicyholderDto> findAll() {
        return repository.findAll().stream()
                .map(mapper::fromEntity)
                .collect(Collectors.toList());
    }

    @GraphQLQuery(name = "policyholder")
    public PolicyholderDto findById(@GraphQLArgument(name = "id") @GraphQLNonNull Long id) {
        final Optional<Policyholder> policyholder = repository.findById(id);

        if (policyholder.isPresent()) {
            return mapper.fromEntity(policyholder.get());
        }

        throw new NoSuchElementException("Policyholder with ID " + id + " is not found");
    }

    @GraphQLMutation(name = "upsert_Policyholder")
    public PolicyholderDto upsert(@GraphQLArgument(name = "dto") PolicyholderDto dto) {
        final Policyholder policyholder = repository.save(mapper.fromDto(dto));
        return mapper.fromEntity(policyholder);
    }

    @GraphQLMutation(name = "delete_Policyholder")
    public void delete(@GraphQLArgument(name = "id") @GraphQLNonNull Long id) {
        repository.deleteById(id);
    }
}
