import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import CheckboxExample from './examples/checkbox.vue'
import EventsExample from './examples/events.vue'
import SelectionModesExample from './examples/selection-modes.vue'

const meta: Meta = {
  title: 'Components/Tree',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const SelectionModes = {
  render: () => ({
    components: { Component: SelectionModesExample },
    template: '<Component />',
  }),
}

export const Checkbox = {
  render: () => ({
    components: { Component: CheckboxExample },
    template: '<Component />',
  }),
}

export const Events = {
  render: () => ({
    components: { Component: EventsExample },
    template: '<Component />',
  }),
}
