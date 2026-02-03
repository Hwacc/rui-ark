import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import DotExample from './examples/dot.vue'
import DotExampleRaw from './examples/dot.vue?raw'
import SecondaryExample from './examples/secondary.vue'
import SecondaryExampleRaw from './examples/secondary.vue?raw'

const meta: Meta = {
  title: 'Components/Badge',
}

export default meta

export const Basic = {
  parameters: {
    docs: {
      source: {
        code: BasicExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Secondary = {
  parameters: {
    docs: {
      source: {
        code: SecondaryExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: SecondaryExample },
    template: '<Component />',
  }),
}

export const Dot = {
  parameters: {
    docs: {
      source: {
        code: DotExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: DotExample },
    template: '<Component />',
  }),
}
