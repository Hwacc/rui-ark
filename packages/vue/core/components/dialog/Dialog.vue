<script lang="ts">
export type DialogOpenChangeDetails = OpenChangeDetails & {
  // the trigger that toggled the dialog
  from: DialogTriggerFrom
}
export interface DialogProps extends DialogRootProps, Theme {
  class?: HTMLAttributes['class']
}
type UseDialogPropsEx = UseDialogProps & {
  onOpenChange: (details: DialogOpenChangeDetails) => void
  onExitComplete: () => void
}
export interface DialogEmits extends DialogRootEmits {
  'update:open': [open: boolean]
  'openChange': [details: DialogOpenChangeDetails]
  'escapeKeyDown': [event: KeyboardEvent]
  'focusOutside': [event: FocusOutsideEvent]
  'interactOutside': [event: InteractOutsideEvent]
  'pointerDownOutside': [event: PointerDownOutsideEvent]
  'requestDismiss': [event: RequestDismissEvent]
  'exitComplete': []
}
</script>

<script setup lang="ts">
import type {
  DialogRootEmits,
  DialogRootProps,
  UseDialogProps,
  UseDialogReturn,
} from '@ark-ui/vue/dialog'
import type { Theme } from '@rui-ark/vue/providers/theme'
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
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { Dialog, useDialog } from '@ark-ui/vue/dialog'
import { useConfig } from '@rui-ark/vue/composables/useConfig'
import { useTheme } from '@rui-ark/vue/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue/providers/theme'
import { computed, nextTick, ref, watch } from 'vue'
import { TriggerFrom } from './dialog-intercept-context'
import DialogInterceptProvider from './DialogInterceptProvider.vue'

const {
  class: propsClass,
  theme: propsTheme,
  lazyMount = undefined,
  unmountOnExit = undefined,
  ...props
} = defineProps<DialogProps>()
const emits = defineEmits<DialogEmits>()
const dialogConfig = useConfig(
  'dialog',
  computed(() => ({ lazyMount, unmountOnExit })),
)
const forwarded = useForwardProps<DialogRootProps, UseDialogPropsEx>(props)

const triggerFrom = ref<DialogTriggerFrom>(undefined)
const dialogInterceptContext: DialogInterceptContext = { triggerFrom }
const dialog = useDialog(
  computed(() => ({
    ...forwarded.value,
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
  })),
)

const initialized = ref(false)
watch(
  () => [forwarded.value.open, forwarded.value.defaultOpen],
  async ([open, defaultOpen]) => {
    if (!initialized.value) {
      initialized.value = true
      await nextTick()
      if (typeof open === 'undefined') {
        dialog.value.setOpen(!!defaultOpen)
      }
      else {
        dialog.value.setOpen(!!open)
      }
      return
    }
    if (typeof open !== 'undefined') {
      await nextTick()
      dialog.value.setOpen(!!open)
    }
  },
  { immediate: true },
)

// theme
const theme = useTheme(() => propsTheme)

// expose
defineExpose({ $api: dialog as UseDialogReturn })
useForwardExpose()
</script>

<template>
  <Dialog.RootProvider
    :value="dialog"
    :lazy-mount="dialogConfig?.lazyMount ?? lazyMount"
    :unmount-on-exit="dialogConfig?.unmountOnExit ?? unmountOnExit"
    @exit-complete="
      () => {
        forwarded.onExitComplete?.()
        emits('exitComplete')
      }
    "
  >
    <DialogInterceptProvider :value="dialogInterceptContext">
      <ThemeProvider :value="theme">
        <slot />
      </ThemeProvider>
    </DialogInterceptProvider>
  </Dialog.RootProvider>
</template>
