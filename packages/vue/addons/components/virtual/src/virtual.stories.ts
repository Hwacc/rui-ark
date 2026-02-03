import type { Meta } from 'storybook-vue3-rsbuild'

import BasicGridExample from './examples/basic-grid.vue'
import BasicListExample from './examples/basic-list.vue'
import DynamicListExample from './examples/dynamic-list.vue'

const meta: Meta = {
  title: 'Addons/Components/Virtual',
}

export default meta

export const BasicList = {
  render: () => ({
    components: { Component: BasicListExample },
    template: '<Component />',
  }),
}

export const DynamicList = {
  render: () => ({
    components: { Component: DynamicListExample },
    template: '<Component />',
  }),
}

export const BasicGrid = {
  render: () => ({
    components: { Component: BasicGridExample },
    template: '<Component />',
  }),
}
