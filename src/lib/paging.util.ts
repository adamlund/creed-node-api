export interface PagingDefinition {
  total: number;
  result_count: number;
  page_number: number;
  previous_page_number: number;
  next_page_number: number;
  has_next: boolean;
  has_previous: boolean;
}

/**
 * Format pagination based on count and page size.
 * @param totalCount
 * @param resultCount
 * @param page
 * @param pageSize
 */
export function pagingResponse(
  totalCount: number,
  resultCount: number,
  page: number,
  pageSize: number,
): PagingDefinition {
  if (pageSize <= 0) {
    throw new Error('pageSize must be greater than zero.');
  }
  if (page < 1) {
    throw new Error('page must be a positive integer.');
  }

  const totalPages = Math.ceil(totalCount / pageSize);
  return {
    total: totalCount,
    result_count: resultCount,
    page_number: page,
    previous_page_number: page > 1 ? page - 1 : 0,
    next_page_number: page < totalPages ? page + 1 : page,
    has_next: page < totalPages,
    has_previous: page > 1,
  };
}

/**
 * Reset to page 1 if page provided is falsy.
 * @param page
 * @returns page number
 */
export function getPageNumber(page?: number): number {
  return page && page > 0 ? page : 1;
}
