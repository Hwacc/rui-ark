import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import CheckboxExample from './examples/checkbox.vue'
import CheckboxExampleRaw from './examples/checkbox.vue?raw'
import EventsExample from './examples/events.vue'
import EventsExampleRaw from './examples/events.vue?raw'
import SelectionModesExample from './examples/selection-modes.vue'
import SelectionModesExampleRaw from './examples/selection-modes.vue?raw'

const meta: Meta = {
  title: 'Components/Tree',
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

export const SelectionModes = {
  parameters: {
    docs: {
      source: {
        code: SelectionModesExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: SelectionModesExample },
    template: '<Component />',
  }),
}

export const Checkbox = {
  parameters: {
    docs: {
      source: {
        code: CheckboxExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: CheckboxExample },
    template: '<Component />',
  }),
}

export const Events = {
  parameters: {
    docs: {
      source: {
        code: EventsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: EventsExample },
    template: '<Component />',
  }),
}
