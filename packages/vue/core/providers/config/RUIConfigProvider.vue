<script setup lang="ts">
import type { ToasterWrap } from '@rui-ark/vue-core/components/toast'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { RUIConfigContext } from './rui-config-context'
import { addAPIProvider, addCollection, addIcon } from '@iconify/vue'
import { ToasterManager } from '@rui-ark/vue-core/components/toast'
import { computed, ref } from 'vue'
import { ThemeProvider } from '../theme'
import { provideRUIConfigContext } from './rui-config-context'

const props = withDefaults(
  defineProps<{
    theme?: RUIConfigContext['theme']
    tooltip?: RUIConfigContext['tooltip']
    dialog?: RUIConfigContext['dialog']
    hoverCard?: RUIConfigContext['hover-card']
    popover?: RUIConfigContext['popover']
    menu?: RUIConfigContext['menu']
    iconify?: RUIConfigContext['iconify']
    toasterManager?: ComponentProps<typeof ToasterManager>
  }>(),
  {
    theme: () => ({
      skin: undefined,
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
    hoverCard: () => ({
      openDelay: 0,
      closeDelay: 300,
      lazyMount: true,
      unmountOnExit: true,
    }),
    dialog: () => ({
      lazyMount: true,
      unmountOnExit: true,
    }),
    popover: () => ({
      lazyMount: true,
      unmountOnExit: true,
    }),
    menu: () => ({
      lazyMount: true,
      unmountOnExit: true,
    }),
    select: () => ({
      lazyMount: false,
      unmountOnExit: false,
    }),
    iconify: () => ({
      addIcons: [],
      addCollections: [],
      addAPIProviders: [],
    }),
    toasterManager: () => ({
      disableDefaultToaster: false,
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

const toasterManager = ref<{ toasters: ToasterWrap[] }>({
  toasters: [],
})
provideRUIConfigContext(
  computed(() => ({ ...props, toasters: toasterManager.value })),
)
</script>

<template>
  <ThemeProvider :value="props.theme">
    <slot />
    <ToasterManager ref="toasterManager" v-bind="props.toasterManager">
      <slot name="toaster" />
    </ToasterManager>
  </ThemeProvider>
</template>
