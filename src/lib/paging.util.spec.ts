import { Test, TestingModule } from '@nestjs/testing';
import { pagingResponse, PagingDefinition } from './paging.util';

describe('Paging utils', () => {
  describe('pagination settings', () => {
    it('should handle a single page of results correctly', () => {
      const result = pagingResponse(15, 15, 1, 15);
      const expected: PagingDefinition = {
        total: 15,
        result_count: 15,
        page_number: 1,
        previous_page_number: 0,
        next_page_number: 1,
        has_next: false,
        has_previous: false,
      };
      expect(result).toEqual(expected);
    });

    it('should handle a multiple page of results correctly', () => {
      const result = pagingResponse(24, 15, 1, 15);
      const expected: PagingDefinition = {
        total: 24,
        result_count: 15,
        page_number: 1,
        previous_page_number: 0,
        next_page_number: 2,
        has_next: true,
        has_previous: false,
      };
      expect(result).toEqual(expected);

      const result2 = pagingResponse(158, 15, 10, 15);
      const expected2: PagingDefinition = {
        total: 158,
        result_count: 15,
        page_number: 10,
        previous_page_number: 9,
        next_page_number: 11,
        has_next: true,
        has_previous: true,
      };
      expect(result2).toEqual(expected2);
    });

    it('should handle zero results correctly', () => {
      const result = pagingResponse(0, 0, 1, 15);
      const expected: PagingDefinition = {
        total: 0,
        result_count: 0,
        page_number: 1,
        previous_page_number: 0,
        next_page_number: 1,
        has_next: false,
        has_previous: false,
      };
      expect(result).toEqual(expected);
    });

    it('should handle requests for a page beyond total pages', () => {
      const result = pagingResponse(30, 10, 4, 10);
      const expected: PagingDefinition = {
        total: 30,
        result_count: 10,
        page_number: 4,
        previous_page_number: 3,
        next_page_number: 4,
        has_next: false,
        has_previous: true,
      };
      expect(result).toEqual(expected);
    });

    it('should handle zero page size (expect error)', () => {
      expect(() => pagingResponse(100, 100, 1, 0)).toThrow(
        'pageSize must be greater than zero.',
      );
    });

    it('should handle negative page size (expect error)', () => {
      expect(() => pagingResponse(100, 100, 1, -10)).toThrow(
        'pageSize must be greater than zero.',
      );
    });

    it('should handle negative page number (expect error)', () => {
      expect(() => pagingResponse(100, 100, -1, 10)).toThrow(
        'page must be a positive integer.',
      );
    });
  });
});
