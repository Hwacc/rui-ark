import type { StorybookConfig } from 'storybook-vue3-rsbuild'

const config: StorybookConfig = {
  stories: ['../core/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../addons/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-themes'],
  framework: {
    name: 'storybook-vue3-rsbuild',
    options: {},
  },
}

export default config
