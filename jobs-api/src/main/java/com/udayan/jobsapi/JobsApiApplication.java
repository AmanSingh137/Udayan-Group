package com.udayan.jobsapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class JobsApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobsApiApplication.class, args);
    }
}



