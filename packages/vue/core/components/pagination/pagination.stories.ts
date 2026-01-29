import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import ControlledExample from './examples/controlled.vue'
import EventsExample from './examples/events.vue'
import LinkTypeExample from './examples/link-type.vue'
import MinimalExample from './examples/minimal.vue'
import SizesExample from './examples/sizes.vue'

const meta: Meta = {
  title: 'Components/Pagination',
}

export default meta

export const Basic = {
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Minimal = {
  render: () => ({
    components: { Component: MinimalExample },
    template: '<Component />',
  }),
}

export const Sizes = {
  render: () => ({
    components: { Component: SizesExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}

export const Events = {
  render: () => ({
    components: { Component: EventsExample },
    template: '<Component />',
  }),
}

export const LinkType = {
  render: () => ({
    components: { Component: LinkTypeExample },
    template: '<Component />',
  }),
}

