package com.example.insurancedemo.graphql;

import com.example.insurancedemo.dto.PolicyInputDto;
import com.example.insurancedemo.dto.PolicyOutputDto;
import com.example.insurancedemo.entity.Policy;
import com.example.insurancedemo.mapper.PolicyMapper;
import com.example.insurancedemo.repository.PolicyRepository;
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
public class PolicyGraphQLController {

    private final PolicyRepository repository;
    private final PolicyMapper mapper;

    public PolicyGraphQLController(PolicyRepository repository, PolicyMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @GraphQLQuery(name = "policies")
    public List<PolicyOutputDto> findAll() {
        return repository.findAll().stream()
                .map(mapper::fromEntity)
                .collect(Collectors.toList());
    }

    @GraphQLQuery(name = "policy")
    public PolicyOutputDto findById(@GraphQLArgument(name = "id") @GraphQLNonNull Long id) {
        final Optional<Policy> policy = repository.findById(id);

        if (policy.isPresent()) {
            return mapper.fromEntity(policy.get());
        }

        throw new NoSuchElementException("Policy with ID " + id + " is not found");
    }

    @GraphQLMutation(name = "upsert_Policy")
    public PolicyOutputDto upsert(@GraphQLArgument(name = "dto") PolicyInputDto dto) {
        final Policy policy = repository.save(mapper.fromDto(dto));
        return mapper.fromEntity(policy);
    }

    @GraphQLMutation(name = "delete_Policy")
    public void delete(@GraphQLArgument(name = "id") @GraphQLNonNull Long id) {
        repository.deleteById(id);
    }
}
