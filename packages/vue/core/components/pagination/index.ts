export { default as Pagination, type PaginationProps } from './Pagination.vue'
export { default as PaginationGoTo, type PaginationGoToProps } from './PaginationGoTo.vue'
export {
  default as PaginationGoToTrigger,
  type PaginationGoToTriggerProps,
} from './PaginationGoToTrigger.vue'
export { default as PaginationPageSize, type PaginationPageSizeProps } from './PaginationPageSize.vue'

export const PAGINATION_GO_TO_PROVIDE_KEY = Symbol('PAGINATION_GO_TO_PROVIDE_KEY')
