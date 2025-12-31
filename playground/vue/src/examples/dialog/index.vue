<script setup lang="ts">
import { Button } from '@rui-ark/vue-core/components/button'
import {
  Dialog,
  DialogCloseTrigger,
  DialogContent,
  DialogTrigger,
} from '@rui-ark/vue-core/components/dialog'

function handleOpenChange(details: any) {
  console.log('open change', details)
}

function handleEscapeKeyDown(event: KeyboardEvent) {
  console.log('escape key down', event)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Dialog
      @open-change="handleOpenChange"
      @escape-key-down="handleEscapeKeyDown"
    >
      <DialogTrigger as-child>
        <Button class="w-fit">
          Open Dialog
        </Button>
      </DialogTrigger>
      <DialogContent>
        Dialog Content
        <DialogCloseTrigger as-child>
          <Button class="w-fit">
            Close Dialog
          </Button>
        </DialogCloseTrigger>
      </DialogContent>
    </Dialog>
  </div>
</template>
