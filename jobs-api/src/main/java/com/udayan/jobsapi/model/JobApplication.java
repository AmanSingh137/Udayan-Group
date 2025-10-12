package com.udayan.jobsapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class JobApplication {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id")
    private User applicant;
    
    @NotBlank
    private String fullName;
    
    @NotBlank
    @Email
    private String email;
    
    @NotBlank
    private String phone;
    
    @Column(length = 2000)
    private String coverLetter;
    
    private String resumeUrl;
    
    private String linkedinProfile;
    
    private Integer yearsOfExperience;
    
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.PENDING;
    
    @Column(length = 1000)
    private String notes;
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime appliedAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    public enum ApplicationStatus {
        PENDING,
        REVIEWED,
        SHORTLISTED,
        INTERVIEWING,
        ACCEPTED,
        REJECTED,
        WITHDRAWN
    }
}



