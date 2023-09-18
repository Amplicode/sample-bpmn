package com.example.insurancedemo.mapper;

import com.example.insurancedemo.dto.ClaimInputDto;
import com.example.insurancedemo.dto.ClaimOutputDto;
import com.example.insurancedemo.entity.Claim;
import org.mapstruct.*;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface ClaimMapper {
    Claim toEntity(ClaimInputDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Claim partialUpdate(ClaimInputDto claimDto, @MappingTarget Claim claim);

    ClaimOutputDto toDto(Claim entity);
}
