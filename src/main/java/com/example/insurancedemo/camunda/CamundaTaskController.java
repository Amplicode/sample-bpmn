package com.example.insurancedemo.camunda;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import com.amplicode.core.graphql.paging.ResultPageImpl;
import com.example.insurancedemo.camunda.auth.CamundaTokenService;
import com.example.insurancedemo.camunda.mapper.CamundaTaskMapper;
import com.example.insurancedemo.camunda.model.CamundaTask;
import com.example.insurancedemo.external.tasklist.ApiClient;
import com.example.insurancedemo.external.tasklist.api.TaskApi;
import com.example.insurancedemo.external.tasklist.model.TaskSearchRequest;
import com.example.insurancedemo.external.tasklist.model.TaskSearchResponse;
import com.google.protobuf.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Controller
public class CamundaTaskController {
    @Autowired
    private CamundaTokenService camundaTokenService;
    @Autowired
    private CamundaTaskMapper taskMapper;
    @Autowired
    private AuthenticationInfoProvider authenticationInfoProvider;

    @NonNull
    @QueryMapping(name = "assignedTaskList")
    public ResultPage<CamundaTask> findAssignedTaskAll(@Argument List<CamundaTaskOrderByInput> sort,
                                                       @Argument OffsetPageInput page) {
        ApiClient apiClient = buildApiClient();
        TaskApi taskApi = new TaskApi(apiClient);

        TaskSearchRequest searchRequest = new TaskSearchRequest();
        searchRequest.setState(TaskSearchRequest.StateEnum.CREATED);
        searchRequest.setAssignee(authenticationInfoProvider.getPreferredUsername());

        List<TaskSearchResponse> taskResponses = taskApi.searchTasks(searchRequest);

        List<CamundaTask> camundaTasks = taskResponses.stream().map(it -> taskMapper.toCamundaTask(it))
                .toList();

        return new ResultPageImpl<>(camundaTasks, camundaTasks.size());
    }


    private ApiClient buildApiClient() {
        String accessToken = camundaTokenService.getAccessToken();

        ApiClient apiClient = new ApiClient();
        apiClient.setBasePath("http://tasklist.camunda.127.0.0.1.nip.io");
        apiClient.setBearerToken(accessToken);

        return apiClient;
    }

    static class CamundaTaskOrderByInput {
        private CamundaTaskOrderByProperty property;
        private SortDirection direction;

        public CamundaTaskOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(CamundaTaskOrderByProperty property) {
            this.property = property;
        }

        public SortDirection getDirection() {
            return direction;
        }

        public void setDirection(SortDirection direction) {
            this.direction = direction;
        }
    }

    public enum SortDirection {ASC, DESC}

    public enum CamundaTaskOrderByProperty {CREATION_DATE, DUE_DATE, FOLLOW_UP_DATE}
}