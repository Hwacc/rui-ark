<script setup lang="ts">
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue/factory'
import { tvDialog } from '@rui-ark/themes/crafts/dialog'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { useId } from 'vue'

const {
  class: propsClass,
  size,
  unstyled,
} = defineProps<{
  class?: HTMLAttributes['class']
} & ThemeProps>()

const id = useId()
const theme = useTheme(() => ({ size, unstyled }))
const { body } = tvDialog()
</script>

<template>
  <ark.div
    :id="`dialog:${id}:body`"
    data-scope="dialog"
    data-part="body"
    :class="body({ class: propsClass, ...theme })"
  >
    <slot />
  </ark.div>
</template>
