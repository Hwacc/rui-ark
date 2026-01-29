<script setup lang="ts">
import { ref } from 'vue'
import { Editable, EditableInput, EditablePreview } from '../index'

const value = ref('Size demo')
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Editable v-model="value" :theme="{ size: 'sm' }" placeholder="Small">
      <EditableInput clearable />
      <EditablePreview />
    </Editable>

    <Editable v-model="value" :theme="{ size: 'base' }" placeholder="Base">
      <EditableInput clearable />
      <EditablePreview />
    </Editable>

    <Editable v-model="value" :theme="{ size: 'lg' }" placeholder="Large">
      <EditableInput clearable />
      <EditablePreview />
    </Editable>
  </div>
</template>
