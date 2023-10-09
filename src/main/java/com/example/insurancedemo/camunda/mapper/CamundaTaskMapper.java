package com.example.insurancedemo.camunda.mapper;

import com.example.insurancedemo.camunda.model.CamundaForm;
import com.example.insurancedemo.camunda.model.CamundaTask;
import com.example.insurancedemo.external.tasklist.model.FormResponse;
import com.example.insurancedemo.external.tasklist.model.TaskResponse;
import com.example.insurancedemo.external.tasklist.model.TaskSearchResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CamundaTaskMapper {
    CamundaTask toCamundaTask(TaskSearchResponse response);

    CamundaTask toCamundaTask(TaskResponse response);

    CamundaForm toCamundaForm(FormResponse response);
}
