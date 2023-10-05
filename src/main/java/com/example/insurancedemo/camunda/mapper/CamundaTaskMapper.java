package com.example.insurancedemo.camunda.mapper;

import com.example.insurancedemo.camunda.model.CamundaTask;
import com.example.insurancedemo.dto.ClaimOutputDto;
import com.example.insurancedemo.entity.Claim;
import com.example.insurancedemo.external.tasklist.model.TaskSearchResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CamundaTaskMapper {
    CamundaTask toCamundaTask(TaskSearchResponse response);
}
