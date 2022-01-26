package com.example.insurancedemo.service.bpm;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotifyOfClaimRejectionService implements JavaDelegate {

    private final JavaMailSender mailSender;

    private final String from;
    private final String to;
    private final String subject;
    private final String text;

    public NotifyOfClaimRejectionService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
        this.from = "from";
        this.to = "to";
        this.subject = "Claim Rejection";
        this.text = "Mr Insured,\n Unfortunately, your insurance claim was rejected.";
    }

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        final SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
}
