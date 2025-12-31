<script lang="ts">
export type DialogOpenChangeDetails = OpenChangeDetails & {
  // the trigger that toggled the dialog
  from: DialogTriggerFrom
}
export interface DialogProps extends DialogRootProps {
  class?: HTMLAttributes['class']
  unstyled?: boolean
}
type UseDialogPropsEx = UseDialogProps & {
  onOpenChange: (details: DialogOpenChangeDetails) => void
}
export interface DialogEmits extends DialogRootEmits {
  'update:open': [open: boolean]
  'openChange': [details: DialogOpenChangeDetails]
  'escapeKeyDown': [event: KeyboardEvent]
  'focusOutside': [event: FocusOutsideEvent]
  'interactOutside': [event: InteractOutsideEvent]
  'pointerDownOutside': [event: PointerDownOutsideEvent]
  'requestDismiss': [event: RequestDismissEvent]
}
</script>

<script setup lang="ts">
import type {
  DialogRootEmits,
  DialogRootProps,
  UseDialogProps,
} from '@ark-ui/vue/dialog'
import type { HTMLAttributes } from 'vue'
import type {
  DialogInterceptContext,
  DialogTriggerFrom,
  FocusOutsideEvent,
  InteractOutsideEvent,
  OpenChangeDetails,
  PointerDownOutsideEvent,
  RequestDismissEvent,
} from './dialog-intercept-context'
import { useForwardProps } from '@ark-ui/vue'
import { Dialog, useDialog } from '@ark-ui/vue/dialog'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { computed, ref } from 'vue'
import { TriggerFrom } from './dialog-intercept-context'
import DialogInterceptProvider from './DialogInterceptProvider.vue'

const { class: propsClass, unstyled, ...props } = defineProps<DialogProps>()
const emits = defineEmits<DialogEmits>()
const forwarded = useForwardProps<DialogRootProps, UseDialogPropsEx>(props)

const triggerFrom = ref<DialogTriggerFrom>(undefined)
const dialogInterceptContext: DialogInterceptContext = {
  triggerFrom,
  onOpenChange: (details: OpenChangeDetails) => {
    emits('openChange', { ...details, from: triggerFrom.value })
    emits('update:open', details.open)
    forwarded.value.onOpenChange?.({ ...details, from: triggerFrom.value })
  },
  onEscapeKeyDown: (event: KeyboardEvent) => {
    triggerFrom.value = TriggerFrom.ESCAPE
    emits('escapeKeyDown', event)
    forwarded.value.onEscapeKeyDown?.(event)
  },
  onFocusOutside: (event: FocusOutsideEvent) => {
    emits('focusOutside', event)
    forwarded.value.onFocusOutside?.(event)
  },
  onInteractOutside: (event: InteractOutsideEvent) => {
    triggerFrom.value = TriggerFrom.OUTSIDE
    emits('interactOutside', event)
    forwarded.value.onInteractOutside?.(event)
  },
  onPointerDownOutside: (event: PointerDownOutsideEvent) => {
    emits('pointerDownOutside', event)
    forwarded.value.onPointerDownOutside?.(event)
  },
  onRequestDismiss: (event: RequestDismissEvent) => {
    emits('requestDismiss', event)
    forwarded.value.onRequestDismiss?.(event)
  },
}
const propsEx = computed<UseDialogProps>(() => {
  return {
    ...forwarded.value,
    onOpenChange: dialogInterceptContext.onOpenChange,
    onEscapeKeyDown: dialogInterceptContext.onEscapeKeyDown,
    onFocusOutside: dialogInterceptContext.onFocusOutside,
    onInteractOutside: dialogInterceptContext.onInteractOutside,
    onPointerDownOutside: dialogInterceptContext.onPointerDownOutside,
    onRequestDismiss: dialogInterceptContext.onRequestDismiss,
  }
})
const dialog = useDialog(propsEx)

const theme = useTheme({ unstyled })

defineExpose({
  open: dialog.value.open,
  setOpen: (open: boolean, from?: DialogTriggerFrom) => {
    triggerFrom.value = from ?? undefined
    dialog.value.setOpen(open)
  },
})
</script>

<template>
  <Dialog.RootProvider :value="dialog">
    <DialogInterceptProvider :value="dialogInterceptContext">
      <ThemeProvider :value="theme">
        <slot />
      </ThemeProvider>
    </DialogInterceptProvider>
  </Dialog.RootProvider>
</template>
