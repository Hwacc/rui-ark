import type { UseTreeViewNodeContext } from '@ark-ui/vue'
import type { ThemeNoCrafts } from '@rark-ui/vue/providers/theme'
import type { HTMLAttributes, PropType, SlotsType, UnwrapRef, VNode } from 'vue'
import { TreeView } from '@ark-ui/vue'
import { useTheme } from '@rark-ui/vue/composables/useTheme'
import { Check, ChevronRight, Minus } from 'lucide-vue-next'
import { cloneVNode, computed, defineComponent, isVNode, toRefs, unref } from 'vue'
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
      type: Object as PropType<ThemeNoCrafts>,
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
    const branchCrafts = computed(() => theme.value.crafts.tvTreeBranch())
    const itemCrafts = computed(() => theme.value.crafts.tvTreeItem())
    const checkboxCrafts = computed(() => theme.value.crafts.tvCheckbox())

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
                            branchCrafts.value.root({
                              class: [uUi.branch, attrsClass],
                              ...theme.value,
                            })
                          }
                          style={unref(nodeIndent) ? { '--indent': `${unref(nodeIndent)}px` } : undefined}
                        >
                          <TreeView.BranchControl class={branchCrafts.value.control({ class: uUi.branchControl, ...theme.value })}>
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
                                        class={branchCrafts.value.title({ class: uUi.branchTitle, ...theme.value })}
                                        data-scope="tree-view"
                                        data-part="branch-title"
                                      >
                                        <TreeView.NodeCheckbox
                                          class={checkboxCrafts.value.control({
                                            class: branchCrafts.value.checkbox({ class: uUi.branchCheckbox, ...theme.value }),
                                            ...theme.value,
                                          })}
                                        >
                                          <div
                                            class={checkboxCrafts.value.indicator({
                                              class: branchCrafts.value.checkboxIndicator({ class: uUi.branchCheckboxIndicator, ...theme.value }),
                                              ...theme.value,
                                            })}
                                          >
                                            <TreeView.NodeCheckboxIndicator>
                                              {{
                                                default: () => <Check class={checkboxCrafts.value.indicatorChecked({ ...theme.value })} />,
                                                indeterminate: () => <Minus class={checkboxCrafts.value.indicatorMinus({ ...theme.value })} />,
                                              }}
                                            </TreeView.NodeCheckboxIndicator>
                                          </div>
                                        </TreeView.NodeCheckbox>
                                        {renderIcon(
                                          {
                                            node: uNode,
                                            state: nodeState,
                                            class: branchCrafts.value.icon({
                                              class: uUi.branchIcon,
                                              ...theme.value,
                                            }),
                                          },
                                        )}
                                        <TreeView.BranchText class={branchCrafts.value.text({ class: uUi.branchText, ...theme.value })}>
                                          {uNode[uKeyMap.name]}
                                        </TreeView.BranchText>
                                      </div>
                                      <TreeView.BranchIndicator class={branchCrafts.value.indicator({ class: uUi.branchIndicator, ...theme.value })}>
                                        <ChevronRight style={{ width: '1lh', height: '1lh' }} />
                                      </TreeView.BranchIndicator>
                                    </>
                                  )
                            }
                          </TreeView.BranchControl>
                          <TreeView.BranchContent class={branchCrafts.value.content({ class: uUi.branchContent, ...theme.value })}>
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
                        <TreeView.Item {...attrs} class={itemCrafts.value.root({ class: uUi.item, ...theme.value })}>
                          {
                            slots.item
                              ? slots.item({
                                  node: uNode,
                                  keyMap: uKeyMap,
                                  state: nodeState,
                                })
                              : (
                                  <div
                                    class={itemCrafts.value.title({ class: uUi.itemTitle, ...theme.value })}
                                    data-scope="tree-view"
                                    data-part="item-title"
                                  >
                                    <TreeView.NodeCheckbox class={checkboxCrafts.value.control({
                                      class: itemCrafts.value.checkbox({ class: uUi.itemCheckbox, ...theme.value }),
                                      ...theme.value,
                                    })}
                                    >
                                      <div
                                        class={
                                          checkboxCrafts.value.indicator({
                                            class: itemCrafts.value.checkboxIndicator({ class: uUi.itemCheckboxIndicator, ...theme.value }),
                                            ...theme.value,
                                          })
                                        }
                                      >
                                        <TreeView.NodeCheckboxIndicator>
                                          {{
                                            default: () => <Check class={checkboxCrafts.value.indicatorChecked({ ...theme.value })} />,
                                            indeterminate: () => <Minus class={checkboxCrafts.value.indicatorMinus({ ...theme.value })} />,
                                          }}
                                        </TreeView.NodeCheckboxIndicator>
                                      </div>
                                    </TreeView.NodeCheckbox>
                                    {renderIcon(
                                      {
                                        node: uNode,
                                        state: nodeState,
                                        class: itemCrafts.value.icon({ class: uUi.itemIcon, ...theme.value }),
                                      },
                                    )}
                                    <TreeView.ItemText class={itemCrafts.value.text({ class: uUi.itemText, ...theme.value })}>
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
