import { PaginationObject } from "../model/paginationModel.ts";

export const getPaginationData = (
  count: number,
  pageSize: number
): PaginationObject => {
  return {
    pageSize: pageSize,
    totalRecords: count,
    totalPages: Math.ceil(count / pageSize),
  };
};
