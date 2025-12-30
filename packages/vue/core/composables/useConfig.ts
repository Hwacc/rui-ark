import { computed } from 'vue'
import { injectRUIConfigContext } from '../providers/config/rui-config-context'

export function useConfig() {
  return injectRUIConfigContext(computed(() => ({})))
}
