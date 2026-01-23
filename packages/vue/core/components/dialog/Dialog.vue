<script lang="ts">
export type DialogOpenChangeDetails = OpenChangeDetails & {
  // the trigger that toggled the dialog
  from: DialogTriggerFrom
}
export interface DialogProps extends DialogRootProps, ThemeProps {
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
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
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
import { useConfig } from '@rui-ark/vue-core/composables/useConfig'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { computed, ref, watch } from 'vue'
import { TriggerFrom } from './dialog-intercept-context'
import DialogInterceptProvider from './DialogInterceptProvider.vue'

const {
  class: propsClass,
  unstyled,
  size,
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
console.log('forwarded', lazyMount, unmountOnExit, forwarded.value)

const triggerFrom = ref<DialogTriggerFrom>(undefined)
const dialogInterceptContext: DialogInterceptContext = { triggerFrom }
const dialog = useDialog(
  computed(() => {
    console.log('dialog computed', forwarded.value)
    return {
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
    }
  }),
)
watch(
  () => forwarded.value.open,
  (val) => {
    dialog.value.setOpen(val ?? false)
  },
)

// theme
const theme = useTheme(() => ({ size, unstyled }))

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
        console.log('exit complete', forwarded)
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
