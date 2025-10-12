"use client";

import { useState, useEffect } from 'react';
import applicationService from '../services/applicationService';

/**
 * Custom hook for managing job applications
 */
export const useApplications = (options = {}) => {
  const { jobId, autoFetch = false, page = 0, size = 10 } = options;
  
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: page,
    totalPages: 0,
    totalElements: 0,
    size: size,
  });

  const fetchApplicationsByJob = async (currentJobId, currentPage = page, pageSize = size) => {
    setLoading(true);
    setError(null);
    try {
      const response = await applicationService.getApplicationsByJob(
        currentJobId,
        currentPage,
        pageSize
      );
      setApplications(response.content || []);
      setPagination({
        currentPage: response.number,
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        size: response.size,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyApplications = async (currentPage = 0, pageSize = size) => {
    setLoading(true);
    setError(null);
    try {
      const response = await applicationService.getMyApplications(currentPage, pageSize);
      setApplications(response.content || []);
      setPagination({
        currentPage: response.number,
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        size: response.size,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch your applications');
    } finally {
      setLoading(false);
    }
  };

  const applyForJob = async (applicationData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await applicationService.applyForJob(applicationData);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to submit application';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, status, notes = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await applicationService.updateApplicationStatus(
        applicationId,
        status,
        notes
      );
      // Update local state
      setApplications((prev) =>
        prev.map((app) => (app.id === applicationId ? response : app))
      );
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update status';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const withdrawApplication = async (applicationId) => {
    setLoading(true);
    setError(null);
    try {
      await applicationService.withdrawApplication(applicationId);
      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: 'WITHDRAWN' } : app
        )
      );
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to withdraw application';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && jobId) {
      fetchApplicationsByJob(jobId);
    }
  }, [autoFetch, jobId]);

  return {
    applications,
    loading,
    error,
    pagination,
    fetchApplicationsByJob,
    fetchMyApplications,
    applyForJob,
    updateStatus,
    withdrawApplication,
  };
};

export default useApplications;



