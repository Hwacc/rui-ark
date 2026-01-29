<script lang="ts">
export interface SpinProps extends PolymorphicProps, Theme {
  class?: HTMLAttributes['class']
  show?: boolean
  mode?: 'fullscreen' | 'inline'
  delay?: number
  ui?: {
    root?: HTMLAttributes['class']
    mask?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
    text?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue/factory'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes, VNode } from 'vue'
import type { SpinRenderProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { tvSpin } from '@rui-ark/themes/crafts/spin'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { computed, getCurrentInstance, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const {
  show,
  mode,
  theme: propsTheme,
  delay,
  ui,
  class: propsClass,
} = defineProps<SpinProps>()

const { renderIcon }
  = inject<{ renderIcon: (props: SpinRenderProps) => VNode | null }>('SpinProvider') ?? {}

const isFullscreen = computed(() => mode === 'fullscreen')
const isVisible = ref(show)
let timeoutId: number | null = null
watch(
  () => show,
  (newVal) => {
    if (!newVal && delay) {
      timeoutId = window.setTimeout(() => {
        isVisible.value = false
        timeoutId = null
      }, delay)
    }
    else {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      isVisible.value = newVal
    }
  },
  { immediate: true },
)

const vm = getCurrentInstance()?.proxy
let parentPosition = document?.body?.style?.position ?? ''
function updateParentStyle() {
  if (isFullscreen.value) {
    document.body.style.position = isVisible.value ? 'relative' : parentPosition
  }
  else {
    const parent = vm?.$el?.parentElement
    if (parent) {
      parent.style.position = isVisible.value ? 'relative' : parentPosition
    }
  }
}
watch(isVisible, () => updateParentStyle())

onMounted(() => {
  if (isFullscreen.value) {
    parentPosition = document.body.style.position
  }
  else {
    const parent = vm?.$el?.parentElement
    if (parent) {
      parentPosition = parent.style.position
    }
  }
  updateParentStyle()
})

onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  if (isFullscreen.value) {
    document.body.style.position = ''
  }
})

const theme = useTheme(() => propsTheme)
const { root, mask, indicator, text } = tvSpin()
</script>

<template>
  <div
    v-show="isVisible"
    :class="root({ class: [ui?.root, propsClass], mode, ...theme })"
  >
    <div :class="mask({ class: ui?.mask, ...theme })" />
    <div :class="indicator({ class: ui?.indicator, mode, ...theme })">
      <slot v-bind="{ mode, ...theme }">
        <component :is="renderIcon?.({ mode, ...theme })" />
      </slot>
      <ark.span
        :class="text({ class: ui?.text, ...theme })"
        as-child
      >
        <slot name="text" />
      </ark.span>
    </div>
  </div>
</template>
