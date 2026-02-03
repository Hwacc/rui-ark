import type { App, Directive, Plugin } from 'vue'
import type { VueLazyloadOptionsEx } from './types'
import LazyComponent from 'vue-lazyload/src/lazy-component'
import LazyContainer from 'vue-lazyload/src/lazy-container'
import LazyImage from 'vue-lazyload/src/lazy-image'
import LazyEx from './lazy'

const plugin: Plugin<[options?: VueLazyloadOptionsEx]> = {
  /*
   * install function
   * @param  {Vue} Vue
   * @param  {object} options lazyload options
   */
  install(app: App, options: VueLazyloadOptionsEx = {}) {
    const lazy = new LazyEx(options)
    const lazyContainer = new LazyContainer(lazy)

    const vueVersion = Number(app.version.split('.')[0])
    if (vueVersion < 3)
      return new Error('Vue version at least 3.0')

    app.config.globalProperties.$Lazyload = lazy

    app.provide('Lazyload', lazy)

    if (options.lazyComponent) {
      app.component('lazy-component', LazyComponent(lazy))
    }

    if (options.lazyImage) {
      app.component('lazy-image', LazyImage(lazy))
    }

    app.directive('lazy', {
      beforeMount: lazy.add.bind(lazy),
      beforeUpdate: lazy.update.bind(lazy),
      updated: lazy.lazyLoadHandler.bind(lazy),
      unmounted: lazy.remove.bind(lazy),
    })
    app.directive('lazy-container', {
      beforeMount: lazyContainer.bind.bind(lazyContainer),
      updated: lazyContainer.update.bind(lazyContainer),
      unmounted: lazyContainer.unbind.bind(lazyContainer),
    })
  },
}
export { plugin }

const dirLazy = new LazyEx({})
export const vLazy: Directive = {
  beforeMount: dirLazy.add.bind(dirLazy),
  beforeUpdate: dirLazy.update.bind(dirLazy),
  updated: dirLazy.lazyLoadHandler.bind(dirLazy),
  unmounted: dirLazy.remove.bind(dirLazy),
}
