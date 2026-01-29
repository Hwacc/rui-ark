import type { Theme, ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'
import { cn } from '@rui-ark/themes/utils/cn'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { computed, defineComponent } from 'vue'

export interface ArrowProps extends Theme {
  class?: HTMLAttributes['class']
  ui?: {
    arrow?: HTMLAttributes['class']
    arrowTip?: HTMLAttributes['class']
  }
}

export function createArrow(
  ArrowNode: DefineComponent<any, any, any>,
  ArrowTipNode: DefineComponent<any, any, any>,
) {
  return defineComponent<ArrowProps>({
    name: ArrowNode.__name,
    props: {
      class: {
        type: String as HTMLAttributes['class'],
      },
      ui: {
        type: Object as PropType<{
          arrow?: HTMLAttributes['class']
          arrowTip?: HTMLAttributes['class']
        }>,
      },
      theme: {
        type: Object as PropType<ThemeProps>,
      },
    },
    setup(props) {
      const theme = useTheme(() => props.theme)
      const arrowSize = computed(() => {
        switch (theme.value.size) {
          case 'sm':
            return '0.25rem'
          case 'lg':
            return '0.5rem'
          case 'base':
          default:
            return '.375rem'
        }
      })
      return () => {
        return (
          <ArrowNode
            class={cn('overflow-visible z-0', props.ui?.arrow, props.class)}
            data-theme-skin={theme.value.skin}
            data-theme-surface={theme.value.surface}
            style={{
              '--arrow-size': arrowSize.value,
            }}
          >
            <ArrowTipNode
              class={cn(theme.value.bordered && 'border', props.ui?.arrowTip)}
              data-theme-skin={theme.value.skin}
              data-theme-surface={theme.value.surface}
              data-theme-bordered={theme.value.bordered ? '' : undefined}
            />
          </ArrowNode>
        )
      }
    },
  })
}
