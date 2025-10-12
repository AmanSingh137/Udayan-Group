"use client";

import { useState, useEffect } from 'react';
import jobService from '../services/jobService';

/**
 * Custom hook for fetching and managing jobs
 */
export const useJobs = (options = {}) => {
  const { autoFetch = true, page = 0, size = 10 } = options;
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: page,
    totalPages: 0,
    totalElements: 0,
    size: size,
  });

  const fetchActiveJobs = async (currentPage = page, pageSize = size) => {
    setLoading(true);
    setError(null);
    try {
      const response = await jobService.getActiveJobs(currentPage, pageSize);
      setJobs(response.content || []);
      setPagination({
        currentPage: response.number,
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        size: response.size,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const searchJobs = async (keyword, currentPage = 0, pageSize = size) => {
    if (!keyword) {
      return fetchActiveJobs(currentPage, pageSize);
    }
    
    setLoading(true);
    setError(null);
    try {
      const response = await jobService.searchJobs(keyword, currentPage, pageSize);
      setJobs(response.content || []);
      setPagination({
        currentPage: response.number,
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        size: response.size,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchJobsByType = async (jobType, currentPage = 0, pageSize = size) => {
    setLoading(true);
    setError(null);
    try {
      const response = await jobService.getJobsByType(jobType, currentPage, pageSize);
      setJobs(response.content || []);
      setPagination({
        currentPage: response.number,
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        size: response.size,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyJobs = async (currentPage = 0, pageSize = size) => {
    setLoading(true);
    setError(null);
    try {
      const response = await jobService.getMyJobs(currentPage, pageSize);
      setJobs(response.content || []);
      setPagination({
        currentPage: response.number,
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        size: response.size,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch your jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchActiveJobs();
    }
  }, [autoFetch]);

  return {
    jobs,
    loading,
    error,
    pagination,
    fetchActiveJobs,
    searchJobs,
    fetchJobsByType,
    fetchMyJobs,
    refresh: fetchActiveJobs,
  };
};

/**
 * Hook for fetching a single job by ID
 */
export const useJob = (jobId) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await jobService.getJobById(jobId);
        setJob(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  return { job, loading, error };
};

export default useJobs;



