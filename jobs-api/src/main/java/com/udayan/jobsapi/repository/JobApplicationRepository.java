package com.udayan.jobsapi.repository;

import com.udayan.jobsapi.model.JobApplication;
import com.udayan.jobsapi.model.JobApplication.ApplicationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    
    Page<JobApplication> findByJobId(Long jobId, Pageable pageable);
    
    Page<JobApplication> findByApplicantId(Long applicantId, Pageable pageable);
    
    Page<JobApplication> findByStatus(ApplicationStatus status, Pageable pageable);
    
    List<JobApplication> findByJobIdAndStatus(Long jobId, ApplicationStatus status);
    
    Optional<JobApplication> findByJobIdAndApplicantId(Long jobId, Long applicantId);
    
    Boolean existsByJobIdAndApplicantId(Long jobId, Long applicantId);
    
    Long countByJobId(Long jobId);
    
    Long countByJobIdAndStatus(Long jobId, ApplicationStatus status);
}



