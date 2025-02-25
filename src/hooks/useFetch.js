import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for data fetching
 * Provides loading state, error handling, and data caching
 * @param {Function} fetchFunction - Function to fetch data
 * @param {Array} dependencies - Dependencies array for useEffect
 * @param {boolean} immediate - Whether to fetch immediately
 * @returns {Object} Fetch state and methods
 */
export const useFetch = (fetchFunction, dependencies = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Execute the fetch function
   * @param {any} params - Parameters to pass to the fetch function
   * @returns {Promise<any>} Fetch result
   */
  const execute = useCallback(async (...params) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      const result = await fetchFunction(...params);
      setData(result);
      setIsSuccess(true);
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Error al obtener los datos';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction]);

  // Fetch data on mount if immediate=true
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [...dependencies, execute, immediate]);

  /**
   * Refresh data - calls execute with the same parameters
   * @returns {Promise<any>} Fetch result
   */
  const refresh = useCallback(() => {
    return execute();
  }, [execute]);

  /**
   * Update data without re-fetching
   * @param {Function} updater - Function to update data
   */
  const updateData = useCallback((updater) => {
    setData(prev => {
      if (typeof updater === 'function') {
        return updater(prev);
      }
      return updater;
    });
  }, []);

  return {
    data,
    isLoading,
    error,
    isSuccess,
    execute,
    refresh,
    updateData
  };
};

/**
 * Custom hook for paginated data fetching
 * Extends useFetch with pagination functionality
 * @param {Function} fetchFunction - Function to fetch data
 * @param {Object} options - Pagination options
 * @param {Array} dependencies - Dependencies array for useEffect
 * @returns {Object} Paginated fetch state and methods
 */
export const usePaginatedFetch = (
  fetchFunction,
  options = { initialPage: 1, pageSize: 10 },
  dependencies = []
) => {
  const [page, setPage] = useState(options.initialPage);
  const [pageSize, setPageSize] = useState(options.pageSize);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch function with pagination params
  const fetchWithPagination = useCallback(async () => {
    const result = await fetchFunction({ page, pageSize });
    
    // Handle different API response formats
    if (result.totalItems !== undefined && result.totalPages !== undefined) {
      setTotalItems(result.totalItems);
      setTotalPages(result.totalPages);
    } else if (Array.isArray(result)) {
      // If the API doesn't return pagination info, calculate it
      setTotalItems(result.length);
      setTotalPages(Math.ceil(result.length / pageSize));
    }
    
    return result;
  }, [fetchFunction, page, pageSize]);

  // Use the base useFetch hook
  const {
    data,
    isLoading,
    error,
    isSuccess,
    execute,
    refresh,
    updateData
  } = useFetch(fetchWithPagination, [...dependencies, page, pageSize]);

  // Pagination methods
  const goToPage = useCallback((newPage) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  }, [page, totalPages]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }, [page]);

  const changePageSize = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
  }, []);

  return {
    data,
    isLoading,
    error,
    isSuccess,
    execute,
    refresh,
    updateData,
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages,
      goToPage,
      nextPage,
      prevPage,
      changePageSize
    }
  };
};

export default useFetch; 