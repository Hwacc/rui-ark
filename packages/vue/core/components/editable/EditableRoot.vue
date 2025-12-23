<script lang="ts">
import type { Ref } from 'vue'
import { createContext } from '@ark-ui/vue'

export interface EditableRootProps extends ArkEditableRootProps {
  class?: string
  unstyled?: boolean
  clearable?: boolean
}

const [provideEditableContext, injectEditableContext] = createContext<{
  clearable: Ref<boolean>
}>('R-EditableRoot')
export { injectEditableContext }
</script>

<script setup lang="ts">
import type {
  EditableRootProps as ArkEditableRootProps,
  EditableRootEmits,
} from '@ark-ui/vue/editable'
import {
  EditableArea,
  EditableRootProvider,
  useEditable,
} from '@ark-ui/vue/editable'
import { tvEditable } from '@rui-ark/themes/crafts/editable'
import { computed } from 'vue'

const {
  class: propsClass,
  unstyled,
  edit = undefined,
  clearable = false,
  ...props
} = defineProps<EditableRootProps>()
const emits = defineEmits<EditableRootEmits>()

provideEditableContext({ clearable: computed(() => clearable) })
const editable = useEditable({ ...props, edit }, emits)

const { root } = tvEditable()
</script>

<template>
  <EditableRootProvider
    :value="editable"
    :class="root({ class: [propsClass], unstyled })"
  >
    <slot name="prefix" />
    <EditableArea>
      <slot />
    </EditableArea>
    <slot name="suffix" />
  </EditableRootProvider>
</template>
