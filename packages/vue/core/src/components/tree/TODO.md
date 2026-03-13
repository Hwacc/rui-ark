# Tree 组件优化 TODO

> 基于 Ark UI tree-view 组合式 API 与性能分析的优化项清单

### 性能优化
- [x] **Theme/crafts 提升至 Tree 根节点 provide**：TreeNode/TreeCheckboxNode 改为 inject，避免每节点 useTheme + computed 开销
- [x] **启用 lazyMount + unmountOnExit**：大数据量示例中为 Tree 添加 `lazy-mount`、`unmount-on-exit`，折叠分支不渲染子节点
- [ ] **markRaw 大数据**：当 rootNode/collection 节点数 >500 时，文档建议对 collection 使用 `markRaw()` 防止 Vue 深度响应式
- [ ] **Ark UI Virtualized**：研究并接入 Ark UI 的 `getVisibleNodes()` + 虚拟列表方案，实现真正的大树虚拟化
- [ ] **单节点轻量化**：评估 TreeNode 用函数式组件或减少 props 传递，降低每实例开销

### 代码质量

- [ ] **合并 TreeNode 与 TreeCheckboxNode**：通过 `selectionMode` 或 `variant` 统一为单一组件，减少重复
- [ ] **文档性能限制**：在 Tree 文档中说明大数据场景（建议 <500 节点，超量需虚拟化或懒加载）

### 约束说明

- **不采用扁平 v-for**：Ark UI tree-view 依赖 `NodeProvider` → `BranchContent` → 子 `NodeProvider` 的嵌套结构，扁平化会破坏其交互与 a11y
- **保持组合式用法**：遵循 Ark UI 官方示例的递归 TreeNode 模式
