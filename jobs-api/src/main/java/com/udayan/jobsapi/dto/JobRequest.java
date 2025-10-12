package com.udayan.jobsapi.dto;

import com.udayan.jobsapi.model.Job.ExperienceLevel;
import com.udayan.jobsapi.model.Job.JobType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobRequest {
    
    @NotBlank(message = "Job title is required")
    private String title;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotBlank(message = "Company name is required")
    private String company;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    @NotNull(message = "Job type is required")
    private JobType jobType;
    
    @NotNull(message = "Experience level is required")
    private ExperienceLevel experienceLevel;
    
    private String salary;
    
    private String requirements;
    
    private String responsibilities;
    
    private String category;
    
    private LocalDateTime applicationDeadline;
}



