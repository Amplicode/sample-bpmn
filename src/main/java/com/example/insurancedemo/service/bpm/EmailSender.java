package com.example.insurancedemo.service.bpm;

import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.annotation.JobWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class EmailSender {
    private static final Logger log = LoggerFactory.getLogger(EmailSender.class);

    @JobWorker(type = "sendEmailNotification")
    public Map<String, Object> handleSendEmailNotification(ActivatedJob job, JobClient client) {
        Map<String, Object> variables = job.getVariablesAsMap();

        log.info("Send notification email. To: {}, Subject: {}, Text: {}, Notification date: {}, Remind after: {}",
                variables.get("to"), variables.get("subject"), variables.get("text"),
                variables.get("notification_date_time"),   variables.get("remind_after"));

        return variables;
    }
}