/**
 * 函数式唤起Dialog
 */
import type { UseDialogContext } from '@ark-ui/vue/dialog'
import type { DialogVariants } from '@rui-ark/themes/crafts/dialog'
import type { PropType } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type {
  DialogTriggerFrom,
  OpenChangeDetails,
} from './dialog-intercept-context'
import { DialogContext } from '@ark-ui/vue/dialog'
import { getCssVar } from '@rui-ark/shared/css'
import { createApp, defineComponent, reactive, ref } from 'vue'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '.'

interface DialogOptions {
  title?: string | ((context: UseDialogContext) => any)
  content?: string | ((context: UseDialogContext) => any)
  footer?: boolean | ((context: UseDialogContext) => any)
  render?: (context: UseDialogContext) => any
  widget?: {
    header?: ComponentProps<typeof DialogHeader>
    content?: ComponentProps<typeof DialogContent>
    body?: ComponentProps<typeof DialogBody>
    footer?: ComponentProps<typeof DialogFooter>
  }
  size?: DialogVariants['size']
  unstyled?: boolean
  onOpenChange?: (
    details: OpenChangeDetails & { from: DialogTriggerFrom },
  ) => void
  onOk?: (event: MouseEvent) => void
  onCancel?: (event: MouseEvent) => void
}

export function dialog(options: DialogOptions) {
  const {
    title,
    content,
    footer = true,
    render,
    widget,
    onOpenChange,
    onOk,
    onCancel,
  } = reactive(options)
  const open = ref(false)
  const DialogComponent = defineComponent({
    name: 'Dialog',
    props: {
      onClose: {
        type: Function as PropType<
          (details: OpenChangeDetails & { from: DialogTriggerFrom }) => void
        >,
        default: () => {},
      },
    },
    setup(props) {
      return () => {
        return (
          <Dialog
            v-model={[open.value, 'open']}
            lazy-mount
            unmount-on-exit
            onOpenChange={(details) => {
              if (!details.open) {
                props.onClose?.(details)
              }
              onOpenChange?.(details)
            }}
          >
            <DialogContext>
              {{
                default: (context: UseDialogContext) => {
                  if (render) {
                    return (
                      <DialogContent {...widget?.content}>
                        {render(context)}
                      </DialogContent>
                    )
                  }
                  return (
                    <DialogContent {...widget?.content}>
                      {title && (
                        <DialogHeader {...widget?.header}>
                          {{
                            default: () => {
                              return typeof title === 'function'
                                ? title(context)
                                : title
                            },
                          }}
                        </DialogHeader>
                      )}
                      {content && (
                        <DialogBody {...widget?.body}>
                          {{
                            default: () => {
                              return typeof content === 'function'
                                ? content(context)
                                : content
                            },
                          }}
                        </DialogBody>
                      )}
                      {footer && (
                        <DialogFooter
                          {...widget?.footer}
                          onOk={onOk}
                          onCancel={onCancel}
                        >
                          {{
                            default: () => {
                              return typeof footer === 'function'
                                ? footer(context)
                                : null
                            },
                          }}
                        </DialogFooter>
                      )}
                    </DialogContent>
                  )
                },
              }}
            </DialogContext>
          </Dialog>
        )
      }
    },
  })

  let dialogRootEl: HTMLDivElement | null = document.createElement('div')
  const dialogVueInstance = createApp(DialogComponent, {
    onClose: () => {
      /**
       * HACK: Because ark-ui dialog didn't expose Precense 'exitComplete' event,
       * so we need to wait for the motion duration to unmount the dialog.
       * see: https://github.com/chakra-ui/ark/blob/c8c7aeef49d3f7de0ff6ddf05fc328714b97b98d/packages/vue/src/components/dialog/dialog-positioner.vue
       * this is a temporary solution, maybe we should create a PR to solve it.
       */
      const motionDuration = getCssVar('--motion-duration', '0.2')
      setTimeout(() => {
        dialogRootEl = null
        dialogVueInstance.unmount()
      }, parseFloat(motionDuration) * 1000)
    },
  })
  dialogVueInstance.mount(dialogRootEl)
  open.value = true
  return {
    close: () => {
      open.value = false
    },
  }
}
