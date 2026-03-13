import type { UseTreeViewNodeContext } from '@ark-ui/vue'
import type { h, HTMLAttributes, PropType, SlotsType, UnwrapRef, VNode } from 'vue'
import type { TreeKeyMap, TreeNodeData } from './props'
import { TreeView, useTreeViewContext } from '@ark-ui/vue'
import { useTheme } from '@rark-ui/vue/composables/useTheme'
import { Check, ChevronRight, Minus } from 'lucide-vue-next'
import { cloneVNode, defineComponent, isVNode, toRefs, unref } from 'vue'
import { TreeCheckboxNode } from '.'
import { Icon } from '../icon'
import { injectTreeContext } from './tree-context'

/** 合并 keyMap 后的完整类型（用于 slots） */
interface ResolvedKeyMap {
  id: string
  name: string
  children: string
  icon: string
}

type RenderIconProps = {
  icon: string | VNode | Function
  node: TreeNodeData
  state: UnwrapRef<UseTreeViewNodeContext>
  class: HTMLAttributes['class']
}
type RenderIcon = (props: RenderIconProps) => ReturnType<typeof h>

type RenderNameProps = {
  name: string | VNode | Function
  node: TreeNodeData
  state: UnwrapRef<UseTreeViewNodeContext>
}
type RenderName = (props: RenderNameProps) => ReturnType<typeof h> | string

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
    node: {
      type: Object as PropType<TreeNodeData>,
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
      type: Object as PropType<Partial<TreeKeyMap>>,
      default: () => ({
        id: 'id',
        name: 'name',
        children: 'children',
        icon: 'icon',
      }),
    },

    renderIcon: {
      type: Function as PropType<RenderIcon>,
      default: (props: RenderIconProps) => {
        if (typeof props.icon === 'string') {
          return <Icon class={props.class} icon={props.icon} />
        }
        if (isVNode(props.icon)) {
          return cloneVNode(props.icon, { class: props.class })
        }
        if (typeof props.icon === 'function') {
          return props.icon(props)
        }
        return <></>
      },
    },

    renderName: {
      type: Function as PropType<RenderName>,
      default: (props: RenderNameProps) => {
        if (typeof props.name === 'string' || isVNode(props.name)) {
          return props.name
        }
        if (typeof props.name === 'function') {
          return props.name(props)
        }
        return <></>
      },
    },
  },

  slots: Object as SlotsType<{
    branch: (props: {
      node: TreeNodeData
      keyMap: ResolvedKeyMap
      state: UnwrapRef<UseTreeViewNodeContext>
    }) => any
    item: (props: {
      node: TreeNodeData
      keyMap: ResolvedKeyMap
      state: UnwrapRef<UseTreeViewNodeContext>
    }) => any
  }>,

  setup(props, { attrs, slots }) {
    const { node, nodeIndent, indexPath, keyMap, ui } = toRefs(props)
    const treeViewContext = useTreeViewContext()

    const theme = useTheme()
    const { branchCrafts, itemCrafts, checkboxCrafts } = injectTreeContext()

    return () => {
      const uTheme = unref(theme)
      const uBranchCrafts = unref(branchCrafts)
      const uItemCrafts = unref(itemCrafts)
      const uCheckboxCrafts = unref(checkboxCrafts)
      const uNode = unref(node)
      const uIndexPath = unref(indexPath)
      const uKeyMap = Object.assign(
        {
          id: 'id',
          name: 'name',
          children: 'children',
          icon: 'icon',
        },
        unref(keyMap),
      )
      const uUi = unref(ui)
      const attrsClass = attrs.class as HTMLAttributes['class']

      return (
        <TreeView.NodeProvider node={uNode} indexPath={uIndexPath}>
          <TreeView.NodeContext>
            {{
              default: (nodeState: UnwrapRef<UseTreeViewNodeContext>) => (
                <>
                  {uNode[uKeyMap.children] && (
                    <TreeView.Branch
                      {...attrs}
                      class={uBranchCrafts.root({
                        class: [uUi.branch, attrsClass],
                        ...uTheme,
                      })}
                      style={
                        unref(nodeIndent) ? { '--indent': `${unref(nodeIndent)}px` } : undefined
                      }
                    >
                      <TreeView.BranchControl
                        class={uBranchCrafts.control({ class: uUi.branchControl, ...uTheme })}
                      >
                        {slots.branch
                          ? (
                              slots.branch({
                                node: uNode,
                                keyMap: uKeyMap,
                                state: nodeState,
                              })
                            )
                          : (
                              <>
                                <div
                                  class={uBranchCrafts.title({ class: uUi.branchTitle, ...uTheme })}
                                  data-scope="tree-view"
                                  data-part="branch-title"
                                >
                                  <TreeView.NodeCheckbox
                                    class={uCheckboxCrafts.control({
                                      class: uBranchCrafts.checkbox({
                                        class: uUi.branchCheckbox,
                                        ...uTheme,
                                      }),
                                      ...uTheme,
                                    })}
                                  >
                                    <div
                                      class={uCheckboxCrafts.indicator({
                                        class: uBranchCrafts.checkboxIndicator({
                                          class: uUi.branchCheckboxIndicator,
                                          ...uTheme,
                                        }),
                                        ...uTheme,
                                      })}
                                    >
                                      <TreeView.NodeCheckboxIndicator>
                                        {{
                                          default: () => (
                                            <Check
                                              class={uCheckboxCrafts.indicatorChecked({ ...uTheme })}
                                            />
                                          ),
                                          indeterminate: () => (
                                            <Minus
                                              class={uCheckboxCrafts.indicatorMinus({ ...uTheme })}
                                            />
                                          ),
                                        }}
                                      </TreeView.NodeCheckboxIndicator>
                                    </div>
                                  </TreeView.NodeCheckbox>
                                  {props.renderIcon({
                                    node: uNode,
                                    icon: uNode[uKeyMap.icon] as any,
                                    state: nodeState,
                                    class: uBranchCrafts.icon({
                                      class: uUi.branchIcon,
                                      ...uTheme,
                                    }),
                                  })}
                                  <TreeView.BranchText
                                    class={uBranchCrafts.text({ class: uUi.branchText, ...uTheme })}
                                  >
                                    {props.renderName({
                                      name: uNode[uKeyMap.name] as any,
                                      node: uNode,
                                      state: nodeState,
                                    })}
                                  </TreeView.BranchText>
                                </div>
                                <TreeView.BranchIndicator
                                  class={uBranchCrafts.indicator({
                                    class: uUi.branchIndicator,
                                    ...uTheme,
                                  })}
                                >
                                  <ChevronRight style={{ width: '1lh', height: '1lh' }} />
                                </TreeView.BranchIndicator>
                              </>
                            )}
                      </TreeView.BranchControl>
                      <TreeView.BranchContent
                        class={uBranchCrafts.content({ class: uUi.branchContent, ...uTheme })}
                      >
                        <TreeView.BranchIndentGuide />
                        {(uNode[uKeyMap.children] as TreeNodeData[]).map((child, index) => {
                          return (
                            <TreeCheckboxNode
                              key={child[uKeyMap.id] as string}
                              node={child}
                              indexPath={[...uIndexPath, index]}
                              keyMap={uKeyMap}
                              renderIcon={props.renderIcon}
                              renderName={props.renderName}
                            />
                          )
                        })}
                      </TreeView.BranchContent>
                    </TreeView.Branch>
                  )}
                  {!uNode[uKeyMap.children] && (
                    <TreeView.Item
                      {...attrs}
                      class={uItemCrafts.root({ class: uUi.item, ...uTheme })}
                      onClick={() => {
                        treeViewContext.value.toggleChecked(uNode[uKeyMap.id] as string, false)
                      }}
                    >
                      {slots.item
                        ? (
                            slots.item({
                              node: uNode,
                              keyMap: uKeyMap,
                              state: nodeState,
                            })
                          )
                        : (
                            <div
                              class={uItemCrafts.title({ class: uUi.itemTitle, ...uTheme })}
                              data-scope="tree-view"
                              data-part="item-title"
                            >
                              <TreeView.NodeCheckbox
                                class={uCheckboxCrafts.control({
                                  class: uItemCrafts.checkbox({ class: uUi.itemCheckbox, ...uTheme }),
                                  ...uTheme,
                                })}
                              >
                                <div
                                  class={uCheckboxCrafts.indicator({
                                    class: uItemCrafts.checkboxIndicator({
                                      class: uUi.itemCheckboxIndicator,
                                      ...uTheme,
                                    }),
                                    ...uTheme,
                                  })}
                                >
                                  <TreeView.NodeCheckboxIndicator>
                                    {{
                                      default: () => (
                                        <Check
                                          class={uCheckboxCrafts.indicatorChecked({ ...uTheme })}
                                        />
                                      ),
                                      indeterminate: () => (
                                        <Minus class={uCheckboxCrafts.indicatorMinus({ ...uTheme })} />
                                      ),
                                    }}
                                  </TreeView.NodeCheckboxIndicator>
                                </div>
                              </TreeView.NodeCheckbox>
                              {props.renderIcon({
                                node: uNode,
                                icon: uNode[uKeyMap.icon] as any,
                                state: nodeState,
                                class: uItemCrafts.icon({ class: uUi.itemIcon, ...uTheme }),
                              })}
                              <TreeView.ItemText
                                class={uItemCrafts.text({ class: uUi.itemText, ...uTheme })}
                              >
                                {props.renderName({
                                  name: uNode[uKeyMap.name] as any,
                                  node: uNode,
                                  state: nodeState,
                                })}
                              </TreeView.ItemText>
                            </div>
                          )}
                    </TreeView.Item>
                  )}
                </>
              ),
            }}
          </TreeView.NodeContext>
        </TreeView.NodeProvider>
      )
    }
  },
})
