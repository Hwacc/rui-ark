<script lang="ts">
export interface ButtonProps {
  variant?: ButtonVariants['variant'] | string
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: boolean
  checked?: boolean
  tooltip?: string
  unstyled?: boolean
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
  size,
  class: propsClass,
  disabled,
  checked = false,
  unstyled,
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

const theme = useTheme({ size, unstyled })
const { base, loading: tvLoading } = tvButton()
</script>

<template>
  <ark.button
    :ref="
      (r) => {
        forwardRef(r)
        rippleReferenceRef = r
      }
    "
    :class="base({
      variant: variant as ButtonVariants['variant'],
      loading,
      class: [ui?.root?.class, propsClass],
      ...theme,
    })"
    :disabled="disabled"
    :data-variant="variant"
    :data-ripple="ripple ? true : undefined"
    :data-loading="loading ? true : undefined"
    :data-switch-state="
      variant === 'switch' ? (checked ? 'checked' : 'unchecked') : undefined
    "
    :data-size="theme.size"
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
