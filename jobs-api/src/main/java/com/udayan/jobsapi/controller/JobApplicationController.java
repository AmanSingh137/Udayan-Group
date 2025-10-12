package com.udayan.jobsapi.controller;

import com.udayan.jobsapi.dto.ApiResponse;
import com.udayan.jobsapi.dto.JobApplicationRequest;
import com.udayan.jobsapi.dto.JobApplicationResponse;
import com.udayan.jobsapi.model.JobApplication.ApplicationStatus;
import com.udayan.jobsapi.security.UserDetailsImpl;
import com.udayan.jobsapi.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {
    
    @Autowired
    private JobApplicationService applicationService;
    
    @PostMapping
    public ResponseEntity<?> applyForJob(@Valid @RequestBody JobApplicationRequest request, 
                                        Authentication authentication) {
        try {
            String username = null;
            if (authentication != null && authentication.isAuthenticated()) {
                UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                username = userDetails.getUsername();
            }
            JobApplicationResponse response = applicationService.applyForJob(request, username);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYER', 'CANDIDATE')")
    public ResponseEntity<?> getApplicationById(@PathVariable Long id) {
        try {
            JobApplicationResponse response = applicationService.getApplicationById(id);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, "Application not found"));
        }
    }
    
    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYER')")
    public ResponseEntity<Page<JobApplicationResponse>> getApplicationsByJob(
            @PathVariable Long jobId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "appliedAt"));
        Page<JobApplicationResponse> applications = applicationService.getApplicationsByJob(jobId, pageable);
        return ResponseEntity.ok(applications);
    }
    
    @GetMapping("/my-applications")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<Page<JobApplicationResponse>> getMyApplications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "appliedAt"));
        Page<JobApplicationResponse> applications = applicationService.getApplicationsByUser(
                userDetails.getUsername(), pageable);
        return ResponseEntity.ok(applications);
    }
    
    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYER')")
    public ResponseEntity<Page<JobApplicationResponse>> getApplicationsByStatus(
            @PathVariable ApplicationStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "appliedAt"));
        Page<JobApplicationResponse> applications = applicationService.getApplicationsByStatus(status, pageable);
        return ResponseEntity.ok(applications);
    }
    
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYER')")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status,
            @RequestParam(required = false) String notes) {
        try {
            JobApplicationResponse response = applicationService.updateApplicationStatus(id, status, notes);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PatchMapping("/{id}/withdraw")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<?> withdrawApplication(@PathVariable Long id, Authentication authentication) {
        try {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            applicationService.withdrawApplication(id, userDetails.getUsername());
            return ResponseEntity.ok(new ApiResponse(true, "Application withdrawn successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @GetMapping("/job/{jobId}/count")
    public ResponseEntity<Long> getApplicationCount(@PathVariable Long jobId) {
        Long count = applicationService.getApplicationCount(jobId);
        return ResponseEntity.ok(count);
    }
}



