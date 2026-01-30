import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import EventsExample from './examples/events.vue'
import RangeExample from './examples/range.vue'
import ViewsExample from './examples/views.vue'

const meta: Meta = {
  title: 'Components/DatePicker',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Views = {
  render: () => ({
    components: { Component: ViewsExample },
    template: '<Component />',
  }),
}

export const Range = {
  render: () => ({
    components: { Component: RangeExample },
    template: '<Component />',
  }),
}

export const Events = {
  render: () => ({
    components: { Component: EventsExample },
    template: '<Component />',
  }),
}

