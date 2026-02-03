import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ReadMoreExample from './examples/read-more.vue'
import ReadMoreExampleRaw from './examples/read-more.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import StatesExample from './examples/states.vue'
import StatesExampleRaw from './examples/states.vue?raw'
import TriggerAndSlotsExample from './examples/trigger-and-slots.vue'
import TriggerAndSlotsExampleRaw from './examples/trigger-and-slots.vue?raw'

const meta: Meta = {
  title: 'Components/Collapsible',
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

export const States = {
  parameters: {
    docs: {
      source: {
        code: StatesExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: StatesExample },
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

export const TriggerAndSlots = {
  parameters: {
    docs: {
      source: {
        code: TriggerAndSlotsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: TriggerAndSlotsExample },
    template: '<Component />',
  }),
}

export const ReadMore = {
  parameters: {
    docs: {
      source: {
        code: ReadMoreExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ReadMoreExample },
    template: '<Component />',
  }),
}
