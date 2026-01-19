<script lang="ts">
export interface DialogFooterProps extends ThemeProps {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    cancel?: HTMLAttributes['class']
    ok?: HTMLAttributes['class']
  }
  widget?: {
    cancel?: ComponentProps<typeof Button> & { text?: string }
    ok?: ComponentProps<typeof Button> & { text?: string }
  }
}
</script>

<script setup lang="ts">
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ark } from '@ark-ui/vue/factory'
import { tvDialog } from '@rui-ark/themes/crafts/dialog'
import { cn } from '@rui-ark/themes/utils/cn'
import { Button } from '@rui-ark/vue-core/components/button'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { useId } from 'vue'
import { DialogCloseTrigger, TriggerFrom } from '.'

const {
  class: propsClass,
  unstyled,
  size,
  ui,
  widget,
} = defineProps<DialogFooterProps>()
const emits = defineEmits<{
  ok: [event: MouseEvent]
  cancel: [event: MouseEvent]
}>()
const id = useId()
const theme = useTheme(() => ({ size, unstyled }))
const { footer } = tvDialog()
</script>

<template>
  <ark.div
    :id="`dialog:${id}:footer`"
    data-scope="dialog"
    data-part="footer"
    :class="footer({ class: [ui?.root, propsClass], ...theme })"
  >
    <slot>
      <DialogCloseTrigger as-child :from="TriggerFrom.CANCEL_BUTTON">
        <Button
          variant="text"
          v-bind="widget?.cancel"
          :class="cn('min-w-22.5 uppercase', ui?.cancel)"
          @click="emits('cancel', $event)"
        >
          {{ widget?.cancel?.text ?? 'Cancel' }}
        </Button>
      </DialogCloseTrigger>
      <DialogCloseTrigger as-child :from="TriggerFrom.OK_BUTTON">
        <Button
          v-bind="widget?.ok"
          :class="cn('min-w-22.5 uppercase', ui?.ok)"
          @click="emits('ok', $event)"
        >
          {{ widget?.ok?.text ?? 'OK' }}
        </Button>
      </DialogCloseTrigger>
    </slot>
  </ark.div>
</template>
