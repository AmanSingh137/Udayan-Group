/**
 * Job Service
 * Handles all job-related API calls
 */

import apiClient from '../lib/api';

const jobService = {
  /**
   * Get all active jobs with pagination
   * @param {number} page - Page number (default: 0)
   * @param {number} size - Page size (default: 10)
   * @returns {Promise} - Paginated job list
   */
  getActiveJobs: async (page = 0, size = 10) => {
    const response = await apiClient.get(`/jobs/active?page=${page}&size=${size}`);
    return response.data;
  },

  /**
   * Search jobs by keyword
   * @param {string} keyword - Search keyword
   * @param {number} page - Page number
   * @param {number} size - Page size
   * @returns {Promise} - Paginated search results
   */
  searchJobs: async (keyword, page = 0, size = 10) => {
    const response = await apiClient.get(
      `/jobs/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`
    );
    return response.data;
  },

  /**
   * Get job by ID
   * @param {number} id - Job ID
   * @returns {Promise} - Job details
   */
  getJobById: async (id) => {
    const response = await apiClient.get(`/jobs/${id}`);
    return response.data;
  },

  /**
   * Get recent jobs
   * @returns {Promise} - List of recent jobs
   */
  getRecentJobs: async () => {
    const response = await apiClient.get('/jobs/recent');
    return response.data;
  },

  /**
   * Get jobs by type
   * @param {string} jobType - Job type (FULL_TIME, PART_TIME, etc.)
   * @param {number} page - Page number
   * @param {number} size - Page size
   * @returns {Promise} - Paginated job list
   */
  getJobsByType: async (jobType, page = 0, size = 10) => {
    const response = await apiClient.get(`/jobs/type/${jobType}?page=${page}&size=${size}`);
    return response.data;
  },

  /**
   * Get jobs by category
   * @param {string} category - Job category
   * @param {number} page - Page number
   * @param {number} size - Page size
   * @returns {Promise} - Paginated job list
   */
  getJobsByCategory: async (category, page = 0, size = 10) => {
    const response = await apiClient.get(
      `/jobs/category/${encodeURIComponent(category)}?page=${page}&size=${size}`
    );
    return response.data;
  },

  /**
   * Get my posted jobs (for employers)
   * @param {number} page - Page number
   * @param {number} size - Page size
   * @returns {Promise} - Paginated job list
   */
  getMyJobs: async (page = 0, size = 10) => {
    const response = await apiClient.get(`/jobs/my-jobs?page=${page}&size=${size}`);
    return response.data;
  },

  /**
   * Create a new job
   * @param {Object} jobData - Job data
   * @returns {Promise} - Created job
   */
  createJob: async (jobData) => {
    const response = await apiClient.post('/jobs', jobData);
    return response.data;
  },

  /**
   * Update a job
   * @param {number} id - Job ID
   * @param {Object} jobData - Updated job data
   * @returns {Promise} - Updated job
   */
  updateJob: async (id, jobData) => {
    const response = await apiClient.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  /**
   * Update job status
   * @param {number} id - Job ID
   * @param {string} status - New status (ACTIVE, CLOSED, DRAFT)
   * @returns {Promise} - Updated job
   */
  updateJobStatus: async (id, status) => {
    const response = await apiClient.patch(`/jobs/${id}/status?status=${status}`);
    return response.data;
  },

  /**
   * Delete a job
   * @param {number} id - Job ID
   * @returns {Promise}
   */
  deleteJob: async (id) => {
    const response = await apiClient.delete(`/jobs/${id}`);
    return response.data;
  },
};

export default jobService;



