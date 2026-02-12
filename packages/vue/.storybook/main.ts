import type { StorybookConfig } from 'storybook-vue3-rsbuild'
import { mergeRsbuildConfig } from '@rsbuild/core'

const config: StorybookConfig = {
  stories: [
    '../core/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../addons/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-themes'],
  framework: {
    name: 'storybook-vue3-rsbuild',
    options: {},
  },

  rsbuildFinal(baseConfig) {
    return mergeRsbuildConfig(baseConfig, {
      tools: {
        bundlerChain(chain, { CHAIN_ID }) {
          chain.module.rule(CHAIN_ID.RULE.VUE).resourceQuery({ not: /raw$/ })
          chain.module.rule('raw').resourceQuery(/raw$/).type('asset/source')
          chain.module.rules.values().forEach(
            (rule) => {
              const uses = rule.uses.values()
              const hasVueDocgen = uses.some(use =>
                String(use.get('loader') ?? '').includes('vue-docgen-loader'),
              )
              if (hasVueDocgen) {
                rule.resourceQuery({ not: /raw$/ })
              }
            },
          )
        },
      },
    })
  },
}

export default config
