package com.example.insurancedemo.controller;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.example.insurancedemo.dto.ClaimInputDto;
import com.example.insurancedemo.dto.ClaimOutputDto;
import com.example.insurancedemo.entity.Claim;
import com.example.insurancedemo.mapper.ClaimMapper;
import com.example.insurancedemo.repository.ClaimRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class ClaimController {
    private final ClaimRepository crudRepository;
    private final ClaimMapper mapper;

    public ClaimController(ClaimRepository crudRepository, ClaimMapper mapper) {
        this.crudRepository = crudRepository;
        this.mapper = mapper;
    }

    @QueryMapping(name = "claimList")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional(readOnly = true)
    @NonNull
    public List<ClaimOutputDto> findAll() {
        return crudRepository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @QueryMapping(name = "claim")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional(readOnly = true)
    @NonNull
    public ClaimOutputDto findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updateClaim")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional
    @NonNull
    public ClaimOutputDto update(@Argument @NonNull ClaimInputDto input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        input.setTimestamp(OffsetDateTime.now());

        Claim entity = new Claim();
        mapper.partialUpdate(input, entity);
        entity = crudRepository.save(entity);
        return mapper.toDto(entity);
    }

    @MutationMapping(name = "deleteClaim")
    @Secured({"ROLE_FULL_ACCESS"})
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        Claim entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }
}
