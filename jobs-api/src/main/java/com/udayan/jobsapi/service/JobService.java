package com.udayan.jobsapi.service;

import com.udayan.jobsapi.dto.JobRequest;
import com.udayan.jobsapi.dto.JobResponse;
import com.udayan.jobsapi.model.Job;
import com.udayan.jobsapi.model.Job.JobStatus;
import com.udayan.jobsapi.model.Job.JobType;
import com.udayan.jobsapi.model.User;
import com.udayan.jobsapi.repository.JobRepository;
import com.udayan.jobsapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public JobResponse createJob(JobRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Job job = new Job();
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());
        job.setExperienceLevel(request.getExperienceLevel());
        job.setSalary(request.getSalary());
        job.setRequirements(request.getRequirements());
        job.setResponsibilities(request.getResponsibilities());
        job.setCategory(request.getCategory());
        job.setApplicationDeadline(request.getApplicationDeadline());
        job.setStatus(JobStatus.ACTIVE);
        job.setPostedBy(user);
        
        Job savedJob = jobRepository.save(job);
        return JobResponse.fromJob(savedJob);
    }
    
    @Transactional
    public JobResponse updateJob(Long id, JobRequest request, String username) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!job.getPostedBy().getId().equals(user.getId()) && 
            !user.getRole().equals(User.UserRole.ADMIN)) {
            throw new RuntimeException("You don't have permission to update this job");
        }
        
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());
        job.setExperienceLevel(request.getExperienceLevel());
        job.setSalary(request.getSalary());
        job.setRequirements(request.getRequirements());
        job.setResponsibilities(request.getResponsibilities());
        job.setCategory(request.getCategory());
        job.setApplicationDeadline(request.getApplicationDeadline());
        
        Job updatedJob = jobRepository.save(job);
        return JobResponse.fromJob(updatedJob);
    }
    
    @Transactional(readOnly = true)
    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        return JobResponse.fromJob(job);
    }
    
    @Transactional(readOnly = true)
    public Page<JobResponse> getAllJobs(Pageable pageable) {
        return jobRepository.findAll(pageable)
                .map(JobResponse::fromJob);
    }
    
    @Transactional(readOnly = true)
    public Page<JobResponse> getActiveJobs(Pageable pageable) {
        return jobRepository.findByStatus(JobStatus.ACTIVE, pageable)
                .map(JobResponse::fromJob);
    }
    
    @Transactional(readOnly = true)
    public Page<JobResponse> searchJobs(String keyword, Pageable pageable) {
        return jobRepository.searchActiveJobs(keyword, JobStatus.ACTIVE, pageable)
                .map(JobResponse::fromJob);
    }
    
    @Transactional(readOnly = true)
    public Page<JobResponse> getJobsByType(JobType jobType, Pageable pageable) {
        return jobRepository.findByJobType(jobType, pageable)
                .map(JobResponse::fromJob);
    }
    
    @Transactional(readOnly = true)
    public Page<JobResponse> getJobsByCategory(String category, Pageable pageable) {
        return jobRepository.findByCategory(category, pageable)
                .map(JobResponse::fromJob);
    }
    
    @Transactional(readOnly = true)
    public Page<JobResponse> getJobsByUser(String username, Pageable pageable) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return jobRepository.findByPostedById(user.getId(), pageable)
                .map(JobResponse::fromJob);
    }
    
    @Transactional(readOnly = true)
    public List<JobResponse> getRecentJobs() {
        return jobRepository.findTop10ByStatusOrderByCreatedAtDesc(JobStatus.ACTIVE)
                .stream()
                .map(JobResponse::fromJob)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public void deleteJob(Long id, String username) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!job.getPostedBy().getId().equals(user.getId()) && 
            !user.getRole().equals(User.UserRole.ADMIN)) {
            throw new RuntimeException("You don't have permission to delete this job");
        }
        
        jobRepository.delete(job);
    }
    
    @Transactional
    public JobResponse updateJobStatus(Long id, JobStatus status, String username) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!job.getPostedBy().getId().equals(user.getId()) && 
            !user.getRole().equals(User.UserRole.ADMIN)) {
            throw new RuntimeException("You don't have permission to update this job");
        }
        
        job.setStatus(status);
        Job updatedJob = jobRepository.save(job);
        return JobResponse.fromJob(updatedJob);
    }
}



