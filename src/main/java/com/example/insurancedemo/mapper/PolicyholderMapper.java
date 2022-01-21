package com.example.insurancedemo.mapper;

import com.example.insurancedemo.dto.PolicyholderDto;
import com.example.insurancedemo.entity.Policyholder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface PolicyholderMapper {

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @Mapping(target = "dateOfBirth", qualifiedByName = "parseDateOfBirth")
    Policyholder fromDto(PolicyholderDto dto);

    @Mapping(target = "dateOfBirth", qualifiedByName = "formatDateOfBirth")
    PolicyholderDto fromEntity(Policyholder entity);

    @Named("formatDateOfBirth")
    default String formatDateOfBirth(OffsetDateTime dateOfBirth) {
        return dateOfBirth.format(formatter);
    }

    @Named("parseDateOfBirth")
    default OffsetDateTime parseDateOfBirth(String formattedDateOfBirth) {
        return OffsetDateTime.parse(formattedDateOfBirth);
    }
}
