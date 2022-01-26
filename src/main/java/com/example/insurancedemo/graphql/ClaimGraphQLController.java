package com.example.insurancedemo.graphql;

import com.example.insurancedemo.dto.ClaimInputDto;
import com.example.insurancedemo.dto.ClaimOutputDto;
import com.example.insurancedemo.entity.Claim;
import com.example.insurancedemo.mapper.ClaimMapper;
import com.example.insurancedemo.repository.ClaimRepository;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLNonNull;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@GraphQLApi
@Service
public class ClaimGraphQLController {

    private final ClaimRepository repository;
    private final ClaimMapper mapper;

    public ClaimGraphQLController(ClaimRepository repository, ClaimMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @GraphQLQuery(name = "claims")
    public List<ClaimOutputDto> findAll() {
        return repository.findAll().stream()
                .map(mapper::fromEntity)
                .collect(Collectors.toList());
    }

    @GraphQLQuery(name = "claim")
    public ClaimOutputDto findById(@GraphQLArgument(name = "id")@GraphQLNonNull Long id) {
        final Optional<Claim> claim = repository.findById(id);

        if (claim.isPresent()) {
            return mapper.fromEntity(claim.get());
        }

        throw new NoSuchElementException("Claim with ID " + id + " is not found");
    }

    @GraphQLMutation(name = "upsert_Claim")
    public ClaimOutputDto upsert(@GraphQLArgument(name = "dto") ClaimInputDto dto) {
        dto.setTimestamp(OffsetDateTime.now());
        final Claim claim = repository.save(mapper.fromDto(dto));
        return mapper.fromEntity(claim);
    }

    @GraphQLMutation(name = "delete_Claim")
    public void delete(@GraphQLArgument(name = "id") @GraphQLNonNull Long id) {
        repository.deleteById(id);
    }
}
