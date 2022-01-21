package com.example.insurancedemo.mapper;

import com.example.insurancedemo.dto.PolicyInputDto;
import com.example.insurancedemo.dto.PolicyOutputDto;
import com.example.insurancedemo.entity.Policy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PolicyMapper {

    @Mapping(target = "policyholder.id", source = "policyholder")
    @Mapping(target = "policyType.id", source = "policyType")
    Policy fromDto(PolicyInputDto dto);

    @Mapping(target = "policyholder", source = "policyholder.name")
    @Mapping(target = "policyType", source = "policyType.name")
    PolicyOutputDto fromEntity(Policy entity);

}
