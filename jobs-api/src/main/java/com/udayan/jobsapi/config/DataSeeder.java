package com.udayan.jobsapi.config;

import com.udayan.jobsapi.model.Job;
import com.udayan.jobsapi.model.Job.ExperienceLevel;
import com.udayan.jobsapi.model.Job.JobStatus;
import com.udayan.jobsapi.model.Job.JobType;
import com.udayan.jobsapi.model.User;
import com.udayan.jobsapi.model.User.UserRole;
import com.udayan.jobsapi.repository.JobRepository;
import com.udayan.jobsapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * This component seeds the database with initial data for testing purposes.
 * Comment out @Component annotation in production.
 */
@Component
public class DataSeeder implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Check if data already exists
        if (userRepository.count() > 0) {
            return;
        }
        
        // Create admin user
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@udayan.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setFullName("Admin User");
        admin.setRole(UserRole.ADMIN);
        admin.setEnabled(true);
        userRepository.save(admin);
        
        // Create employer user
        User employer = new User();
        employer.setUsername("employer");
        employer.setEmail("employer@udayan.com");
        employer.setPassword(passwordEncoder.encode("employer123"));
        employer.setFullName("Employer User");
        employer.setCompany("Udayan Tech");
        employer.setRole(UserRole.EMPLOYER);
        employer.setEnabled(true);
        userRepository.save(employer);
        
        // Create candidate user
        User candidate = new User();
        candidate.setUsername("candidate");
        candidate.setEmail("candidate@example.com");
        candidate.setPassword(passwordEncoder.encode("candidate123"));
        candidate.setFullName("John Candidate");
        candidate.setRole(UserRole.CANDIDATE);
        candidate.setEnabled(true);
        userRepository.save(candidate);
        
        // Create sample jobs
        Job job1 = new Job();
        job1.setTitle("Senior Java Developer");
        job1.setDescription("We are looking for an experienced Java developer to join our team. The ideal candidate should have strong experience with Spring Boot and microservices architecture.");
        job1.setCompany("Udayan Tech");
        job1.setLocation("New York, NY");
        job1.setJobType(JobType.FULL_TIME);
        job1.setExperienceLevel(ExperienceLevel.SENIOR);
        job1.setSalary("$120,000 - $150,000");
        job1.setRequirements("5+ years of Java development, Spring Boot, REST APIs, Microservices");
        job1.setResponsibilities("Design and develop backend services, mentor junior developers, code reviews");
        job1.setCategory("Technology");
        job1.setStatus(JobStatus.ACTIVE);
        job1.setApplicationDeadline(LocalDateTime.now().plusMonths(1));
        job1.setPostedBy(employer);
        jobRepository.save(job1);
        
        Job job2 = new Job();
        job2.setTitle("Frontend Developer");
        job2.setDescription("Join our team as a Frontend Developer working with React and modern web technologies.");
        job2.setCompany("Udayan Digital");
        job2.setLocation("San Francisco, CA");
        job2.setJobType(JobType.FULL_TIME);
        job2.setExperienceLevel(ExperienceLevel.INTERMEDIATE);
        job2.setSalary("$90,000 - $120,000");
        job2.setRequirements("3+ years React, TypeScript, HTML5, CSS3");
        job2.setResponsibilities("Build responsive UI components, collaborate with design team");
        job2.setCategory("Technology");
        job2.setStatus(JobStatus.ACTIVE);
        job2.setApplicationDeadline(LocalDateTime.now().plusMonths(2));
        job2.setPostedBy(employer);
        jobRepository.save(job2);
        
        Job job3 = new Job();
        job3.setTitle("DevOps Engineer");
        job3.setDescription("Seeking a DevOps engineer to help manage our cloud infrastructure and CI/CD pipelines.");
        job3.setCompany("Udayan Cloud");
        job3.setLocation("Remote");
        job3.setJobType(JobType.FULL_TIME);
        job3.setExperienceLevel(ExperienceLevel.SENIOR);
        job3.setSalary("$130,000 - $160,000");
        job3.setRequirements("AWS/Azure, Docker, Kubernetes, Jenkins, Terraform");
        job3.setResponsibilities("Manage cloud infrastructure, automate deployments, monitor systems");
        job3.setCategory("Technology");
        job3.setStatus(JobStatus.ACTIVE);
        job3.setApplicationDeadline(LocalDateTime.now().plusMonths(1));
        job3.setPostedBy(employer);
        jobRepository.save(job3);
        
        Job job4 = new Job();
        job4.setTitle("Marketing Intern");
        job4.setDescription("Great opportunity for students or recent graduates to gain marketing experience.");
        job4.setCompany("Udayan Marketing");
        job4.setLocation("Boston, MA");
        job4.setJobType(JobType.INTERNSHIP);
        job4.setExperienceLevel(ExperienceLevel.ENTRY_LEVEL);
        job4.setSalary("$20 - $25 per hour");
        job4.setRequirements("Currently enrolled in or recent graduate of Marketing program");
        job4.setResponsibilities("Assist with social media campaigns, content creation, market research");
        job4.setCategory("Marketing");
        job4.setStatus(JobStatus.ACTIVE);
        job4.setApplicationDeadline(LocalDateTime.now().plusWeeks(3));
        job4.setPostedBy(employer);
        jobRepository.save(job4);
        
        System.out.println("===========================================");
        System.out.println("Database seeded with test data!");
        System.out.println("Test Users:");
        System.out.println("  Admin - username: admin, password: admin123");
        System.out.println("  Employer - username: employer, password: employer123");
        System.out.println("  Candidate - username: candidate, password: candidate123");
        System.out.println("===========================================");
    }
}



