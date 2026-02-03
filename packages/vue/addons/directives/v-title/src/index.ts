import type { DirectiveBinding } from 'vue'
import { computePosition, flip, hide, offset, shift } from '@floating-ui/vue'
import { tvVTitle } from '@rui-ark/themes/crafts/addons/v-title'

class TitleTooltip {
  titleTipNode: HTMLDivElement
  titleTipTextNode: Text
  showTimer: number = 0

  constructor() {
    this.titleTipNode = document.createElement('div')
    this.titleTipNode.className = tvVTitle()
    this.titleTipTextNode = document.createTextNode('')
    this.titleTipNode.appendChild(this.titleTipTextNode)
    document.body.appendChild(this.titleTipNode)
    document.addEventListener('scroll', () => {
      if (this.showTimer) {
        this.onMouseLeave()
      }
    })
  }

  async onMouseEnter(el: Element, binding: DirectiveBinding) {
    this.showTimer && clearTimeout(this.showTimer)
    this.showTimer = setTimeout(async () => {
      try {
        this.titleTipNode.removeChild(this.titleTipTextNode)
        this.titleTipTextNode = document.createTextNode(binding.value)
        this.titleTipNode.appendChild(this.titleTipTextNode)
        const getClassName = (hidden: boolean = false, visible: boolean = false) => {
          return tvVTitle({
            size: binding.modifiers.lg ? 'lg' : 'base',
            unstyled: binding.modifiers.unstyled,
            hidden,
            visible,
          })
        }
        this.titleTipNode.className = getClassName(false)
        this.titleTipNode.setAttribute('data-theme-surface', binding.arg ?? 'default')

        const { x, y, middlewareData } = await computePosition(el, this.titleTipNode, {
          placement: 'bottom',
          middleware: [flip(), shift(), offset(4), hide()],
        })
        if (!middlewareData.hide?.referenceHidden) {
          console.log(x, y)
          Object.assign(this.titleTipNode.style, {
            left: `${x}px`,
            top: `${y}px`,
          })
          this.titleTipNode.className = getClassName(false, true)
        }
        else {
          this.titleTipNode.className = getClassName(true)
        }
      }
      catch (error) {
        console.error(error)
      }
    }, 500) as unknown as number
  }

  onMouseLeave() {
    if (this.showTimer) {
      clearTimeout(this.showTimer)
      this.showTimer = 0
    }
    this.titleTipNode.className = tvVTitle({
      visible: false,
      hidden: true,
    })
  }
}

let instance: TitleTooltip
if (window) {
  instance = new TitleTooltip()
}

export function vTitle(el: Element, binding: DirectiveBinding) {
  el.addEventListener('mouseenter', () => instance.onMouseEnter(el, binding))
  el.addEventListener('mouseleave', () => instance.onMouseLeave())
}
