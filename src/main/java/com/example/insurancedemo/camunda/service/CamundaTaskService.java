package com.example.insurancedemo.camunda.service;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import com.example.insurancedemo.camunda.TaskListClientConfigurationProperties;
import com.example.insurancedemo.camunda.mapper.CamundaTaskMapper;
import com.example.insurancedemo.camunda.model.CamundaTask;
import com.example.insurancedemo.external.tasklist.ApiClient;
import com.example.insurancedemo.external.tasklist.api.FormApi;
import com.example.insurancedemo.external.tasklist.api.TaskApi;
import com.example.insurancedemo.external.tasklist.model.*;
import com.google.common.base.Strings;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

@Service
public class CamundaTaskService {
    @Autowired
    private CamundaTokenService camundaTokenService;
    @Autowired
    private CamundaTaskMapper taskMapper;
    @Autowired
    private AuthenticationInfoProvider authenticationInfoProvider;
    @Autowired
    private TaskListClientConfigurationProperties taskListProperties;

    public List<CamundaTask> findAssignedTasks() {
        ApiClient apiClient = buildApiClient();
        TaskApi taskApi = new TaskApi(apiClient);

        TaskSearchRequest searchRequest = new TaskSearchRequest();
        searchRequest.setState(TaskSearchRequest.StateEnum.CREATED);
        searchRequest.setAssignee(authenticationInfoProvider.getPreferredUsername());

        List<TaskSearchResponse> taskResponses = taskApi.searchTasks(searchRequest);

        return taskResponses.stream().map(it -> taskMapper.toCamundaTask(it))
                .toList();
    }

    public CamundaTask findTaskWithForm(String taskId) {
        ApiClient apiClient = buildApiClient();
        TaskApi taskApi = new TaskApi(apiClient);
        FormApi formApi = new FormApi(apiClient);

        TaskResponse task = taskApi.getTaskById(taskId);
        CamundaTask camundaTask = taskMapper.toCamundaTask(task);

        FormResponse form = formApi.getForm(task.getFormKey().replace("camunda-forms:bpmn:", ""),
                task.getProcessDefinitionKey());

        camundaTask.setForm(taskMapper.toCamundaForm(form));

        return camundaTask;
    }

    public void completeTask(String taskId, String variables) {
        ApiClient apiClient = buildApiClient();
        TaskApi taskApi = new TaskApi(apiClient);

        TaskCompleteRequest completeRequest = new TaskCompleteRequest();

        if (!Strings.isNullOrEmpty(variables)) {
            Gson gson = new Gson();
            Type mapType = new TypeToken<Map<String, String>>() {
            }.getType();
            Map<String, String> variablesMap = gson.fromJson(variables, mapType);
            variablesMap.forEach((key, value) -> {
                VariableInputDTO inputDTO = new VariableInputDTO();
                inputDTO.setName(key);
                inputDTO.setValue(value);

                completeRequest.addVariablesItem(inputDTO);
            });
        }

        taskApi.completeTask(taskId, completeRequest);
    }


    private ApiClient buildApiClient() {
        String accessToken = camundaTokenService.getTaskListAccessToken();

        ApiClient apiClient = new ApiClient();
        apiClient.setBasePath(taskListProperties.getBaseUrl());
        apiClient.setBearerToken(accessToken);

        return apiClient;
    }
}
