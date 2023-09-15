//package com.example.insurancedemo.listener;
//
//import org.camunda.bpm.engine.delegate.DelegateExecution;
//import org.camunda.bpm.engine.delegate.DelegateTask;
//import org.camunda.bpm.engine.delegate.TaskListener;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Component;
//
//@Component
//public class NotificationCompleteListener implements TaskListener {
//
//    private static final Logger logger = LoggerFactory.getLogger(NotificationCompleteListener.class);
//
//    private final JavaMailSender mailSender;
//
//    @Value("${spring.mail.username}")
//    private String from;
//
//    public NotificationCompleteListener(JavaMailSender mailSender) {
//        this.mailSender = mailSender;
//    }
//
//    @Override
//    public void notify(DelegateTask delegateTask) {
//        logger.info("Listener of User Task event \"Complete\" started execution");
//
//        final DelegateExecution execution = delegateTask.getExecution();
//
//        final SimpleMailMessage message = new SimpleMailMessage();
//
//        final String to = (String) execution.getVariable("to");
//        final String subject = (String) execution.getVariable("subject");
//        final String text = (String) execution.getVariable("text");
//
//        message.setFrom(from);
//        message.setTo(to);
//        message.setSubject(subject);
//        message.setText(text);
//
//        mailSender.send(message);
//
//        logger.info("Listener of User Task event \"Complete\" ended execution. Mail based on the Notification Form was " +
//                "created and sent");
//    }
//}
