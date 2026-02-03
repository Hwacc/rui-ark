import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import VariantsExample from './examples/variants.vue'
import VariantsExampleRaw from './examples/variants.vue?raw'

const meta: Meta = {
  title: 'Components/Button',
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

export const Variants = {
  parameters: {
    docs: {
      source: {
        code: VariantsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: VariantsExample },
    template: '<Component />',
  }),
}

export const Sizes = {
  parameters: {
    docs: {
      source: {
        code: SizesExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: SizesExample },
    template: '<Component />',
  }),
}
