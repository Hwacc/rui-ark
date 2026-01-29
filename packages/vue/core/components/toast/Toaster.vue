<script lang="ts">
export interface ToasterProps extends ToastStoreProps, Theme {
  toasterId?: string
}
</script>

<script setup lang="ts">
import type { CreateToasterProps, ToastStoreProps } from '@ark-ui/vue/toast'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { ToastOptions } from '.'
import { createToaster, Toaster } from '@ark-ui/vue/toast'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const { toasterId, theme: propsTheme, ...props } = defineProps<ToasterProps>()
defineSlots<{
  default: (props: { toast: ToastOptions }) => any
}>()
const toaster = createToaster(props as CreateToasterProps)

const theme = useTheme(() => propsTheme)
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
