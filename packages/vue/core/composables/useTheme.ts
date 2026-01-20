import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { ThemeProps } from '../providers/theme/theme-props'
import { merge } from 'lodash-es'
import { computed, toValue } from 'vue'
import { injectThemeContext } from '../providers/theme/theme-props'
import { useConfig } from './useConfig'

export function useTheme<T = ThemeProps>(props?: MaybeRefOrGetter<T>): ComputedRef<T> {
  const configTheme = useConfig('theme')
  const contextTheme = injectThemeContext(computed(() => ({})))
  const propsTheme = computed(() => toValue(props) ?? {})

  return computed(() => {
    const cleaned: Partial<ThemeProps> = {}
    for (const [k, v] of Object.entries(propsTheme.value))
      cleaned[k as keyof ThemeProps] = (v === false ? undefined : v) as any

    return merge(
      {},
      { skin: undefined, size: 'base', unstyled: false, bordered: true },
      configTheme.value ?? {},
      contextTheme.value ?? {},
      cleaned,
    )
  })
}
