package com.example.insurancedemo.service;

import io.camunda.zeebe.client.ZeebeClient;
import org.springframework.stereotype.Service;

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
}
