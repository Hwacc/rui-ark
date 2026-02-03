import type { VirtualizerOptions } from '@tanstack/vue-virtual'

export { default as VirtualGrid } from './VirtualGrid.vue'
export { default as VirtualGridItem } from './VirtualGridItem.vue'
export { default as VirtualInfiniteLoading } from './VirtualInfiniteLoading.vue'
export { default as VirtualList } from './VirtualList.vue'
export { default as VirtualListItem } from './VirtualListItem.vue'
export { injectVirtualContext, default as VirtualRoot } from './VirtualRoot.tsx'

export interface VirtualListProps<T>
  extends Omit<
    VirtualizerOptions<Element, Element>,
    | 'enabled'
    | 'count'
    | 'getScrollElement'
    | 'estimateSize'
    | 'scrollToFn'
    | 'observeElementRect'
    | 'observeElementOffset'
  > {
  dataSource: Array<T>
  estimateSize?: VirtualizerOptions<Element, Element>['estimateSize']
  scrollToFn?: VirtualizerOptions<Element, Element>['scrollToFn']
  observeElementRect?: VirtualizerOptions<Element, Element>['observeElementRect']
  observeElementOffset?: VirtualizerOptions<Element, Element>['observeElementOffset']
}

export interface VirtualGridProps<T> {
  dataSource: Array<T>
  row?: number
  column?: number
  gap?: [number, number]
  rowVirtualizerOptions?: Omit<VirtualListProps<T>, 'dataSource'>
  columnVirtualizerOptions?: Omit<VirtualListProps<T>, 'dataSource'>
}

export enum LOADING_STATE {
  IDLE = 'idle',
  LOADING = 'loading',
  LOADED = 'loaded',
  COMPLETE = 'complete',
  ERROR = 'error',
}

export interface LoadingStateHandler {
  loading: () => void
  loaded: () => void
  complete: () => void
  error: () => void
}
