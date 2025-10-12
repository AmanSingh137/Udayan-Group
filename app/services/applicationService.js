/**
 * Application Service
 * Handles all job application-related API calls
 */

import apiClient from '../lib/api';

const applicationService = {
  /**
   * Apply for a job
   * @param {Object} applicationData - Application data
   * @returns {Promise} - Created application
   */
  applyForJob: async (applicationData) => {
    const response = await apiClient.post('/applications', applicationData);
    return response.data;
  },

  /**
   * Get application by ID
   * @param {number} id - Application ID
   * @returns {Promise} - Application details
   */
  getApplicationById: async (id) => {
    const response = await apiClient.get(`/applications/${id}`);
    return response.data;
  },

  /**
   * Get applications for a specific job
   * @param {number} jobId - Job ID
   * @param {number} page - Page number
   * @param {number} size - Page size
   * @returns {Promise} - Paginated application list
   */
  getApplicationsByJob: async (jobId, page = 0, size = 10) => {
    const response = await apiClient.get(
      `/applications/job/${jobId}?page=${page}&size=${size}`
    );
    return response.data;
  },

  /**
   * Get my applications (for candidates)
   * @param {number} page - Page number
   * @param {number} size - Page size
   * @returns {Promise} - Paginated application list
   */
  getMyApplications: async (page = 0, size = 10) => {
    const response = await apiClient.get(
      `/applications/my-applications?page=${page}&size=${size}`
    );
    return response.data;
  },

  /**
   * Get applications by status
   * @param {string} status - Application status
   * @param {number} page - Page number
   * @param {number} size - Page size
   * @returns {Promise} - Paginated application list
   */
  getApplicationsByStatus: async (status, page = 0, size = 10) => {
    const response = await apiClient.get(
      `/applications/status/${status}?page=${page}&size=${size}`
    );
    return response.data;
  },

  /**
   * Update application status
   * @param {number} id - Application ID
   * @param {string} status - New status
   * @param {string} notes - Optional notes
   * @returns {Promise} - Updated application
   */
  updateApplicationStatus: async (id, status, notes = '') => {
    const response = await apiClient.patch(
      `/applications/${id}/status?status=${status}${notes ? `&notes=${encodeURIComponent(notes)}` : ''}`
    );
    return response.data;
  },

  /**
   * Withdraw application
   * @param {number} id - Application ID
   * @returns {Promise}
   */
  withdrawApplication: async (id) => {
    const response = await apiClient.patch(`/applications/${id}/withdraw`);
    return response.data;
  },

  /**
   * Get application count for a job
   * @param {number} jobId - Job ID
   * @returns {Promise} - Application count
   */
  getApplicationCount: async (jobId) => {
    const response = await apiClient.get(`/applications/job/${jobId}/count`);
    return response.data;
  },
};

export default applicationService;



