import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { RUIConfigContext } from '../providers/config/rui-config-context'
import { defaults } from 'lodash-es'
import { computed, unref } from 'vue'
import { injectRUIConfigContext } from '../providers/config/rui-config-context'

export function useConfig<T extends keyof RUIConfigContext>(
  scope: T,
  props?: MaybeRefOrGetter<RUIConfigContext[T]>,
): ComputedRef<RUIConfigContext[T]> {
  const ruiConfig = injectRUIConfigContext(computed(() => ({})))
  return computed(() => defaults(unref(props), ruiConfig.value[scope] ?? {}))
}
