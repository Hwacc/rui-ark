import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { ThemeProps } from '../providers/theme/theme-props'
import { omitBy } from 'es-toolkit'
import { isNil, shuffle } from 'es-toolkit/compat'
import { computed, toValue } from 'vue'
import { injectThemeContext } from '../providers/theme/theme-props'
import { useConfig } from './useConfig'

export function useTheme(): ComputedRef<ThemeProps>
export function useTheme<T = ThemeProps>(
  props?: MaybeRefOrGetter<Partial<T> | undefined>,
): ComputedRef<ThemeProps>
export function useTheme<T>(props?: MaybeRefOrGetter<Partial<T> | undefined>): ComputedRef<T> {
  const configTheme = useConfig('theme')
  const contextTheme = injectThemeContext(computed(() => ({})))
  const propsTheme = computed(() => toValue(props) ?? {})
  const clean = (obj: ComputedRef<ThemeProps | undefined>) => {
    return omitBy(obj.value ?? {}, value => isNil(value))
  }
  return computed(() => {
    return Object.assign(
      {
        skin: 'razer',
        surface: 'dark',
        size: 'base',
        unstyled: false,
        bordered: true,
      },
      clean(configTheme),
      clean(contextTheme),
      clean(propsTheme),
    ) as unknown as T
  })
}

export function useCustomTheme<T>(props?: MaybeRefOrGetter<T | undefined>): ComputedRef<T> {
  return useTheme<T>(props ?? {}) as ComputedRef<T>
}
