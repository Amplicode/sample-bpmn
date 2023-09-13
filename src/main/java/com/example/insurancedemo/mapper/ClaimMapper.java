package com.example.insurancedemo.mapper;

import com.example.insurancedemo.dto.ClaimInputDto;
import com.example.insurancedemo.dto.ClaimOutputDto;
import com.example.insurancedemo.entity.Claim;
import org.mapstruct.*;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface ClaimMapper {
    @Mapping(target = "policy.id", source = "policy")
    Claim toEntity(ClaimInputDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "policy.id", source = "policy")
    Claim partialUpdate(ClaimInputDto claimDto, @MappingTarget Claim claim);

    @Mapping(target = "timestamp", qualifiedByName = "formatDateTime")
    @Mapping(target = "policy.policyholder", ignore = true)
    @Mapping(target = "policy.policyType", ignore = true)
    @Mapping(target = "policy.insuranceSum", ignore = true)
    @Mapping(target = "policy.insurancePremium", ignore = true)
    @Mapping(target = "policy.caseDescription", ignore = true)
    ClaimOutputDto toDto(Claim entity);

    @Named("formatDateTime")
    default String formatDateTime(OffsetDateTime timestamp) {
        return timestamp.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
    }
}
