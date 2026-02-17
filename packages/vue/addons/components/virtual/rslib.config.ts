import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import { defineConfig } from '@rslib/core'
import { pluginUnpluginVue } from 'rsbuild-plugin-unplugin-vue'

export default defineConfig({
  lib: [
    {
      format: 'esm',
      bundle: true,
      dts: true,
    },
  ],
  source: {
    entry: {
      index: [
        './src/index.ts',
      ],
    },
  },
  output: {
    target: 'web',
    externals: {
      '@rark-ui/vue-addons-shared': '@rark-ui/vue-addons-shared',
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
