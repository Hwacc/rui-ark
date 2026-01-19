import type { MaybeRefOrGetter } from 'vue'
import type { ThemeProps } from '../providers/theme/theme-props'
import { merge, transform } from 'lodash-es'
import { computed, toValue } from 'vue'
import { injectThemeContext } from '../providers/theme/theme-props'
import { useConfig } from './useConfig'

export function useTheme(props?: MaybeRefOrGetter<ThemeProps>) {
  const configTheme = useConfig('theme')
  const contextTheme = injectThemeContext(computed(() => ({})))
  const propsTheme = computed(() => toValue(props) ?? {})

  return computed<ThemeProps>(() => {
    return merge(
      {
        skin: undefined,
        size: 'base',
        unstyled: false,
        bordered: true,
      },
      configTheme?.value ?? {},
      contextTheme?.value ?? {},
      transform(
        propsTheme.value,
        (result: any, value: any, key: string) => {
          result[key] = value === false ? undefined : value
          return true
        },
        {},
      ),
    )
  })
}
