<script lang="ts">
export interface MessagerProps extends Omit<ToastStoreProps, 'placement'> {
  unstyled?: boolean
  size?: ToastVariants['size']
}
</script>

<script setup lang="ts">
import type { ToastOptions, ToastStoreProps } from '@ark-ui/vue/toast'
import type { ToastVariants } from '@rui-ark/themes/crafts/toast'
import { createToaster, Toaster } from '@ark-ui/vue/toast'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const { unstyled, size, ...props } = defineProps<MessagerProps>()
defineSlots<{
  default: (props: { message: ToastOptions }) => any
}>()
const messager = createToaster({
  ...props,
  placement: 'top',
})

const theme = useTheme({ size, unstyled })
defineExpose({
  messager,
})
</script>

<template>
  <Toaster v-slot="message" :toaster="messager">
    <ThemeProvider :value="theme">
      <slot :message="message" />
    </ThemeProvider>
  </Toaster>
</template>
