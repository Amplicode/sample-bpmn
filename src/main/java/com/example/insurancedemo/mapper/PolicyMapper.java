package com.example.insurancedemo.mapper;

import com.example.insurancedemo.dto.PolicyInputDto;
import com.example.insurancedemo.dto.PolicyOutputDto;
import com.example.insurancedemo.entity.Policy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;

@Mapper(componentModel = "spring")
public interface PolicyMapper {

    @Mapping(target = "policyholder.id", source = "policyholder")
    @Mapping(target = "policyType.id", source = "policyType")
    Policy fromDto(PolicyInputDto dto);

    @Mapping(target = "insuranceSum", qualifiedByName = "formatBigDecimal")
    @Mapping(target = "insurancePremium", qualifiedByName = "formatBigDecimal")
    @Mapping(target = "policyholder.dateOfBirth", ignore = true)
    @Mapping(target = "policyholder.address", ignore = true)
    @Mapping(target = "policyType.description", ignore = true)
    PolicyOutputDto fromEntity(Policy entity);

    @Named("formatBigDecimal")
    default String formatBigDecimal(BigDecimal bd) {
        final DecimalFormatSymbols dfs = new DecimalFormatSymbols();
        dfs.setDecimalSeparator('.');
        dfs.setGroupingSeparator(',');
        DecimalFormat decimalFormat = new DecimalFormat("0.00", dfs);
        return decimalFormat.format(bd);
    }
}
