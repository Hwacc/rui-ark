import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { DefineComponent, HTMLAttributes } from 'vue'
import { cn } from '@rui-ark/themes/utils/cn'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { computed, defineComponent } from 'vue'

export interface ArrowProps extends ThemeProps {
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
    setup(props) {
      const theme = useTheme(
        () => ({
          size: props.size,
          bordered: props.bordered,
          skin: props.skin,
        }),
      )
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
            data-skin={theme.value.skin}
            style={{
              '--arrow-size': arrowSize.value,
            }}
          >
            <ArrowTipNode
              class={cn(theme.value.bordered && 'border', props.ui?.arrowTip)}
              data-skin={theme.value.skin}
              data-bordered={theme.value.bordered ? 'true' : undefined}
            />
          </ArrowNode>
        )
      }
    },
  })
}
