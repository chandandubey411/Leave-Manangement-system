import { useState, useMemo, useCallback } from 'react';
import useDebounce from './useDebounce';

export default function useTableFilters(initialData, pageSize = 10, searchKeys = ['name']) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 250);

  const filteredData = useMemo(() => {
    const query = debouncedSearch.toLowerCase();
    
    return initialData.filter((item) => {
      // Search matching
      const matchesSearch = query === '' || searchKeys.some((key) => {
        const val = item[key];
        return typeof val === 'string' && val.toLowerCase().includes(query);
      });

      // Filter matching (exact match, 'All' ignores filter)
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (value === 'All') return true;
        return item[key] === value;
      });

      return matchesSearch && matchesFilters;
    });
  }, [initialData, debouncedSearch, searchKeys, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setFilters({});
    setCurrentPage(1);
  }, []);

  return {
    searchQuery,
    handleSearchChange,
    filters,
    handleFilterChange,
    resetFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    pageData,
    totalItems: filteredData.length,
  };
}
