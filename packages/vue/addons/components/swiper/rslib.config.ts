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
        './src/*',
        '!./src/examples/**',
        '!./src/swiper.stories.ts',
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
