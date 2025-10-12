package com.udayan.jobsapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Job {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String title;
    
    @NotBlank
    @Column(length = 5000)
    private String description;
    
    @NotBlank
    private String company;
    
    @NotBlank
    private String location;
    
    @Enumerated(EnumType.STRING)
    @NotNull
    private JobType jobType;
    
    @Enumerated(EnumType.STRING)
    @NotNull
    private ExperienceLevel experienceLevel;
    
    private String salary;
    
    @Column(length = 2000)
    private String requirements;
    
    @Column(length = 2000)
    private String responsibilities;
    
    private String category;
    
    @Enumerated(EnumType.STRING)
    private JobStatus status = JobStatus.ACTIVE;
    
    private LocalDateTime applicationDeadline;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posted_by_id")
    private User postedBy;
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    private Set<JobApplication> applications = new HashSet<>();
    
    public enum JobType {
        FULL_TIME,
        PART_TIME,
        CONTRACT,
        INTERNSHIP,
        TEMPORARY
    }
    
    public enum ExperienceLevel {
        ENTRY_LEVEL,
        INTERMEDIATE,
        SENIOR,
        EXECUTIVE
    }
    
    public enum JobStatus {
        ACTIVE,
        CLOSED,
        DRAFT
    }
}



