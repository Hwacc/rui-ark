<script setup lang="ts">
import { useOverlay } from '@rui-ark/vue/composables/useOverlay'
import { Button } from '../../button'
import BasicDialog from './components/BasicDialog.vue'

const overlay = useOverlay()
const basicDialog = overlay.create(BasicDialog)
function handleOpenDialog() {
  basicDialog.open({
    title: 'Overlay Dialog',
    content: 'Overlay Dialog Content',
  })
}

function handleOpenDestroyOnCloseDialog() {
  const destroyOnCloseDialog = overlay.create(BasicDialog, {
    destroyOnClose: true,
  })
  destroyOnCloseDialog.open({
    title: 'Overlay Dialog',
    content: 'Overlay Dialog Destroy On Close',
  })
}
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <Button class="w-fit" @click="handleOpenDialog">
      Open Dialog
    </Button>
    <Button class="w-fit" @click="handleOpenDestroyOnCloseDialog">
      Open Destroy On Close Dialog
    </Button>
  </div>
</template>
