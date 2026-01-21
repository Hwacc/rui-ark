<script lang="ts">
export interface ToasterManagerProps {
  disableDefaultToaster?: boolean
  defaultToasterProps?: ToasterProps
}
</script>

<script setup lang="ts">
import type { VNode } from 'vue'
import type { ToasterProps, ToasterWrap } from '.'
import { isNil } from 'es-toolkit'
import { isEmpty } from 'es-toolkit/compat'
import { computed, ref, useSlots } from 'vue'
import { DEFAULT_TOASTER_ID, Toast, Toaster } from '.'

const { disableDefaultToaster = false, defaultToasterProps }
  = defineProps<ToasterManagerProps>()

const slots = useSlots()
let defaultSlots = slots.default?.()
// if default-slot is a slot with children
if (
  !isEmpty(defaultSlots)
  && isNil(defaultSlots?.[0].component)
  && !isEmpty(defaultSlots?.[0].children)
) {
  defaultSlots = defaultSlots?.[0].children as VNode[]
}
else {
  defaultSlots = []
}

const slotsToasters = ref<ToasterWrap[]>([])
const defaultToaster = ref<ToasterWrap>()

defineExpose({
  toasters: computed(() =>
    [...slotsToasters.value, defaultToaster.value].filter(r => r && r.toaster),
  ),
})
</script>

<template>
  <template v-if="defaultSlots?.length">
    <component
      :is="slot"
      v-for="(slot, index) in defaultSlots"
      :key="slot.key"
      :ref="(el: ToasterWrap) => { slotsToasters[index] = el }"
    />
  </template>
  <Toaster
    v-if="!disableDefaultToaster"
    v-slot="{ toast }"
    ref="defaultToaster"
    placement="bottom-end"
    overlap
    v-bind="defaultToasterProps"
    :toaster-id="DEFAULT_TOASTER_ID"
  >
    <Toast :options="toast" />
  </Toaster>
</template>
