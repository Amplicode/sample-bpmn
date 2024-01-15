package com.example.insurancedemo.service;

import com.amplicode.camunda.api.TaskOperationException;
import com.amplicode.camunda.model.CamundaTaskState;
import com.amplicode.camunda.persistence.UserTask;
import io.camunda.zeebe.client.ZeebeClient;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.spring.client.annotation.CustomHeaders;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.Map;

@Service
public class TemplateProcessNameService {
    private final ZeebeClient zeebeClient;

    public TemplateProcessNameService(ZeebeClient zeebeClient) {
        this.zeebeClient = zeebeClient;
    }

    public void startProcessSync(Map<String, Object> variables) {
        zeebeClient.newCreateInstanceCommand()
                .bpmnProcessId("InsuranceClaimProcessing")
                .latestVersion()
                .variables(variables).send().join();
    }

    public void cancelProcessSync(long processInstanceKey) {
        zeebeClient.newCancelInstanceCommand(processInstanceKey)
                .send().join();
    }

    public void sendMessageStartSync(Map<String, Object> variables) {
        zeebeClient.newPublishMessageCommand()
                .messageName("StartMessage")
                .correlationKey(null)
                .variables(variables)
                .send()
                .join();
    }

    public void sendMessageStartSync(String correlationKey, Map<String, Object> variables) {
        zeebeClient.newPublishMessageCommand()
                .messageName("StartMessage")
                .correlationKey(correlationKey)
                .variables(variables)
                .send()
                .join();
    }

    public void sendMessageOrderPlacesSync(String correlationKey, Map<String, Object> variables) {
        zeebeClient.newPublishMessageCommand()
                .messageName("OrderPlaced")
                .correlationKey(correlationKey)
                .variables(variables)
                .send()
                .join();
    }

    public void sendSignalStartSync(Map<String, Object> variables) {
        zeebeClient.newBroadcastSignalCommand()
                .signalName("StartSignal")
                .variables(variables)
                .send()
                .join();


    }

    public void sendSignalOrderPlacedSync(Map<String, Object> variables) {
        zeebeClient.newBroadcastSignalCommand()
                .signalName("OrderPlacedSignal")
                .variables(variables)
                .send()
                .join();



    }

    public void completeTask(Long taskId, String variables) {
        zeebeClient.newCompleteCommand(taskId)
                .variables(variables)
                .send()
                .join();
    }

    private static final long WORKER_TIMEOUT = 31536000000L; //365 days;

    //@JobWorker(type = "io.camunda.zeebe:userTask", autoComplete = false, timeout = WORKER_TIMEOUT)
    public void handleUserTask(ActivatedJob job, @CustomHeaders Map<String, String> customHeaders) {
        Map<String, Object> variables = job.getVariablesAsMap();

        String assignee = customHeaders.get("io.camunda.zeebe:assignee");
        String candidateUsers = customHeaders.get("io.camunda.zeebe:candidateUsers");
        String candidateGroups = customHeaders.get("io.camunda.zeebe:candidateGroups");
        String dueDate = customHeaders.get("io.camunda.zeebe:dueDate");
        String followUpDate = customHeaders.get("io.camunda.zeebe:followUpDate");

        //TODO: add your logic here




    }
}
