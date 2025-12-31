<script lang="ts"></script>

<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { tvDialog } from '@rui-ark/themes/crafts/dialog'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { DialogBackdrop } from '.'

const theme = useTheme({})
const { positioner, content } = tvDialog()
</script>

<template>
  <Teleport to="body">
    <DialogBackdrop />
    <Dialog.Positioner :class="positioner({ ...theme })">
      <Dialog.Content :class="content({ ...theme })">
        <slot />
      </Dialog.Content>
    </Dialog.Positioner>
  </Teleport>
</template>
