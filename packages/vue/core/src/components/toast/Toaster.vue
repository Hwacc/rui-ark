<script setup lang="ts">
import type { CreateToasterProps } from '@ark-ui/vue/toast'
import type { ToasterProps, ToastOptions } from '.'
import { createToaster, Toaster } from '@ark-ui/vue/toast'
import { useTheme } from '@rark-ui/vue/composables/useTheme'
import { ThemeProvider } from '@rark-ui/vue/providers/theme'

const { toasterId, theme: propsTheme, ...props } = defineProps<ToasterProps>()
// slots
defineSlots<{
  default: (props: { toast: ToastOptions<any> }) => any
}>()

const toaster = createToaster(props as CreateToasterProps)

// theme
const theme = useTheme(() => propsTheme)

// expose
defineExpose({
  toasterId,
  toaster,
})
</script>

<template>
  <Toaster
    v-slot="toast"
    :toaster="toaster"
  >
    <ThemeProvider :value="theme">
      <slot :toast="toast" />
    </ThemeProvider>
  </Toaster>
</template>
