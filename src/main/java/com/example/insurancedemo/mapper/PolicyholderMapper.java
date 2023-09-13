package com.example.insurancedemo.mapper;

import com.example.insurancedemo.dto.PolicyholderDto;
import com.example.insurancedemo.entity.Policyholder;
import org.mapstruct.*;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface PolicyholderMapper {

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @Mapping(target = "dateOfBirth", qualifiedByName = "parseDateOfBirth")
    Policyholder toEntity(PolicyholderDto dto);

    @Mapping(target = "dateOfBirth", qualifiedByName = "formatDateOfBirth")
    PolicyholderDto toDto(Policyholder entity);


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "dateOfBirth", qualifiedByName = "parseDateOfBirth")
    Policyholder partialUpdate(PolicyholderDto policyholderDto, @MappingTarget Policyholder policyholder);

    @Named("formatDateOfBirth")
    default String formatDateOfBirth(OffsetDateTime dateOfBirth) {
        return dateOfBirth.format(formatter);
    }

    @Named("parseDateOfBirth")
    default OffsetDateTime parseDateOfBirth(String formattedDateOfBirth) {
        return OffsetDateTime.parse(formattedDateOfBirth);
    }
}
