# 🚀 Quick Start Guide - Udayan Jobs Platform

## What You Have Now

✅ **Complete Spring Boot REST API** with authentication, job management, and applications
✅ **Integrated Next.js Frontend** with all pages connected to the backend
✅ **Test data pre-seeded** in the database for immediate testing
✅ **Authentication system** with JWT tokens and role-based access

## 🎯 Start in 3 Steps

### Step 1: Start the Backend (5 minutes)

Open a terminal in the project root:

```bash
cd Udayan-Group/jobs-api
mvnw.cmd spring-boot:run
```

Or double-click `jobs-api/start.bat`

**Wait for this message:**
```
Started JobsApiApplication in X seconds
```

Backend is now running at: `http://localhost:8080`

### Step 2: Start the Frontend (2 minutes)

Open a **NEW** terminal in the project root:

```bash
cd Udayan-Group
npm install     # First time only
npm run dev
```

Frontend is now running at: `http://localhost:3000`

### Step 3: Test It! (1 minute)

1. Open browser: `http://localhost:3000/login`
2. Login with: 
   - Username: `employer`
   - Password: `employer123`
3. Browse jobs, post jobs, apply for jobs!

## 🎮 What Can You Do?

### As an Employer (employer/employer123)
- ✅ Post new jobs
- ✅ View all your posted jobs
- ✅ See applications for your jobs
- ✅ Update application status
- ✅ Search all jobs

### As a Candidate (candidate/candidate123)
- ✅ Browse all active jobs
- ✅ Search for jobs
- ✅ Apply for jobs
- ✅ View your applications
- ✅ Filter jobs by type

### As Admin (admin/admin123)
- ✅ All employer features
- ✅ Manage all jobs
- ✅ Access all applications

## 📱 Test These Features

### 1. Browse Jobs (No login required)
- Visit: `http://localhost:3000/jobs`
- Search for "developer"
- Filter by job type
- Click on any job card

### 2. Apply for a Job (No login required)
- Click "Apply Now" on any job
- Fill the form
- Submit application
- See success message

### 3. Post a Job (Employer login required)
- Login as employer
- Click "Post a Job"
- Fill job details
- Submit
- View in "My Posted Jobs"

### 4. Manage Applications (Employer)
- Login as employer
- View jobs dashboard
- Click on a job
- See all applications
- Update status

## 🔧 Configuration Files Created

### Frontend (Next.js)
```
app/
├── lib/api.js                  # Axios configuration
├── services/
│   ├── authService.js          # Authentication APIs
│   ├── jobService.js           # Job APIs
│   └── applicationService.js   # Application APIs
├── context/AuthContext.js      # Auth state management
├── hooks/
│   ├── useJobs.js              # Job data hooks
│   └── useApplications.js      # Application hooks
└── Updated components with API integration
```

### Backend (Spring Boot)
```
jobs-api/
├── Complete REST API with JWT auth
├── Pre-seeded test data
├── H2 in-memory database
└── Full documentation
```

## 🌐 API Endpoints Available

All endpoints start with: `http://localhost:8080/api`

**Authentication:**
- POST `/auth/login` - Login
- POST `/auth/signup` - Register

**Jobs:**
- GET `/jobs/active` - Get active jobs (public)
- GET `/jobs/search?keyword=...` - Search (public)
- POST `/jobs` - Create job (auth required)
- GET `/jobs/my-jobs` - Get my jobs (auth required)

**Applications:**
- POST `/applications` - Apply for job
- GET `/applications/my-applications` - My applications
- GET `/applications/job/{id}` - Job applications (employer)

[See full API documentation in `jobs-api/API_EXAMPLES.md`]

## 🎨 Pages You Can Visit

- `/` - Home page
- `/login` - Login page (✅ Integrated)
- `/jobs` - Browse jobs (✅ Integrated)
- `/apply-job/{id}` - Apply for job (✅ Integrated)
- `/post-job` - Post job (✅ Integrated)
- `/jobs` - Dashboard view (✅ Integrated)

## 💡 Pro Tips

1. **H2 Database Console**: Visit `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:jobsdb`
   - Username: `sa`
   - Password: (empty)

2. **Test Different Roles**: Logout and login with different users to see different features

3. **API Testing**: Use the API directly at `http://localhost:8080/api/...`

4. **Check Logs**: 
   - Backend logs: In the terminal where Spring Boot is running
   - Frontend logs: Browser console (F12)

## ❓ Common Issues & Solutions

### Backend won't start
- **Issue**: Port 8080 in use
- **Fix**: Change port in `jobs-api/src/main/resources/application.properties`

### Frontend can't connect to backend
- **Issue**: CORS error
- **Fix**: Check backend is running on `localhost:8080`

### Login doesn't work
- **Issue**: Wrong credentials
- **Fix**: Use exact usernames/passwords listed above

### Jobs not loading
- **Issue**: Backend not started
- **Fix**: Make sure Step 1 is completed first

## 📚 Documentation

- **Integration Guide**: `INTEGRATION_GUIDE.md`
- **Backend API**: `jobs-api/README.md`
- **API Examples**: `jobs-api/API_EXAMPLES.md`
- **Quick Start**: `jobs-api/QUICK_START.md`

## 🎉 Next Steps

1. **Customize the UI** - Modify components to match your design
2. **Add more features** - Build on the solid foundation
3. **Deploy** - Follow deployment guides in documentation
4. **Connect to MySQL** - For production (instructions in API README)

## 🆘 Need Help?

1. Check browser console (F12)
2. Check backend logs
3. Review `INTEGRATION_GUIDE.md`
4. Test API endpoints directly
5. Check H2 console for database state

---

## 🚀 You're All Set!

**Backend API**: ✅ Running on port 8080
**Frontend App**: ✅ Running on port 3000  
**Database**: ✅ H2 in-memory with test data
**Authentication**: ✅ JWT with 3 test users
**Integration**: ✅ Complete and working

**Start coding and building amazing features! 💪**



