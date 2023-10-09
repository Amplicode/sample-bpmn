package com.example.insurancedemo.camunda;

import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import com.amplicode.core.graphql.paging.ResultPageImpl;
import com.example.insurancedemo.camunda.model.CamundaTask;
import com.example.insurancedemo.camunda.service.CamundaTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class CamundaTaskController {
    @Autowired
    private CamundaTaskService camundaTaskService;

    @NonNull
    @QueryMapping(name = "assignedTaskList")
    public ResultPage<CamundaTask> findAssignedTasks(@Argument List<CamundaTaskOrderByInput> sort,
                                                     @Argument OffsetPageInput page) {
        List<CamundaTask> camundaTasks = camundaTaskService.findAssignedTasks();

        return new ResultPageImpl<>(camundaTasks, camundaTasks.size());
    }

    @NonNull
    @QueryMapping(name = "task")
    public CamundaTask findTask(@Argument @NonNull String id) {
        return camundaTaskService.findTaskWithForm(id);
    }

    @MutationMapping(name = "completeTask")
    public void completeTask(@Argument @NonNull String id, @Argument String variables) {
        camundaTaskService.completeTask(id, variables);
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