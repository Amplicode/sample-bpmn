package com.example.insurancedemo.mapper;

import com.example.insurancedemo.dto.PolicyTypeDto;
import com.example.insurancedemo.dto.PolicyholderDto;
import com.example.insurancedemo.entity.PolicyType;
import com.example.insurancedemo.entity.Policyholder;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PolicyTypeMapper {

    PolicyTypeDto toDto(PolicyType entity);

    PolicyType toEntity(PolicyTypeDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    PolicyType partialUpdate(PolicyTypeDto policyTypeDto, @MappingTarget PolicyType policyType);
}
