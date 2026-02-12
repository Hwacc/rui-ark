import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import { defineConfig } from '@rslib/core'
import { pluginUnpluginVue } from 'rsbuild-plugin-unplugin-vue'

export default defineConfig({
  lib: [
    {
      format: 'esm',
      bundle: false,
      dts: true,
    },
  ],
  source: {
    entry: {
      index: [
        './src/index.ts',
        './src/components/**',
        './src/composables/**',
        './src/providers/**',
        './src/utils/**',
        '!./src/**/examples/**',
        '!./src/**/*.stories.ts',
      ],
    },
  },
  output: {
    target: 'web',
    externals: {
      '@rui-ark/shared': '@rui-ark/shared',
      '@rui-ark/themes': '@rui-ark/themes',
    },
  },
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginVueJsx(),
    pluginUnpluginVue(),
  ],
})
