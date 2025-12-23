<script setup lang="ts">
import {
  EditableInput,
  EditablePreview,
  EditableRoot,
} from '@rui-ark/vue-core/components/editable'
</script>

<template>
  <div class="flex gap-4">
    <EditableRoot
      placeholder="Edit me"
      clearable
      @interact-outside="
        () => {
          console.log('interact-outside')
        }
      "
    >
      <EditableInput />
      <EditablePreview />
    </EditableRoot>
  </div>
</template>
