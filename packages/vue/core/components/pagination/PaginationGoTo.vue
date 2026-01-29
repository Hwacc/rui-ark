<script lang="ts">
export interface PaginationGoToProps extends ThemeProps {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    input?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { usePaginationContext } from '@ark-ui/vue'
import { tvPaginationGoto } from '@rui-ark/themes/crafts/pagination'
import { NumberInput } from '@rui-ark/vue-core/components/number-input'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { provide, ref, watch } from 'vue'
import { PAGINATION_GO_TO_PROVIDE_KEY } from '.'

const {
  class: propsClass,
  size,
  unstyled = undefined,
  ui,
} = defineProps<PaginationGoToProps>()

const context = usePaginationContext()
const innerValue = ref<string>(`${context.value.page}`)
watch(
  () => context.value.page,
  (p) => {
    innerValue.value = String(p)
  },
  { immediate: true },
)

function clampPage(page: string | number) {
  const nPage = Number(page)
  if (!Number.isFinite(nPage))
    return 1
  return Math.min(Math.max(Math.trunc(nPage), 1), Math.max(1, context.value.totalPages ?? 1))
}

function goInputPage() {
  const page = clampPage(innerValue.value)
  innerValue.value = String(page)
  context.value.setPage(page)
}

// theme
const theme = useTheme(() => ({ size, unstyled }))
const { root, input } = tvPaginationGoto()

provide(PAGINATION_GO_TO_PROVIDE_KEY, { goInputPage })
</script>

<template>
  <div
    :class="root({ class: [ui?.root, propsClass], ...theme })"
    data-scope="pagination"
    data-part="goto"
  >
    <slot name="prefix" />
    <NumberInput
      v-bind="theme"
      v-model="innerValue"
      :class="input({ class: ui?.input, ...theme })"
      :ui="ui?.input"
      :min="1"
      :max="context.totalPages"
      clamp-value-on-blur
      type="number"
      @keydown.enter.prevent="goInputPage"
    />
    <slot name="suffix" />
  </div>
</template>
