import type { ComputedRef, Ref } from 'vue'
import { createContext } from '@ark-ui/vue'

export interface OpenChangeDetails {
  open: boolean
}

export type FocusOutsideEvent = CustomEvent<EventDetails<FocusEvent>>
export type InteractOutsideEvent = CustomEvent<EventDetails<FocusEvent>>
export type PointerDownOutsideEvent = CustomEvent<EventDetails<PointerEvent>>
export type RequestDismissEvent = CustomEvent<LayerDismissEventDetail>

export enum TriggerFrom {
  ESCAPE = 'escape',
  OPEN_TRIGGER = 'open_trigger',
  CLOSE_TRIGGER = 'close_trigger',
  OUTSIDE = 'outside',
}
export type DialogTriggerFrom = TriggerFrom | string | null | undefined

export interface DialogInterceptContext {
  triggerFrom: Ref<DialogTriggerFrom>
  onOpenChange: (details: OpenChangeDetails) => void
  onEscapeKeyDown: (event: KeyboardEvent) => void
  onFocusOutside: (event: FocusOutsideEvent) => void
  onInteractOutside: (event: InteractOutsideEvent) => void
  onPointerDownOutside: (event: PointerDownOutsideEvent) => void
  onRequestDismiss: (event: RequestDismissEvent) => void
}

export const [provideDialogInterceptContext, injectDialogInterceptContext]
  = createContext<ComputedRef<DialogInterceptContext>>('DialogInterceptContext')
