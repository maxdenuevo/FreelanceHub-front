import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Base API URL - adjust this to match your environment configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Custom hook for data fetching
 * Provides loading state, error handling, and data caching
 * @param {Function} fetchFunction - Function to fetch data
 * @param {Array} dependencies - Dependencies array for useEffect
 * @param {boolean} immediate - Whether to fetch immediately
 * @returns {Object} Fetch state and methods
 */
export const useFetch = (endpoint, immediate = false, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const getFullUrl = (url) => {
    // If URL already starts with http, assume it's a full URL
    if (url.startsWith('http')) return url;
    // Add forward slash if endpoint doesn't start with one
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${API_BASE_URL}${formattedEndpoint}`;
  };

  const execute = useCallback(async (options = {}) => {
    const { method = 'GET', data: requestData, params, headers } = options;
    
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      const url = getFullUrl(endpoint);
      const token = localStorage.getItem('token');
      
      const response = await axios({
        method,
        url,
        data: requestData,
        params,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
          ...headers
        }
      });
      
      setData(response.data);
      setIsSuccess(true);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Ocurrió un error';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  // Function to manually refresh data
  const refresh = useCallback(() => {
    return execute();
  }, [execute]);

  // Function to update data without re-fetching
  const mutate = useCallback((newData) => {
    setData(newData);
    return newData;
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, isLoading, error, isSuccess, execute, refresh, mutate };
};

/**
 * Custom hook for paginated data fetching
 * Extends useFetch with pagination functionality
 * @param {Function} fetchFunction - Function to fetch data
 * @param {Object} options - Pagination options
 * @param {Array} dependencies - Dependencies array for useEffect
 * @returns {Object} Paginated fetch state and methods
 */
export const usePaginatedFetch = (endpoint, immediate = false, initialData = []) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { data, isLoading, error, isSuccess, execute, refresh } = useFetch(
    endpoint,
    false,
    initialData
  );

  const fetchWithPagination = useCallback(async (options = {}) => {
    const { page: pageArg = page, pageSize: pageSizeArg = pageSize, ...rest } = options;
    
    try {
      const result = await execute({
        ...rest,
        params: {
          ...(rest.params || {}),
          page: pageArg,
          pageSize: pageSizeArg
        }
      });
      
      // Update pagination state based on response
      if (result.pagination) {
        setTotalItems(result.pagination.totalItems || 0);
        setTotalPages(result.pagination.totalPages || 0);
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }, [execute, page, pageSize]);

  const goToPage = useCallback(async (newPage) => {
    setPage(newPage);
    return fetchWithPagination({ page: newPage });
  }, [fetchWithPagination]);

  const nextPage = useCallback(async () => {
    if (page < totalPages) {
      return goToPage(page + 1);
    }
    return data;
  }, [goToPage, page, totalPages, data]);

  const prevPage = useCallback(async () => {
    if (page > 1) {
      return goToPage(page - 1);
    }
    return data;
  }, [goToPage, page, data]);

  const changePageSize = useCallback(async (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
    return fetchWithPagination({ page: 1, pageSize: newPageSize });
  }, [fetchWithPagination]);

  useEffect(() => {
    if (immediate) {
      fetchWithPagination();
    }
  }, [immediate, fetchWithPagination]);

  return {
    data,
    isLoading,
    error,
    isSuccess,
    page,
    pageSize,
    totalItems,
    totalPages,
    fetchWithPagination,
    goToPage,
    nextPage,
    prevPage,
    changePageSize,
    refresh
  };
};

export default useFetch; 