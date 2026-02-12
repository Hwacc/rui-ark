import type { Preview } from 'storybook-vue3-rsbuild'
import { Toast, Toaster } from '@rui-ark/vue/components/toast'
import { RUIConfig } from '@rui-ark/vue/providers/config'
import { defineComponent, h } from 'vue'

import '@rui-ark/themes/razer/index.css'
import './style.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Utilities', 'Providers', 'Components'],
        method: 'alphabetical',
      },
    },
    layout: 'padded',
    actions: { disable: true },
    controls: { disable: true },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#222222' },
        light: { name: 'Light', value: '#eeeeee' },
      },
    },
    viewport: { disable: true },
    docs: {
      codePanel: true,
    },
  },

  initialGlobals: {
    backgrounds: { value: 'dark' },
  },

  decorators: [
    story =>
      defineComponent({
        name: 'RUIStory',
        setup() {
          return () =>
            h(
              RUIConfig,
              {},
              {
                default: () => h(story()),
                toaster: () => [
                  h(
                    Toaster,
                    { placement: 'top-end', overlap: true },
                    { default: ({ toast }) => h(Toast, { options: toast }) },
                  ),
                  h(
                    Toaster,
                    { placement: 'bottom-end', overlap: true },
                    { default: ({ toast }) => h(Toast, { options: toast }) },
                  ),
                ],
              },
            )
        },
      }),
  ],
}

export default preview
