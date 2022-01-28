package com.example.insurancedemo.service.bpm;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

/**
 * Service for Notification Service Task
 */
@Service
public class NotifyOfPremiumIncreaseService implements JavaDelegate {

    private final JavaMailSender mailSender;

    private final String from;
    private final String to;
    private final String subject;
    private String text;

    public NotifyOfPremiumIncreaseService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
        this.from = "from";
        this.to = "to";
        this.subject = "Future Insurance Premium Increase";
    }

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        final BigDecimal insurancePremium = (BigDecimal) execution.getVariable("insurancePremium");

        this.text = "Mr Insured,\n The payment on your insurance claim exceeded the limit. The future insurance premium " +
                "is set to " + insurancePremium.doubleValue();

        final SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message);
    }
}
