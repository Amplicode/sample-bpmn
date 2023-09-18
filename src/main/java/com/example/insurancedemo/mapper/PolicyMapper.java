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
    Policy toEntity(PolicyInputDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Policy partialUpdate(PolicyInputDto policyDto, @MappingTarget Policy claim);

    PolicyOutputDto toDto(Policy entity);
}
