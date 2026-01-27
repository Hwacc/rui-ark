<script lang="ts">
export interface PaginationProps extends PaginationRootProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { PaginationRootEmits, PaginationRootProps } from '@ark-ui/vue/pagination'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { Pagination, usePagination } from '@ark-ui/vue/pagination'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ChevronLeft } from 'lucide-vue-next'

const { class: propsClass, size, unstyled = undefined, ...props } = defineProps<PaginationProps>()

const emit = defineEmits<PaginationRootEmits>()
const pagination = usePagination(useForwardProps(props), emit)

// theme
const theme = useTheme(() => ({ size, unstyled }))

// expose
defineExpose({ $api: pagination })
useForwardExpose()
</script>

<template>
  <Pagination.RootProvider :value="pagination">
    <ThemeProvider :value="theme">
      <ark.div
        data-scope="pagination"
        data-part="control"
      >
        <Pagination.PrevTrigger>
          <ChevronLeft />
        </Pagination.PrevTrigger>
        <template
          v-for="(page, index) in pagination.pages"
          :key="index"
        >
          <Pagination.Item
            v-if="page.type === 'page'"
            v-bind="page"
          >
            {{ page.value }}
          </Pagination.Item>
          <Pagination.Ellipsis
            v-else
            :index="index"
          >
            &#8230;
          </Pagination.Ellipsis>
        </template>
      </ark.div>
      <slot />
    </ThemeProvider>
  </Pagination.RootProvider>
</template>
