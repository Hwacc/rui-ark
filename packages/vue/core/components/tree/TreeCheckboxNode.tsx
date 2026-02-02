import type { UseTreeViewNodeContext } from '@ark-ui/vue'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes, PropType, SlotsType, UnwrapRef, VNode } from 'vue'
import { TreeView } from '@ark-ui/vue'
import { tvCheckbox as tvCheckboxCrafts } from '@rui-ark/themes/crafts/checkbox'
import { tvTreeBranch, tvTreeItem } from '@rui-ark/themes/crafts/tree'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { Check, ChevronRight, Minus } from 'lucide-vue-next'
import { cloneVNode, defineComponent, isVNode, toRefs, unref } from 'vue'
import { TreeCheckboxNode } from '.'
import { Icon } from '../icon'

interface Node {
  id: string
  name: string
  children?: Node[]
  icon?: string | VNode | (
    (
      props: {
        node: Node
        state: UnwrapRef<UseTreeViewNodeContext>
        class: HTMLAttributes['class']
      },
    ) => VNode
  )
}

interface KeyMap {
  id: keyof Node
  name: keyof Node
  children: keyof Node
  icon: keyof Node
}

export default defineComponent({
  name: 'TreeCheckboxNode',
  props: {
    ui: {
      type: Object as PropType<{
        branch?: HTMLAttributes['class']
        branchControl?: HTMLAttributes['class']
        branchTitle?: HTMLAttributes['class']
        branchIcon?: HTMLAttributes['class']
        branchText?: HTMLAttributes['class']
        branchIndicator?: HTMLAttributes['class']
        branchContent?: HTMLAttributes['class']
        branchIndentGuide?: HTMLAttributes['class']
        branchCheckbox?: HTMLAttributes['class']
        branchCheckboxIndicator?: HTMLAttributes['class']
        item?: HTMLAttributes['class']
        itemTitle?: HTMLAttributes['class']
        itemIcon?: HTMLAttributes['class']
        itemText?: HTMLAttributes['class']
        itemCheckbox?: HTMLAttributes['class']
        itemCheckboxIndicator?: HTMLAttributes['class']
      }>,
      default: () => ({}),
    },
    theme: {
      type: Object as PropType<Theme>,
      default: () => ({}),
    },
    node: {
      type: Object as PropType<Node>,
      default: () => ({}),
      required: true,
    },
    nodeIndent: {
      type: Number,
    },
    indexPath: {
      type: Array as PropType<number[]>,
      default: () => [],
      required: true,
    },
    keyMap: {
      type: Object as PropType<Partial<KeyMap>>,
      default: () => ({
        id: 'id',
        name: 'name',
        children: 'children',
        icon: 'icon',
      }),
    },
  },

  slots: Object as SlotsType<{
    branch: (props: { node: Node, keyMap: KeyMap, state: UnwrapRef<UseTreeViewNodeContext> }) => any
    item: (props: { node: Node, keyMap: KeyMap, state: UnwrapRef<UseTreeViewNodeContext> }) => any
  }>,

  setup(props, { attrs, slots }) {
    const { node, nodeIndent, indexPath, keyMap, ui } = toRefs(props)

    // theme
    const theme = useTheme(() => props.theme)
    const tvBranch = tvTreeBranch()
    const tvItem = tvTreeItem()
    const tvCheckbox = tvCheckboxCrafts()

    return () => {
      const uNode = unref(node)
      const uIndexPath = unref(indexPath)
      const uKeyMap = Object.assign({
        id: 'id',
        name: 'name',
        children: 'children',
        icon: 'icon',
      }, unref(keyMap))
      const uUi = unref(ui)
      const attrsClass = attrs.class as HTMLAttributes['class']

      function renderIcon(
        iconProps: {
          node: Node
          state: UnwrapRef<UseTreeViewNodeContext>
          class: HTMLAttributes['class']
        },
      ) {
        const icon = uNode[uKeyMap.icon]
        if (typeof icon === 'string') {
          return <Icon class={iconProps.class} icon={icon} />
        }
        else if (isVNode(icon)) {
          return cloneVNode(icon, { class: iconProps.class })
        }
        else if (typeof icon === 'function') {
          return icon(iconProps)
        }
        return <></>
      }

      return (
        <TreeView.NodeProvider node={uNode} indexPath={uIndexPath}>
          <TreeView.NodeContext>
            {{
              default: (nodeState: UnwrapRef<UseTreeViewNodeContext>) =>
                (
                  <>
                    {
                      uNode[uKeyMap.children] && (
                        <TreeView.Branch
                          {...attrs}
                          class={
                            tvBranch.root({
                              class: [uUi.branch, attrsClass],
                              ...theme.value,
                            })
                          }
                          style={unref(nodeIndent) ? { '--indent': `${unref(nodeIndent)}px` } : undefined}
                        >
                          <TreeView.BranchControl class={tvBranch.control({ class: uUi.branchControl, ...theme.value })}>
                            {
                              slots.branch
                                ? slots.branch({
                                    node: uNode,
                                    keyMap: uKeyMap,
                                    state: nodeState,
                                  })
                                : (
                                    <>
                                      <div
                                        class={tvBranch.title({ class: uUi.branchTitle, ...theme.value })}
                                        data-scope="tree-view"
                                        data-part="branch-title"
                                      >
                                        <TreeView.NodeCheckbox
                                          class={tvCheckbox.control({
                                            class: tvBranch.checkbox({ class: uUi.branchCheckbox, ...theme.value }),
                                            ...theme.value,
                                          })}
                                        >
                                          <TreeView.NodeCheckboxIndicator class={tvCheckbox.indicator({
                                            class: tvBranch.checkboxIndicator({ class: uUi.branchCheckboxIndicator, ...theme.value }),
                                            ...theme.value,
                                          })}
                                          >
                                            {{
                                              default: () => <Check class={tvCheckbox.indicatorChecked({ ...theme.value })} />,
                                              indeterminate: () => <Minus class={tvCheckbox.indicatorMinus({ ...theme.value })} />,
                                            }}
                                          </TreeView.NodeCheckboxIndicator>
                                        </TreeView.NodeCheckbox>
                                        {renderIcon(
                                          {
                                            node: uNode,
                                            state: nodeState,
                                            class: tvBranch.icon({
                                              class: uUi.branchIcon,
                                              ...theme.value,
                                            }),
                                          },
                                        )}
                                        <TreeView.BranchText class={tvBranch.text({ class: uUi.branchText, ...theme.value })}>
                                          {uNode[uKeyMap.name]}
                                        </TreeView.BranchText>
                                      </div>
                                      <TreeView.BranchIndicator class={tvBranch.indicator({ class: uUi.branchIndicator, ...theme.value })}>
                                        <ChevronRight style={{ width: '1lh', height: '1lh' }} />
                                      </TreeView.BranchIndicator>
                                    </>
                                  )
                            }
                          </TreeView.BranchControl>
                          <TreeView.BranchContent class={tvBranch.content({ class: uUi.branchContent, ...theme.value })}>
                            <TreeView.BranchIndentGuide />
                            {
                              (uNode[uKeyMap.children] as Node[]).map((child, index) => {
                                return (
                                  <TreeCheckboxNode
                                    key={child[uKeyMap.id] as string}
                                    node={child}
                                    indexPath={[...uIndexPath, index]}
                                  />
                                )
                              })
                            }
                          </TreeView.BranchContent>
                        </TreeView.Branch>
                      )
                    }
                    {
                      !uNode[uKeyMap.children] && (
                        <TreeView.Item {...attrs} class={tvItem.root({ class: uUi.item, ...theme.value })}>
                          {
                            slots.item
                              ? slots.item({
                                  node: uNode,
                                  keyMap: uKeyMap,
                                  state: nodeState,
                                })
                              : (
                                  <div
                                    class={tvItem.title({ class: uUi.itemTitle, ...theme.value })}
                                    data-scope="tree-view"
                                    data-part="item-title"
                                  >
                                    <TreeView.NodeCheckbox class={tvCheckbox.control({
                                      class: tvItem.checkbox({ class: uUi.itemCheckbox, ...theme.value }),
                                      ...theme.value,
                                    })}
                                    >
                                      <TreeView.NodeCheckboxIndicator class={tvCheckbox.indicator({
                                        class: tvItem.checkboxIndicator({ class: uUi.itemCheckboxIndicator, ...theme.value }),
                                        ...theme.value,
                                      })}
                                      >
                                        {{
                                          default: () => <Check class={tvCheckbox.indicatorChecked({ ...theme.value })} />,
                                          indeterminate: () => <Minus class={tvCheckbox.indicatorMinus({ ...theme.value })} />,
                                        }}
                                      </TreeView.NodeCheckboxIndicator>
                                    </TreeView.NodeCheckbox>
                                    {renderIcon(
                                      {
                                        node: uNode,
                                        state: nodeState,
                                        class: tvItem.icon({ class: uUi.itemIcon, ...theme.value }),
                                      },
                                    )}
                                    <TreeView.ItemText class={tvItem.text({ class: uUi.itemText, ...theme.value })}>
                                      {uNode[uKeyMap.name]}
                                    </TreeView.ItemText>
                                  </div>
                                )
                          }
                        </TreeView.Item>
                      )
                    }
                  </>
                ),
            }}
          </TreeView.NodeContext>
        </TreeView.NodeProvider>
      )
    }
  },
})
