import type { Ref } from 'vue'
import { createContext } from '@ark-ui/vue'

interface FloatingPanelAppearanceContext {
  opacity: Ref<number>
  pinned: Ref<boolean>
  setOpacity: (opacity: number) => void
  setPinned: (pinned: boolean) => void
}
const [provideFloatingPanelAppearanceContext, injectFloatingPanelAppearanceContext]
  = createContext<FloatingPanelAppearanceContext>('FloatingPanelAppearanceContext')

export { injectFloatingPanelAppearanceContext, provideFloatingPanelAppearanceContext }
