import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import AllowHalfExample from './examples/allow-half.vue'
import EventsExample from './examples/events.vue'
import ProgrammaticExample from './examples/programmatic.vue'
import SizesExample from './examples/sizes.vue'
import StatesExample from './examples/states.vue'

const meta: Meta = {
  title: 'Components/RatingGroup',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Sizes = {
  render: () => ({
    components: { Component: SizesExample },
    template: '<Component />',
  }),
}

export const States = {
  render: () => ({
    components: { Component: StatesExample },
    template: '<Component />',
  }),
}

export const AllowHalf = {
  render: () => ({
    components: { Component: AllowHalfExample },
    template: '<Component />',
  }),
}

export const Events = {
  render: () => ({
    components: { Component: EventsExample },
    template: '<Component />',
  }),
}

export const Programmatic = {
  render: () => ({
    components: { Component: ProgrammaticExample },
    template: '<Component />',
  }),
}

