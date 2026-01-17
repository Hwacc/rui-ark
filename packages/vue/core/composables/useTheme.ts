import type { MaybeRefOrGetter } from 'vue'
import type { ThemeProps } from '../providers/theme/theme-props'
import { merge, transform } from 'lodash-es'
import { computed, unref } from 'vue'
import { injectThemeContext } from '../providers/theme/theme-props'
import { useConfig } from './useConfig'

export function useTheme(props?: MaybeRefOrGetter<ThemeProps>) {
  const themeConfig = useConfig('theme')
  const contextTheme = injectThemeContext(computed(() => ({})))
  return computed<ThemeProps>(() => {
    return merge(
      {
        skin: undefined,
        size: 'base',
        unstyled: false,
        bordered: true,
      },
      themeConfig?.value ?? {},
      contextTheme?.value ?? {},
      transform(
        unref(props ?? {}),
        (result: any, value: any, key: string) => {
          result[key] = value === false ? undefined : value
          return true
        },
        {},
      ),
    )
  })
}
