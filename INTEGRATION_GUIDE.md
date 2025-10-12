# Frontend-Backend Integration Guide

This guide will help you get the full-stack Udayan Jobs platform up and running.

## 📋 Prerequisites

1. **Backend (Spring Boot API)**
   - Java 17+
   - Maven

2. **Frontend (Next.js)**
   - Node.js 18+
   - npm or yarn

## 🚀 Quick Start

### Step 1: Start the Backend API

```bash
cd Udayan-Group/jobs-api
mvnw.cmd spring-boot:run
```

The API will start on `http://localhost:8080`

**Test Users (Pre-seeded):**
- **Employer**: username: `employer`, password: `employer123`
- **Candidate**: username: `candidate`, password: `candidate123`
- **Admin**: username: `admin`, password: `admin123`

### Step 2: Start the Frontend

```bash
cd Udayan-Group
npm install  # First time only
npm run dev
```

The app will start on `http://localhost:3000`

### Step 3: Test the Integration

1. **Visit** `http://localhost:3000/login`
2. **Login** with test credentials (employer or candidate)
3. **Browse jobs** at `/jobs`
4. **Apply for jobs** (as candidate) or **Post jobs** (as employer)

## 🔧 Configuration

### Frontend Configuration

Create a `.env.local` file in the `Udayan-Group` directory (copy from `.env.local.example`):

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

For production, update this to your production API URL.

### Backend Configuration

The backend is pre-configured for development. For production:

1. Update `jobs-api/src/main/resources/application-prod.properties`
2. Change database from H2 to MySQL
3. Update JWT secret
4. Update CORS allowed origins

## 📁 Project Structure

```
Udayan-Group/
├── jobs-api/                    # Spring Boot Backend
│   ├── src/main/java/           # Java source code
│   ├── src/main/resources/      # Configuration files
│   └── pom.xml                  # Maven dependencies
│
├── app/                         # Next.js Frontend
│   ├── lib/                     # API configuration
│   ├── services/                # API service layer
│   │   ├── authService.js       # Authentication
│   │   ├── jobService.js        # Job management
│   │   └── applicationService.js # Applications
│   ├── context/                 # React contexts
│   │   └── AuthContext.js       # Auth state management
│   ├── hooks/                   # Custom React hooks
│   │   ├── useJobs.js           # Job data hooks
│   │   └── useApplications.js   # Application hooks
│   └── components/              # React components
│
└── INTEGRATION_GUIDE.md         # This file
```

## 🔌 API Integration

### Authentication Flow

```javascript
// Login
import { useAuth } from './context/AuthContext';

function LoginComponent() {
  const { login } = useAuth();
  
  const handleLogin = async () => {
    const result = await login(username, password);
    if (result.success) {
      // Redirect to dashboard
    }
  };
}
```

### Fetching Jobs

```javascript
// Using the useJobs hook
import { useJobs } from './hooks/useJobs';

function JobsPage() {
  const { jobs, loading, error, searchJobs } = useJobs({ autoFetch: true });
  
  return (
    <div>
      {jobs.map(job => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}
```

### Applying for Jobs

```javascript
// Using the useApplications hook
import { useApplications } from './hooks/useApplications';

function ApplyPage({ jobId }) {
  const { applyForJob } = useApplications();
  
  const handleSubmit = async (formData) => {
    const result = await applyForJob({ jobId, ...formData });
    if (result.success) {
      // Show success message
    }
  };
}
```

## 🎯 Features Implemented

### Backend (Spring Boot)

✅ JWT Authentication & Authorization
✅ User Management (Admin, Employer, Candidate roles)
✅ Job CRUD Operations
✅ Job Search & Filtering
✅ Application Management
✅ Pagination Support
✅ Pre-seeded Test Data
✅ H2 Database (Development)
✅ MySQL Support (Production)

### Frontend (Next.js)

✅ User Authentication UI
✅ Job Listings with Search
✅ Job Details Page
✅ Apply for Jobs
✅ Post Jobs (Employers)
✅ Dashboard for Employers
✅ Application Tracking
✅ Responsive Design
✅ Error Handling
✅ Loading States

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication:

1. User logs in with username/password
2. Backend returns JWT token
3. Token is stored in localStorage
4. Token is sent with every API request in Authorization header
5. Token expires after 24 hours

### Protected Routes

Some pages require authentication:
- `/post-job` - Employer only
- `/dashboard` - All authenticated users
- `/apply-job/:id` - Optional (can apply without login)

## 📊 Database

### Development (H2 In-Memory)
- No setup required
- Data resets on server restart
- Access H2 Console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:jobsdb`
  - Username: `sa`
  - Password: (empty)

### Production (MySQL)

Update `application-prod.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/udayan_jobs
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## 🧪 Testing the Integration

### Test Scenario 1: Job Application Flow (Candidate)

1. Login as candidate: `candidate` / `candidate123`
2. Browse jobs at `/jobs`
3. Click on a job card
4. Fill application form
5. Submit application
6. Check success message

### Test Scenario 2: Job Posting Flow (Employer)

1. Login as employer: `employer` / `employer123`
2. Navigate to Dashboard
3. Click "Post a job"
4. Fill job details form
5. Submit job
6. View posted job in "My Posted Jobs"

### Test Scenario 3: Search & Filter

1. Go to `/jobs` (no login required)
2. Use search bar to search for "developer"
3. Apply filters (Full Time, Part Time, etc.)
4. View filtered results

## 🐛 Troubleshooting

### Backend Not Starting

**Problem**: Port 8080 already in use
**Solution**: Change port in `application.properties`:
```properties
server.port=8081
```
Then update frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8081/api
```

### CORS Errors

**Problem**: Frontend can't connect to backend
**Solution**: Check `CorsConfig.java` includes your frontend URL:
```java
config.setAllowedOriginPatterns(Arrays.asList("http://localhost:3000"));
```

### Login Not Working

**Problem**: 401 Unauthorized
**Solutions**:
- Verify backend is running
- Check credentials match test users
- Check network tab for API call details
- Verify JWT secret is configured

### Jobs Not Loading

**Problem**: Jobs page is empty
**Solutions**:
- Check backend console for errors
- Verify database has seed data
- Check browser console for API errors
- Test API directly: `http://localhost:8080/api/jobs/active`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/signup` - Register

### Jobs
- `GET /api/jobs/active` - Get active jobs
- `GET /api/jobs/search?keyword=...` - Search jobs
- `GET /api/jobs/{id}` - Get job details
- `POST /api/jobs` - Create job (Employer)
- `PUT /api/jobs/{id}` - Update job (Employer)
- `DELETE /api/jobs/{id}` - Delete job (Employer)

### Applications
- `POST /api/applications` - Apply for job
- `GET /api/applications/my-applications` - Get my applications
- `GET /api/applications/job/{jobId}` - Get job applications (Employer)
- `PATCH /api/applications/{id}/status` - Update status (Employer)

For complete API documentation, see `jobs-api/API_EXAMPLES.md`

## 🚀 Deployment

### Backend Deployment

1. Build JAR:
```bash
cd jobs-api
mvnw clean package
```

2. Run JAR:
```bash
java -jar target/jobs-api-1.0.0.jar --spring.profiles.active=prod
```

### Frontend Deployment

1. Build:
```bash
cd Udayan-Group
npm run build
```

2. Deploy to Vercel, Netlify, or your hosting platform

3. Update environment variables with production API URL

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Next.js Documentation](https://nextjs.org/docs)
- [Backend API Guide](jobs-api/README.md)
- [API Examples](jobs-api/API_EXAMPLES.md)

## 💡 Tips

1. **Use test users** for development - they're pre-seeded with data
2. **Check browser console** for frontend errors
3. **Check backend logs** for API errors
4. **Use H2 Console** to inspect database in development
5. **Test API endpoints** directly with curl or Postman

## 🆘 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review browser console and network tab
3. Check backend logs for errors
4. Verify all services are running
5. Test API endpoints independently

---

**Happy Coding! 🎉**



