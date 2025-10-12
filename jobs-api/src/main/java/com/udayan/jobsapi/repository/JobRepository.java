package com.udayan.jobsapi.repository;

import com.udayan.jobsapi.model.Job;
import com.udayan.jobsapi.model.Job.JobStatus;
import com.udayan.jobsapi.model.Job.JobType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    
    Page<Job> findByStatus(JobStatus status, Pageable pageable);
    
    Page<Job> findByPostedById(Long userId, Pageable pageable);
    
    Page<Job> findByJobType(JobType jobType, Pageable pageable);
    
    Page<Job> findByCategory(String category, Pageable pageable);
    
    @Query("SELECT j FROM Job j WHERE " +
           "LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.company) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.location) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Job> searchJobs(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT j FROM Job j WHERE j.status = :status AND " +
           "(LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.company) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.location) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Job> searchActiveJobs(@Param("keyword") String keyword, @Param("status") JobStatus status, Pageable pageable);
    
    List<Job> findTop10ByStatusOrderByCreatedAtDesc(JobStatus status);
}



