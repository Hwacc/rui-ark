<script setup lang="ts">
import { Toast, Toaster } from '@rui-ark/vue-core/components/toast'
import { RUIConfig } from '@rui-ark/vue-core/providers/config'
import BadgeExample from './examples/badge/index.vue'
import ButtonExample from './examples/buttons/index.vue'
import CheckboxExample from './examples/checkbox/index.vue'
import CollapsiableExample from './examples/collapsiable/index.vue'
import DialogExample from './examples/dialog/index.vue'
import EditableExample from './examples/editable/index.vue'
import InputExample from './examples/input/index.vue'
import MenuExample from './examples/menu/index.vue'
import SelectExample from './examples/select/index.vue'
import SwitchExample from './examples/switch/index.vue'
import ToastExample from './examples/toast/index.vue'
import TooltipExample from './examples/tooltip/index.vue'
</script>

<template>
  <RUIConfig
    :theme="{
      size: 'base',
      unstyled: false,
      bordered: true,
    }"
  >
    <div class="content p-4 space-y-4">
      <ButtonExample />
      <BadgeExample />
      <CheckboxExample />
      <CollapsiableExample />
      <InputExample />
      <EditableExample />
      <TooltipExample />
      <DialogExample />
      <SwitchExample />
      <MenuExample />
      <SelectExample />
      <ToastExample />
    </div>

    <template #toaster>
      <Toaster v-slot="{ toast }" placement="top-end" overlap>
        <Toast :options="toast" />
      </Toaster>
      <Toaster v-slot="{ toast }" placement="bottom-end" overlap>
        <Toast :options="toast" />
      </Toaster>
    </template>
  </RUIConfig>
</template>
