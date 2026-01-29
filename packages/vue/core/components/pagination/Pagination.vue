<script lang="ts">
export interface PaginationProps extends PaginationRootProps, Theme {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    firstPage?: HTMLAttributes['class']
    prevPage?: HTMLAttributes['class']
    nextPage?: HTMLAttributes['class']
    lastPage?: HTMLAttributes['class']
    item?: HTMLAttributes['class']
    ellipsis?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { PaginationRootEmits, PaginationRootProps } from '@ark-ui/vue/pagination'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { Pagination, usePagination } from '@ark-ui/vue/pagination'
import { tvPagination } from '@rui-ark/themes/crafts/pagination'
import { cn } from '@rui-ark/themes/utils/cn'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<PaginationProps>()

const emit = defineEmits<PaginationRootEmits>()
const pagination = usePagination(useForwardProps(props), emit)

// theme
const theme = useTheme(() => propsTheme)
const { root, control, item, ellipsis } = tvPagination()
const itemClx = computed(() => item({ ...theme.value }))

// expose
defineExpose({ $api: pagination })
useForwardExpose()
</script>

<template>
  <Pagination.RootProvider
    :value="pagination"
    :class="root({ class: [ui?.root, propsClass], ...theme })"
  >
    <ThemeProvider :value="theme">
      <ark.div
        :class="control({ class: [ui?.control], ...theme })"
        data-scope="pagination"
        data-part="control"
      >
        <ark.button
          :class="cn(itemClx, ui?.firstPage)"
          @click="pagination.goToFirstPage"
        >
          <ChevronsLeft />
        </ark.button>
        <Pagination.PrevTrigger :class="cn(itemClx, ui?.prevPage)">
          <ChevronLeft />
        </Pagination.PrevTrigger>
        <template
          v-for="(page, index) in pagination.pages"
          :key="index"
        >
          <Pagination.Item
            v-if="page.type === 'page'"
            v-bind="page"
            :class="cn(itemClx, ui?.item)"
          >
            {{ page.value }}
          </Pagination.Item>
          <Pagination.Ellipsis
            v-else
            :index="index"
            :class="ellipsis({ class: [ui?.ellipsis], ...theme })"
          >
            &#8230;
          </Pagination.Ellipsis>
        </template>
        <Pagination.NextTrigger :class="cn(itemClx, ui?.nextPage)">
          <ChevronRight />
        </Pagination.NextTrigger>
        <ark.button
          :class="cn(itemClx, ui?.lastPage)"
          @click="pagination.goToLastPage"
        >
          <ChevronsRight />
        </ark.button>
      </ark.div>
      <slot />
    </ThemeProvider>
  </Pagination.RootProvider>
</template>
