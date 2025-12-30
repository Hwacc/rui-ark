<script setup lang="ts">
import type { RUIConfigContext } from './rui-config-context'
import { addAPIProvider, addCollection, addIcon } from '@iconify/vue'
import { computed } from 'vue'
import { ThemeProvider } from '../theme'
import { provideRUIConfigContext } from './rui-config-context'

const props = withDefaults(
  defineProps<{
    theme?: RUIConfigContext['theme']
    tooltip?: RUIConfigContext['tooltip']
    iconify?: RUIConfigContext['iconify']
  }>(),
  {
    theme: () => ({
      mode: 'dark',
      size: 'base',
      unstyled: false,
      bordered: true,
    }),
    tooltip: () => ({
      openDelay: 0,
      closeDelay: 0,
      lazyMount: false,
      unmountOnExit: false,
    }),
    iconify: () => ({
      addIcons: [],
      addCollections: [],
      addAPIProviders: [],
    }),
  },
)

props.iconify?.addIcons?.forEach(([icon, iconifyIcon]) => {
  addIcon(icon, iconifyIcon)
})
props.iconify?.addCollections?.forEach(([collection, provider]) => {
  addCollection(collection, provider)
})
props.iconify?.addAPIProviders?.forEach(([provider, config]) => {
  addAPIProvider(provider, config)
})

provideRUIConfigContext(computed(() => props))
</script>

<template>
  <ThemeProvider :value="props.theme">
    <slot />
  </ThemeProvider>
</template>
