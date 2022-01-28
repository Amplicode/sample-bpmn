package com.example.insurancedemo.mapper;

import com.example.insurancedemo.dto.PolicyTypeDto;
import com.example.insurancedemo.entity.PolicyType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PolicyTypeMapper {

    PolicyTypeDto fromEntity(PolicyType entity);

    PolicyType fromDto(PolicyTypeDto dto);
}
