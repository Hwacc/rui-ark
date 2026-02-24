import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { Crafts, ThemeProps } from '../providers/theme/theme-props'
import { crafts, tv } from '@rark-ui/themes/default'
import { omitBy } from 'es-toolkit'
import { isNil, keysIn } from 'es-toolkit/compat'
import { computed, getCurrentInstance, toValue } from 'vue'
import { injectThemeContext } from '../providers/theme/theme-props'
import { useConfig } from './useConfig'

type UseThemeReturn = ComputedRef<Omit<ThemeProps, 'crafts'> & { crafts: Crafts }>

const CRAFTS_KEYS = keysIn(crafts)

function pickDefined<T extends Record<string, any>>(obj?: T) {
  if (!obj)
    return {} as Partial<T>
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>
}

function clean(obj: ComputedRef<ThemeProps | undefined>) {
  return omitBy(obj.value ?? {}, value => isNil(value))
}

export function useTheme(): UseThemeReturn
export function useTheme<T = ThemeProps>(
  props?: MaybeRefOrGetter<Partial<T> | undefined>,
): UseThemeReturn
export function useTheme<T>(props?: MaybeRefOrGetter<Partial<T> | undefined>): UseThemeReturn {
  const configTheme = useConfig('theme')
  const contextTheme = injectThemeContext(computed(() => ({})))
  const propsTheme = computed(() => toValue(props) ?? {})

  const vm = getCurrentInstance()
  const compName = vm?.type.__name

  return computed(() => {
    const { crafts: configCrafts, ...configRest } = clean(configTheme) as any
    const { crafts: contextCrafts, ...contextRest } = clean(contextTheme) as any
    const { crafts: propsCrafts, ...propsRest } = clean(propsTheme) as any

    const themeRest = Object.assign(
      {
        skin: 'razer',
        surface: 'dark',
        size: 'base',
        unstyled: false,
        bordered: true,
      },
      configRest,
      contextRest,
      propsRest,
    )

    const mergedCrafts: Crafts = Object.assign(
      {},
      crafts,
      pickDefined<Crafts>(configCrafts as Crafts | undefined),
      pickDefined<Crafts>(contextCrafts as Crafts | undefined),
      propsCrafts
        ? typeof propsCrafts === 'function'
          ? propsCrafts()
          : CRAFTS_KEYS.includes(`tv${compName}`)
            ? {
                [`tv${compName}`]: tv({
                  extend: crafts[`tv${compName}` as keyof typeof crafts],
                  ...propsCrafts,
                }),
              }
            : {}
        : {},
    ) as Crafts

    return {
      ...themeRest,
      crafts: mergedCrafts,
    } as unknown as Omit<ThemeProps, 'crafts'> & { crafts: Crafts }
  })
}

export function useCustomTheme<T>(props?: MaybeRefOrGetter<T | undefined>): UseThemeReturn {
  return useTheme<T>(props ?? {})
}
