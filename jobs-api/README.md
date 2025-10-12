# Udayan Group Jobs API

A comprehensive REST API built with Spring Boot for managing job postings and applications for the Udayan Group jobs platform.

## Features

- **User Authentication**: JWT-based authentication with role-based access control (Admin, Employer, Candidate)
- **Job Management**: CRUD operations for job postings with search, filter, and pagination
- **Application Management**: Submit and track job applications
- **Security**: Spring Security with JWT token authentication
- **Database**: H2 in-memory database (development) with MySQL support (production)

## Technology Stack

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- JWT (JSON Web Tokens)
- H2/MySQL Database
- Maven
- Lombok

## Prerequisites

- Java 17 or higher
- Maven 3.6+

## Getting Started

### 1. Clone the repository

```bash
cd Udayan-Group/jobs-api
```

### 2. Build the project

```bash
mvn clean install
```

### 3. Run the application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### 4. Access H2 Console (Development)

- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:jobsdb`
- Username: `sa`
- Password: (leave empty)

## API Endpoints

### Authentication

#### Register a new user
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phone": "+1234567890",
  "role": "CANDIDATE"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "role": "ROLE_CANDIDATE"
}
```

### Jobs

#### Create a job (Employer/Admin only)
```http
POST /api/jobs
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Senior Software Engineer",
  "description": "We are looking for an experienced software engineer...",
  "company": "Udayan Tech",
  "location": "New York, NY",
  "jobType": "FULL_TIME",
  "experienceLevel": "SENIOR",
  "salary": "$120,000 - $150,000",
  "requirements": "5+ years of experience...",
  "responsibilities": "Design and develop...",
  "category": "Technology",
  "applicationDeadline": "2025-12-31T23:59:59"
}
```

#### Get all active jobs
```http
GET /api/jobs/active?page=0&size=10
```

#### Search jobs
```http
GET /api/jobs/search?keyword=engineer&page=0&size=10
```

#### Get job by ID
```http
GET /api/jobs/{id}
```

#### Get recent jobs
```http
GET /api/jobs/recent
```

#### Get jobs by type
```http
GET /api/jobs/type/FULL_TIME?page=0&size=10
```

#### Get jobs by category
```http
GET /api/jobs/category/Technology?page=0&size=10
```

#### Get my posted jobs (Employer/Admin)
```http
GET /api/jobs/my-jobs?page=0&size=10
Authorization: Bearer {token}
```

#### Update a job (Owner/Admin only)
```http
PUT /api/jobs/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  ...
}
```

#### Update job status (Owner/Admin only)
```http
PATCH /api/jobs/{id}/status?status=CLOSED
Authorization: Bearer {token}
```

#### Delete a job (Owner/Admin only)
```http
DELETE /api/jobs/{id}
Authorization: Bearer {token}
```

### Job Applications

#### Apply for a job
```http
POST /api/applications
Authorization: Bearer {token} (optional for candidates)
Content-Type: application/json

{
  "jobId": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "coverLetter": "I am very interested in this position...",
  "resumeUrl": "https://example.com/resume.pdf",
  "linkedinProfile": "https://linkedin.com/in/johndoe",
  "yearsOfExperience": 5
}
```

#### Get application by ID
```http
GET /api/applications/{id}
Authorization: Bearer {token}
```

#### Get applications for a job (Employer/Admin)
```http
GET /api/applications/job/{jobId}?page=0&size=10
Authorization: Bearer {token}
```

#### Get my applications (Candidate)
```http
GET /api/applications/my-applications?page=0&size=10
Authorization: Bearer {token}
```

#### Get applications by status (Employer/Admin)
```http
GET /api/applications/status/PENDING?page=0&size=10
Authorization: Bearer {token}
```

#### Update application status (Employer/Admin)
```http
PATCH /api/applications/{id}/status?status=SHORTLISTED&notes=Great candidate
Authorization: Bearer {token}
```

#### Withdraw application (Candidate)
```http
PATCH /api/applications/{id}/withdraw
Authorization: Bearer {token}
```

#### Get application count for a job
```http
GET /api/applications/job/{jobId}/count
```

## Data Models

### User Roles
- `ADMIN`: Full system access
- `EMPLOYER`: Can post and manage jobs, view applications
- `CANDIDATE`: Can apply for jobs, view own applications

### Job Types
- `FULL_TIME`
- `PART_TIME`
- `CONTRACT`
- `INTERNSHIP`
- `TEMPORARY`

### Experience Levels
- `ENTRY_LEVEL`
- `INTERMEDIATE`
- `SENIOR`
- `EXECUTIVE`

### Job Status
- `ACTIVE`: Job is open for applications
- `CLOSED`: Job is no longer accepting applications
- `DRAFT`: Job is not yet published

### Application Status
- `PENDING`: Application submitted, awaiting review
- `REVIEWED`: Application has been reviewed
- `SHORTLISTED`: Candidate has been shortlisted
- `INTERVIEWING`: Candidate is in interview process
- `ACCEPTED`: Application accepted
- `REJECTED`: Application rejected
- `WITHDRAWN`: Application withdrawn by candidate

## Configuration

### Database Configuration

**Development (H2):**
```properties
spring.datasource.url=jdbc:h2:mem:jobsdb
spring.datasource.username=sa
spring.datasource.password=
```

**Production (MySQL):**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/udayan_jobs
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### JWT Configuration

Update in `application.properties`:
```properties
jwt.secret=your-secret-key-here
jwt.expiration=86400000
```

### CORS Configuration

Update allowed origins in `CorsConfig.java` for production:
```java
config.setAllowedOriginPatterns(Arrays.asList("https://yourdomain.com"));
```

## Security

- All passwords are encrypted using BCrypt
- JWT tokens expire after 24 hours (configurable)
- Role-based access control for protected endpoints
- CORS enabled for frontend integration

## Error Handling

The API returns appropriate HTTP status codes:
- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Testing with Postman/cURL

### Example: Complete workflow

1. Register a user:
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"employer1","email":"employer@test.com","password":"pass123","role":"EMPLOYER","fullName":"Test Employer"}'
```

2. Login and get token:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"employer1","password":"pass123"}'
```

3. Create a job:
```bash
curl -X POST http://localhost:8080/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Software Engineer","description":"Great opportunity","company":"Udayan","location":"Remote","jobType":"FULL_TIME","experienceLevel":"INTERMEDIATE"}'
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any queries, please contact the Udayan Group development team.



