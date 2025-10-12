package com.udayan.jobsapi.dto;

import com.udayan.jobsapi.model.Job;
import com.udayan.jobsapi.model.Job.ExperienceLevel;
import com.udayan.jobsapi.model.Job.JobStatus;
import com.udayan.jobsapi.model.Job.JobType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobResponse {
    
    private Long id;
    private String title;
    private String description;
    private String company;
    private String location;
    private JobType jobType;
    private ExperienceLevel experienceLevel;
    private String salary;
    private String requirements;
    private String responsibilities;
    private String category;
    private JobStatus status;
    private LocalDateTime applicationDeadline;
    private Long postedById;
    private String postedByName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long applicationsCount;
    
    public static JobResponse fromJob(Job job) {
        JobResponse response = new JobResponse();
        response.setId(job.getId());
        response.setTitle(job.getTitle());
        response.setDescription(job.getDescription());
        response.setCompany(job.getCompany());
        response.setLocation(job.getLocation());
        response.setJobType(job.getJobType());
        response.setExperienceLevel(job.getExperienceLevel());
        response.setSalary(job.getSalary());
        response.setRequirements(job.getRequirements());
        response.setResponsibilities(job.getResponsibilities());
        response.setCategory(job.getCategory());
        response.setStatus(job.getStatus());
        response.setApplicationDeadline(job.getApplicationDeadline());
        response.setCreatedAt(job.getCreatedAt());
        response.setUpdatedAt(job.getUpdatedAt());
        
        if (job.getPostedBy() != null) {
            response.setPostedById(job.getPostedBy().getId());
            response.setPostedByName(job.getPostedBy().getFullName());
        }
        
        if (job.getApplications() != null) {
            response.setApplicationsCount((long) job.getApplications().size());
        }
        
        return response;
    }
}



