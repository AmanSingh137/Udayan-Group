# Jobs API - Example Requests

This document provides practical examples for testing the API endpoints.

## Getting Started

First, start the application:
```bash
cd Udayan-Group/jobs-api
mvn spring-boot:run
```

The API will be available at: `http://localhost:8080`

## Test Users (Seeded Data)

The application comes with pre-seeded test users:

| Username  | Password     | Role      |
|-----------|--------------|-----------|
| admin     | admin123     | ADMIN     |
| employer  | employer123  | EMPLOYER  |
| candidate | candidate123 | CANDIDATE |

## Example Workflow

### 1. Register a New User

```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newemployer",
    "email": "newemployer@example.com",
    "password": "password123",
    "fullName": "New Employer",
    "company": "Tech Corp",
    "role": "EMPLOYER"
  }'
```

### 2. Login and Get JWT Token

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "employer",
    "password": "employer123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "id": 2,
  "username": "employer",
  "email": "employer@udayan.com",
  "role": "ROLE_EMPLOYER"
}
```

**Save the token for subsequent requests!**

### 3. Get All Active Jobs (No Auth Required)

```bash
curl -X GET "http://localhost:8080/api/jobs/active?page=0&size=10"
```

### 4. Search for Jobs (No Auth Required)

```bash
curl -X GET "http://localhost:8080/api/jobs/search?keyword=developer&page=0&size=10"
```

### 5. Create a New Job (Employer/Admin Only)

```bash
curl -X POST http://localhost:8080/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Full Stack Developer",
    "description": "We are looking for a talented full stack developer to join our growing team. You will work on exciting projects using modern technologies.",
    "company": "Udayan Tech",
    "location": "Austin, TX",
    "jobType": "FULL_TIME",
    "experienceLevel": "INTERMEDIATE",
    "salary": "$80,000 - $110,000",
    "requirements": "3+ years experience with JavaScript, React, Node.js, MongoDB",
    "responsibilities": "Develop frontend and backend features, write tests, participate in code reviews",
    "category": "Technology"
  }'
```

### 6. Get Job Details

```bash
curl -X GET http://localhost:8080/api/jobs/1
```

### 7. Apply for a Job (Can be done without login)

```bash
curl -X POST http://localhost:8080/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": 1,
    "fullName": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "+1234567890",
    "coverLetter": "I am very interested in this position and believe I would be a great fit...",
    "resumeUrl": "https://example.com/resume.pdf",
    "linkedinProfile": "https://linkedin.com/in/janesmith",
    "yearsOfExperience": 5
  }'
```

### 8. Get My Posted Jobs (Employer/Admin)

```bash
curl -X GET "http://localhost:8080/api/jobs/my-jobs?page=0&size=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 9. Get Applications for a Job (Employer/Admin)

```bash
curl -X GET "http://localhost:8080/api/applications/job/1?page=0&size=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 10. Update Application Status (Employer/Admin)

```bash
curl -X PATCH "http://localhost:8080/api/applications/1/status?status=SHORTLISTED&notes=Excellent qualifications" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 11. Get My Applications (Candidate)

First login as candidate:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "candidate",
    "password": "candidate123"
  }'
```

Then get applications:
```bash
curl -X GET "http://localhost:8080/api/applications/my-applications?page=0&size=10" \
  -H "Authorization: Bearer CANDIDATE_TOKEN_HERE"
```

### 12. Update a Job (Owner/Admin)

```bash
curl -X PUT http://localhost:8080/api/jobs/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Senior Full Stack Developer (Updated)",
    "description": "Updated job description...",
    "company": "Udayan Tech",
    "location": "Remote",
    "jobType": "FULL_TIME",
    "experienceLevel": "SENIOR",
    "salary": "$100,000 - $130,000",
    "requirements": "5+ years experience",
    "responsibilities": "Lead development team",
    "category": "Technology"
  }'
```

### 13. Close a Job (Owner/Admin)

```bash
curl -X PATCH "http://localhost:8080/api/jobs/1/status?status=CLOSED" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 14. Delete a Job (Owner/Admin)

```bash
curl -X DELETE http://localhost:8080/api/jobs/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 15. Get Recent Jobs

```bash
curl -X GET http://localhost:8080/api/jobs/recent
```

### 16. Get Jobs by Type

```bash
curl -X GET "http://localhost:8080/api/jobs/type/FULL_TIME?page=0&size=10"
```

### 17. Get Jobs by Category

```bash
curl -X GET "http://localhost:8080/api/jobs/category/Technology?page=0&size=10"
```

### 18. Get Application Count for a Job

```bash
curl -X GET http://localhost:8080/api/applications/job/1/count
```

## Postman Collection

You can import these requests into Postman by creating a new collection and adding:

1. Set a variable `{{baseUrl}}` = `http://localhost:8080`
2. Set a variable `{{token}}` = Your JWT token after login
3. Create requests with Authorization header: `Bearer {{token}}`

## Testing with JavaScript (Frontend Integration)

Example using fetch API:

```javascript
// Login
async function login(username, password) {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
}

// Get Active Jobs
async function getActiveJobs(page = 0, size = 10) {
  const response = await fetch(
    `http://localhost:8080/api/jobs/active?page=${page}&size=${size}`
  );
  return await response.json();
}

// Create Job (requires authentication)
async function createJob(jobData) {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(jobData),
  });
  return await response.json();
}

// Apply for Job
async function applyForJob(applicationData) {
  const response = await fetch('http://localhost:8080/api/applications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(applicationData),
  });
  return await response.json();
}
```

## Common Issues

### CORS Errors
If you get CORS errors from your frontend, make sure:
1. Your frontend URL is added to `CorsConfig.java`
2. You're including proper headers in requests

### 401 Unauthorized
- Check that your JWT token is valid and not expired
- Make sure you're including the Bearer prefix: `Bearer YOUR_TOKEN`
- Token expires after 24 hours by default

### 403 Forbidden
- Your user role doesn't have permission for this endpoint
- Check that you're logged in with the correct role (ADMIN, EMPLOYER, or CANDIDATE)

## H2 Database Console

Access the H2 console to view data directly:
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:jobsdb`
- Username: `sa`
- Password: (leave empty)

You can run SQL queries like:
```sql
SELECT * FROM users;
SELECT * FROM jobs;
SELECT * FROM job_applications;
```



