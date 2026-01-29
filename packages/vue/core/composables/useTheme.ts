import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { ThemeProps } from '../providers/theme/theme-props'
import { omitBy } from 'es-toolkit'
import { isNil } from 'es-toolkit/compat'
import { computed, toValue } from 'vue'
import { injectThemeContext } from '../providers/theme/theme-props'
import { useConfig } from './useConfig'

export function useTheme(): ComputedRef<ThemeProps['theme']>
export function useTheme<T = ThemeProps['theme']>(
  props?: MaybeRefOrGetter<Partial<T>>,
): ComputedRef<ThemeProps['theme']>
export function useTheme<T>(props?: MaybeRefOrGetter<Partial<T>>): ComputedRef<T> {
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
        mode: 'dark',
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

export function useCustomTheme<T>(props?: MaybeRefOrGetter<T>): ComputedRef<T> {
  return useTheme<T>(props) as ComputedRef<T>
}
