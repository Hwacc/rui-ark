<!--
  * OverlayProvider
  * @description Source codes from nuxt-ui OverlayProvider
  * @see https://github.com/nuxt/ui/blob/v3/src/runtime/components/OverlayProvider.vue
-->
<script setup lang="ts">
import type { Overlay } from '@rui-ark/vue-core/composables/useOverlay'
import { useOverlay } from '@rui-ark/vue-core/composables/useOverlay'
import { computed } from 'vue'

const { overlays, unmount, close } = useOverlay()

const mountedOverlays = computed(() => overlays.filter((overlay: Overlay) => overlay.isMounted))

function onExitComplete(id: symbol) {
  close(id)
  unmount(id)
}

function onClose(id: symbol) {
  close(id)
}
</script>

<template>
  <component
    :is="overlay.component"
    v-for="overlay in mountedOverlays"
    :key="overlay.id"
    v-model:open="overlay.isOpen"
    @open-change="({ open } : {open: boolean}) => { !open && onClose(overlay.id) }"
    @exit-complete="onExitComplete(overlay.id)"
  />
</template>
