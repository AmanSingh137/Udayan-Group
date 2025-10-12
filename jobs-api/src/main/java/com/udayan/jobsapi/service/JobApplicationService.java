package com.udayan.jobsapi.service;

import com.udayan.jobsapi.dto.JobApplicationRequest;
import com.udayan.jobsapi.dto.JobApplicationResponse;
import com.udayan.jobsapi.model.Job;
import com.udayan.jobsapi.model.JobApplication;
import com.udayan.jobsapi.model.JobApplication.ApplicationStatus;
import com.udayan.jobsapi.model.User;
import com.udayan.jobsapi.repository.JobApplicationRepository;
import com.udayan.jobsapi.repository.JobRepository;
import com.udayan.jobsapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JobApplicationService {
    
    @Autowired
    private JobApplicationRepository applicationRepository;
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public JobApplicationResponse applyForJob(JobApplicationRequest request, String username) {
        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));
        
        User applicant = null;
        if (username != null) {
            applicant = userRepository.findByUsername(username).orElse(null);
            
            if (applicant != null && applicationRepository.existsByJobIdAndApplicantId(job.getId(), applicant.getId())) {
                throw new RuntimeException("You have already applied for this job");
            }
        }
        
        JobApplication application = new JobApplication();
        application.setJob(job);
        application.setApplicant(applicant);
        application.setFullName(request.getFullName());
        application.setEmail(request.getEmail());
        application.setPhone(request.getPhone());
        application.setCoverLetter(request.getCoverLetter());
        application.setResumeUrl(request.getResumeUrl());
        application.setLinkedinProfile(request.getLinkedinProfile());
        application.setYearsOfExperience(request.getYearsOfExperience());
        application.setStatus(ApplicationStatus.PENDING);
        
        JobApplication savedApplication = applicationRepository.save(application);
        return JobApplicationResponse.fromJobApplication(savedApplication);
    }
    
    @Transactional(readOnly = true)
    public JobApplicationResponse getApplicationById(Long id) {
        JobApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        return JobApplicationResponse.fromJobApplication(application);
    }
    
    @Transactional(readOnly = true)
    public Page<JobApplicationResponse> getApplicationsByJob(Long jobId, Pageable pageable) {
        return applicationRepository.findByJobId(jobId, pageable)
                .map(JobApplicationResponse::fromJobApplication);
    }
    
    @Transactional(readOnly = true)
    public Page<JobApplicationResponse> getApplicationsByUser(String username, Pageable pageable) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return applicationRepository.findByApplicantId(user.getId(), pageable)
                .map(JobApplicationResponse::fromJobApplication);
    }
    
    @Transactional(readOnly = true)
    public Page<JobApplicationResponse> getApplicationsByStatus(ApplicationStatus status, Pageable pageable) {
        return applicationRepository.findByStatus(status, pageable)
                .map(JobApplicationResponse::fromJobApplication);
    }
    
    @Transactional
    public JobApplicationResponse updateApplicationStatus(Long id, ApplicationStatus status, String notes) {
        JobApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        
        application.setStatus(status);
        if (notes != null) {
            application.setNotes(notes);
        }
        
        JobApplication updatedApplication = applicationRepository.save(application);
        return JobApplicationResponse.fromJobApplication(updatedApplication);
    }
    
    @Transactional
    public void withdrawApplication(Long id, String username) {
        JobApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (application.getApplicant() == null || !application.getApplicant().getId().equals(user.getId())) {
            throw new RuntimeException("You don't have permission to withdraw this application");
        }
        
        application.setStatus(ApplicationStatus.WITHDRAWN);
        applicationRepository.save(application);
    }
    
    @Transactional(readOnly = true)
    public Long getApplicationCount(Long jobId) {
        return applicationRepository.countByJobId(jobId);
    }
}



