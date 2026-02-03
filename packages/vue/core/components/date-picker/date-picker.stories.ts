import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import DisabledDateExample from './examples/disabled-date.vue'
import DisabledDateExampleRaw from './examples/disabled-date.vue?raw'
import EventsExample from './examples/events.vue'
import EventsExampleRaw from './examples/events.vue?raw'
import RangeExample from './examples/range.vue'
import RangeExampleRaw from './examples/range.vue?raw'
import ViewsExample from './examples/views.vue'
import ViewsExampleRaw from './examples/views.vue?raw'

const meta: Meta = {
  title: 'Components/DatePicker',
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

export const Views = {
  parameters: {
    docs: {
      source: {
        code: ViewsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ViewsExample },
    template: '<Component />',
  }),
}

export const Range = {
  parameters: {
    docs: {
      source: {
        code: RangeExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: RangeExample },
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

export const DisabledDate = {
  parameters: {
    docs: {
      source: {
        code: DisabledDateExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: DisabledDateExample },
    template: '<Component />',
  }),
}
