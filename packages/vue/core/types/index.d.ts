declare type EventDetails<T> = {
  originalEvent: T
  contextmenu: boolean
  focusable: boolean
  target: EventTarget
}

declare type LayerDismissEventDetail = {
  originalLayer: HTMLElement
  targetLayer: HTMLElement | undefined
  originalIndex: number
  targetIndex: number
}
