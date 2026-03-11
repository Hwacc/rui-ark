<script setup lang="ts" generic="T = TreeNode">
import type { TreeNode } from '@ark-ui/vue/tree-view'
import type { TreeProps, TreeViewRootEmits } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { TreeView, useTreeView } from '@ark-ui/vue/tree-view'
import { useTheme } from '@rark-ui/vue/composables/useTheme'
import { ThemeProvider } from '@rark-ui/vue/providers/theme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<TreeProps<T>>()
const emits = defineEmits<TreeViewRootEmits<T>>()
const forwarded = useForwardProps<TreeProps<T>, any>(props)
const treeView = useTreeView<T>(forwarded, emits)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvTree())
</script>

<template>
  <TreeView.RootProvider
    :value="treeView"
    :class="crafts.root({ class: [ui?.root, propsClass], ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot name="prefix" />
      <TreeView.Tree :class="crafts.tree({ class: ui?.tree, ...theme })">
        <slot />
      </TreeView.Tree>
      <slot name="suffix" />
    </ThemeProvider>
  </TreeView.RootProvider>
</template>
