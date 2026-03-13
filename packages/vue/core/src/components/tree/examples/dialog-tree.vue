<script setup lang="ts">
import { createTreeCollection } from '@ark-ui/vue/tree-view'
import { ref } from 'vue'
import { Button } from '../../button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../../dialog'
import { Tree, TreeCheckboxNode, TreeNode } from '../index'

type Node = {
  id: string
  name: string
  children?: Node[]
}

const rootNode: Node = {
  id: 'root',
  name: 'root',
  children: [
    {
      id: 'docs',
      name: 'Docs',
      children: [
        { id: 'getting-started', name: 'Getting Started' },
        { id: 'api', name: 'API' },
      ],
    },
    {
      id: 'examples',
      name: 'Examples',
      children: [
        { id: 'basic', name: 'Basic' },
        { id: 'advanced', name: 'Advanced' },
      ],
    },
    { id: 'changelog', name: 'Changelog' },
  ],
}

const collection = createTreeCollection<Node>({
  rootNode,
  nodeToValue: node => node.id,
  nodeToString: node => node.name,
  nodeToChildren: node => node.children ?? [],
  isNodeDisabled: () => false,
})

const expandedValue = ref<string[]>(['docs'])
const selectedValue = ref<string[]>(['getting-started'])

const expandedCheckbox = ref<string[]>(['docs'])
const checkedValue = ref<string[]>(['getting-started'])
</script>

<template>
  <div class="flex gap-2">
    <Dialog>
      <DialogTrigger as-child>
        <Button class="w-fit" variant="outline">
          单选 (TreeNode)
        </Button>
      </DialogTrigger>
      <DialogContent class="w-120">
        <DialogHeader> 选择目录（单选）</DialogHeader>
        <DialogBody class="max-h-60 overflow-y-auto">
          <div class="rounded-md border border-h33 p-3">
            <Tree
              v-model:expanded-value="expandedValue"
              v-model:selected-value="selectedValue"
              :collection="collection"
              selection-mode="single"
            >
              <TreeNode
                v-for="(node, index) in rootNode.children"
                :key="node.id"
                :node="node"
                :index-path="[index]"
              />
            </Tree>
          </div>
        </DialogBody>
        <DialogFooter />
      </DialogContent>
    </Dialog>

    <Dialog>
      <DialogTrigger as-child>
        <Button class="w-fit" variant="outline">
          多选 (TreeCheckboxNode)
        </Button>
      </DialogTrigger>
      <DialogContent class="w-120">
        <DialogHeader> 选择目录（多选）</DialogHeader>
        <DialogBody class="max-h-60 overflow-y-auto">
          <div class="rounded-md border border-h33 p-3">
            <Tree
              v-model:expanded-value="expandedCheckbox"
              v-model:checked-value="checkedValue"
              :collection="collection"
              selection-mode="multiple"
            >
              <TreeCheckboxNode
                v-for="(node, index) in rootNode.children"
                :key="node.id"
                :node="node"
                :index-path="[index]"
              />
            </Tree>
          </div>
        </DialogBody>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  </div>
</template>
