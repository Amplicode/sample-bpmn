package com.example.insurancedemo;

import com.example.insurancedemo.external.tasklist.ApiClient;
import com.example.insurancedemo.external.tasklist.api.FormApi;
import com.example.insurancedemo.external.tasklist.api.TaskApi;
import com.example.insurancedemo.external.tasklist.model.FormResponse;
import com.example.insurancedemo.external.tasklist.model.TaskSearchRequest;
import com.example.insurancedemo.external.tasklist.model.TaskSearchResponse;
import com.example.insurancedemo.camunda.auth.CamundaTokenService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class InsuranceDemoApplicationTests {
    @Autowired
    private CamundaTokenService camundaTokenService;

    @Test
    void testGetAccessToken() {
        String accessToken = camundaTokenService.getAccessToken();
        System.out.println("Access token:" + accessToken);
    }

    @Test
    void testTaskApi() {
        String accessToken = camundaTokenService.getAccessToken();
        System.out.println("Retrieved access token:" + accessToken);

        ApiClient apiClient = new ApiClient();
        apiClient.setBearerToken(accessToken);

        TaskApi taskApi = new TaskApi(apiClient);
        FormApi formApi = new FormApi(apiClient);

        TaskSearchRequest taskSearchRequest = new TaskSearchRequest();
        taskSearchRequest.setAssignee("andrey.subbotin.smr@gmail.com");
        taskSearchRequest.setState(TaskSearchRequest.StateEnum.CREATED);

        List<TaskSearchResponse> taskSearchResponses = taskApi.searchTasks(taskSearchRequest);
        Assertions.assertEquals(1, taskSearchResponses.size());

        TaskSearchResponse taskSearchResponse = taskSearchResponses.get(0);

        FormResponse form = formApi.getForm(taskSearchResponse.getFormKey().replace("camunda-forms:bpmn:", ""), taskSearchResponse.getProcessDefinitionKey());
        Assertions.assertNotNull(form);

        int a = 5;
    }

}
