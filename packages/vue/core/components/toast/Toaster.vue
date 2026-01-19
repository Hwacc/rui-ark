<script lang="ts">
export interface ToasterProps extends ToastStoreProps, ThemeProps {
  toasterId?: string
}
</script>

<script setup lang="ts">
import type { CreateToasterProps, ToastStoreProps } from '@ark-ui/vue/toast'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { ToastOptions } from '.'
import { createToaster, Toaster } from '@ark-ui/vue/toast'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const { toasterId, unstyled, size, ...props } = defineProps<ToasterProps>()
defineSlots<{
  default: (props: { toast: ToastOptions }) => any
}>()
const toaster = createToaster(props as CreateToasterProps)

const theme = useTheme(() => ({ size, unstyled }))
defineExpose({
  toasterId,
  toaster,
})
</script>

<template>
  <Toaster v-slot="toast" :toaster="toaster">
    <ThemeProvider :value="theme">
      <slot :toast="toast" />
    </ThemeProvider>
  </Toaster>
</template>
