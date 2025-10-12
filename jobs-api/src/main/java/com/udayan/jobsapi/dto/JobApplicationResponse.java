package com.udayan.jobsapi.dto;

import com.udayan.jobsapi.model.JobApplication;
import com.udayan.jobsapi.model.JobApplication.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplicationResponse {
    
    private Long id;
    private Long jobId;
    private String jobTitle;
    private String company;
    private String fullName;
    private String email;
    private String phone;
    private String coverLetter;
    private String resumeUrl;
    private String linkedinProfile;
    private Integer yearsOfExperience;
    private ApplicationStatus status;
    private String notes;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;
    
    public static JobApplicationResponse fromJobApplication(JobApplication application) {
        JobApplicationResponse response = new JobApplicationResponse();
        response.setId(application.getId());
        response.setFullName(application.getFullName());
        response.setEmail(application.getEmail());
        response.setPhone(application.getPhone());
        response.setCoverLetter(application.getCoverLetter());
        response.setResumeUrl(application.getResumeUrl());
        response.setLinkedinProfile(application.getLinkedinProfile());
        response.setYearsOfExperience(application.getYearsOfExperience());
        response.setStatus(application.getStatus());
        response.setNotes(application.getNotes());
        response.setAppliedAt(application.getAppliedAt());
        response.setUpdatedAt(application.getUpdatedAt());
        
        if (application.getJob() != null) {
            response.setJobId(application.getJob().getId());
            response.setJobTitle(application.getJob().getTitle());
            response.setCompany(application.getJob().getCompany());
        }
        
        return response;
    }
}



