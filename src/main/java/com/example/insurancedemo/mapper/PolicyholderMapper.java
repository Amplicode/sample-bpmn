package com.example.insurancedemo.mapper;

import com.example.insurancedemo.dto.PolicyholderDto;
import com.example.insurancedemo.entity.Policyholder;
import org.mapstruct.*;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface PolicyholderMapper {
    Policyholder toEntity(PolicyholderDto dto);

    PolicyholderDto toDto(Policyholder entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Policyholder partialUpdate(PolicyholderDto policyholderDto, @MappingTarget Policyholder policyholder);
}
