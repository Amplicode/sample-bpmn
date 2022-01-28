package com.example.insurancedemo.listener;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.DelegateTask;
import org.camunda.bpm.engine.delegate.TaskListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class NotificationCompleteListener implements TaskListener {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    public NotificationCompleteListener(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void notify(DelegateTask delegateTask) {
        final DelegateExecution execution = delegateTask.getExecution();

        final SimpleMailMessage message = new SimpleMailMessage();

        final String to = (String) execution.getVariable("to");
        final String subject = (String) execution.getVariable("subject");
        final String text = (String) execution.getVariable("text");

        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message);
    }
}
