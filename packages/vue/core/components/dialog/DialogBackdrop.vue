<script lang="ts">
export interface DialogBackdropProps extends ArkDialogBackdropProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { DialogBackdropProps as ArkDialogBackdropProps } from '@ark-ui/vue/dialog'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { Dialog } from '@ark-ui/vue/dialog'
import { tvDialog } from '@rui-ark/themes/crafts/dialog'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<DialogBackdropProps>()
const forwarded = useForwardProps(props)

const theme = useTheme(() => ({ unstyled }))
const { backdrop } = tvDialog()
</script>

<template>
  <Dialog.Backdrop
    v-bind="forwarded"
    :class="backdrop({ class: propsClass, ...theme })"
  >
    <slot />
  </Dialog.Backdrop>
</template>
