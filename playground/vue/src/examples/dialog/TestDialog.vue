<script setup lang="ts">
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@rui-ark/vue-core/components/dialog'
</script>

<template>
  <Dialog lazy-mount unmount-on-exit>
    <DialogContent>
      <DialogHeader> Overlay Dialog </DialogHeader>
      <DialogBody> Overlay Dialog Body </DialogBody>
      <DialogFooter />
    </DialogContent>
  </Dialog>
</template>
