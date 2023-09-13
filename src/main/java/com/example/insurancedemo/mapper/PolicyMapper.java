package com.example.insurancedemo.mapper;

import com.example.insurancedemo.dto.ClaimInputDto;
import com.example.insurancedemo.dto.PolicyInputDto;
import com.example.insurancedemo.dto.PolicyOutputDto;
import com.example.insurancedemo.entity.Claim;
import com.example.insurancedemo.entity.Policy;
import com.example.insurancedemo.support.BPMSupport;
import org.mapstruct.*;

import java.math.BigDecimal;

@Mapper(componentModel = "spring")
public interface PolicyMapper {

    @Mapping(target = "policyholder.id", source = "policyholder")
    @Mapping(target = "policyType.id", source = "policyType")
    Policy toEntity(PolicyInputDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "policyholder.id", source = "policyholder")
    @Mapping(target = "policyType.id", source = "policyType")
    Policy partialUpdate(PolicyInputDto policyDto, @MappingTarget Policy claim);

    @Mapping(target = "insuranceSum", qualifiedByName = "formatBigDecimal")
    @Mapping(target = "insurancePremium", qualifiedByName = "formatBigDecimal")
    @Mapping(target = "policyholder.dateOfBirth", ignore = true)
    @Mapping(target = "policyholder.address", ignore = true)
    @Mapping(target = "policyType.description", ignore = true)
    PolicyOutputDto toDto(Policy entity);

    @Named("formatBigDecimal")
    default String formatBigDecimal(BigDecimal bd) {
        return BPMSupport.formatBigDecimal(bd);
    }
}
