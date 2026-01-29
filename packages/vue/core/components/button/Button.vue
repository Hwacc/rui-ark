<script lang="ts">
export interface ButtonProps extends Theme {
  variant?: ButtonVariants['variant'] | string
  class?: HTMLAttributes['class']
  disabled?: boolean
  tooltip?: string
  ripple?: boolean
  loading?: boolean
  asChild?: boolean
  ui?: {
    root?: {
      class?: HTMLAttributes['class']
    }
    loading?: {
      class?: HTMLAttributes['class']
    }
  }
}
</script>

<script setup lang="ts">
import type { ButtonVariants } from '@rui-ark/themes/crafts/button'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue/factory'
import { getNodeCssVar } from '@rui-ark/shared/css'
import { tvButton } from '@rui-ark/themes/crafts/button'
import { useRipple } from '@rui-ark/vue-core/composables/useRipple'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { useForwardExpose } from '@rui-ark/vue-core/libs/useForwardExpose'
import { LoaderCircle } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  variant = 'default',
  class: propsClass,
  theme: propsTheme,
  disabled,
  ripple = false,
  loading = false,
  asChild = false,
  ui,
} = defineProps<ButtonProps>()

const emits = defineEmits<{
  click: [event: MouseEvent]
}>()
const slots = defineSlots<{
  default?: () => any
  tooltip?: () => any
  loading?: () => any
}>()

const { forwardRef, currentElement } = useForwardExpose()
const rippleColor = computed(() => {
  return getNodeCssVar(
    currentElement.value,
    '--rui-ripple-color',
    'transparent',
  )
})
const {
  onRipple,
  referenceRef: rippleReferenceRef,
  Ripple,
} = useRipple({
  color: rippleColor,
})

function onClick(event: MouseEvent) {
  onRipple(event)
  emits('click', event)
}

// theme
const theme = useTheme(() => propsTheme)
const { root, loading: tvLoading } = tvButton()
</script>

<template>
  <ark.button
    :ref="
      (r) => {
        forwardRef(r)
        rippleReferenceRef = r
      }
    "
    :class="root({
      variant: variant as ButtonVariants['variant'],
      loading,
      class: [ui?.root?.class, propsClass],
      ...theme,
    })"
    :disabled="disabled"
    :data-variant="variant"
    :data-ripple="ripple ? true : undefined"
    :data-loading="loading ? true : undefined"
    :data-theme-size="theme.size"
    :as-child="asChild"
    @click="onClick"
  >
    <slot v-if="loading" name="loading">
      <LoaderCircle
        :class="tvLoading({
          variant: variant as ButtonVariants['variant'],
          loading,
          class: [ui?.loading?.class],
          ...theme,
        })"
      />
    </slot>
    <slot />
    <Ripple v-if="ripple" />
  </ark.button>
</template>
