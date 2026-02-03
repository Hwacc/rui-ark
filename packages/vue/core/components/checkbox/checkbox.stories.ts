import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import GroupExample from './examples/group.vue'
import GroupExampleRaw from './examples/group.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import SlotsAndUiExample from './examples/slots-and-ui.vue'
import SlotsAndUiExampleRaw from './examples/slots-and-ui.vue?raw'
import StatesExample from './examples/states.vue'
import StatesExampleRaw from './examples/states.vue?raw'

const meta: Meta = {
  title: 'Components/Checkbox',
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

export const Group = {
  parameters: {
    docs: {
      source: {
        code: GroupExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: GroupExample },
    template: '<Component />',
  }),
}

export const SlotsAndUi = {
  parameters: {
    docs: {
      source: {
        code: SlotsAndUiExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: SlotsAndUiExample },
    template: '<Component />',
  }),
}
