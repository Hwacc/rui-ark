import type { Virtualizer } from '@tanstack/vue-virtual'
import type { Ref, ShallowRef } from 'vue'
import { defineComponent, ref } from 'vue'
import { LOADING_STATE } from '.'
import { createContext } from '../../../context/createContext'

type VirtualContext = {
  parentEl?: Ref<Element | null | undefined>
  // virtualizer for list
  virtualizer?: ShallowRef<Virtualizer<Element, Element>>
  // row virtualizer for grid
  rowVirtualizer?: ShallowRef<Virtualizer<Element, Element>>
  // column virtualizer for grid
  columnVirtualizer?: ShallowRef<Virtualizer<Element, Element>>
  enableInfinite: Ref<boolean>
  infiniteState: Ref<LOADING_STATE>
}
const [injectVirtualContext, provideVirtualContext]
  = createContext<VirtualContext>('VirtualContext')

export { injectVirtualContext }

export default defineComponent({
  setup(_, { slots }) {
    const enableInfinite = ref(false)
    const infiniteState = ref<LOADING_STATE>(LOADING_STATE.IDLE)
    provideVirtualContext({
      enableInfinite,
      infiniteState,
    })
    return () => slots.default?.()
  },
})
