<script lang="ts">
export interface PaginationPageSizeProps extends Theme {
  class?: HTMLAttributes['class']
  sizes?: number[]
  placeholder?: string
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    trigger?: HTMLAttributes['class']
    value?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    item?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { usePaginationContext } from '@ark-ui/vue'
import { createListCollection } from '@ark-ui/vue/collection'
import { tvPaginationPageSize } from '@rui-ark/themes/crafts/pagination'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { uniq } from 'es-toolkit'
import { computed, ref, watch } from 'vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select'

const {
  class: propsClass,
  theme: propsTheme,
  sizes,
  placeholder,
  ui,
} = defineProps<PaginationPageSizeProps>()

const context = usePaginationContext()
const modelValue = ref<string[]>([String(context.value.pageSize)])
watch(modelValue, (v: string[]) => context.value.setPageSize(Number(v[0])), { immediate: true })

const sizeItems = computed(() => {
  const list = uniq(sizes?.length ? sizes : [10, 20, 30, 50])
  return list.map(n => ({ label: String(n), value: String(n) }))
})
const collection = computed(() => createListCollection({ items: sizeItems.value }))

// theme
const theme = useTheme(() => propsTheme)
const { root, control, trigger, value, content, item: tvItem } = tvPaginationPageSize()
</script>

<template>
  <div
    :class="root({ class: [ui?.root, propsClass], ...theme })"
    data-scope="pagination"
    data-part="page-size"
  >
    <slot name="prefix" />
    <Select
      v-bind="theme"
      v-model="modelValue"
      :collection="collection"
      :class="control({ class: ui?.control, ...theme })"
    >
      <SelectTrigger :class="trigger({ class: ui?.trigger, ...theme })">
        <SelectValue
          :class="value({ class: ui?.value, ...theme })"
          :placeholder="placeholder ?? 'Page size'"
        />
      </SelectTrigger>
      <SelectContent :class="content({ class: ui?.content, ...theme })">
        <SelectItem
          v-for="item in collection.items"
          :key="item.value"
          :item="item"
          :class="tvItem({ class: ui?.item, ...theme })"
        >
          {{ item.label }}
          <template #indicator>
            <span />
          </template>
        </SelectItem>
      </SelectContent>
    </Select>
    <slot name="suffix" />
  </div>
</template>
