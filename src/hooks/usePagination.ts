import { useState, useMemo } from 'react';

export type PageSize = 10 | 15 | 25;

interface UsePaginationOptions {
  defaultPageSize?: PageSize;
}

export function usePagination<T>(data: T[], options: UsePaginationOptions = {}) {
  const { defaultPageSize = 25 } = options;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(defaultPageSize);

  const totalPages = useMemo(() => Math.ceil(data.length / pageSize), [data.length, pageSize]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handlePageSizeChange = (newSize: PageSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return {
    paginatedData,
    currentPage,
    pageSize,
    totalPages,
    totalItems: data.length,
    goToPage,
    setPageSize: handlePageSizeChange,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}
