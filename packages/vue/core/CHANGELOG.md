# @rark-ui/vue

## 1.5.6

### Patch Changes

- c73779c: - Updated the renderName function in TreeCheckboxNode and TreeNode components to directly return strings or VNodes, removing unnecessary conditional checks.
  - Enhanced code readability and maintainability by streamlining the rendering logic.
- b33508c: - **Checkbox, Radio, Select, Tree**: Broadened the supported value types for `model-value` to allow more flexible data structures and improve type safety

## 1.5.5

### Patch Changes

- ff459ee: - Introduced `renderIcon` and `renderName` props in TreeCheckboxNode and TreeNode components to allow custom rendering of icons and names.
  - Updated the Tree component to utilize these new props for enhanced flexibility in rendering.

## 1.5.4

### Patch Changes

- 6d90c4a: - Introduced a renderName function in TreeCheckboxNode and TreeNode components to handle dynamic node names, supporting strings, VNodes, and functions.
  - Updated the Tree component's display logic to utilize the new renderName function for improved flexibility.

## 1.5.3

### Patch Changes

- c098b85: - Added TreeKeyMap and TreeNodeData types to facilitate custom data structures in the Tree component.
  - Updated TreeCheckboxNode and TreeNode components to utilize the new types for improved flexibility.

## 1.5.2

### Patch Changes

- Updated dependencies [3922b6e]
  - @rark-ui/themes@1.5.1

## 1.5.1

### Patch Changes

- 30fdbb7: fix: theme uitls import

## 1.5.0

### Minor Changes

- 31a8016: - Added new CSS files for animations and easing functions to improve UI transitions.
  - Updated package.json to include new utility exports for better accessibility.
  - Refactored imports in various components to utilize the new utility functions, ensuring consistency across the theme.

### Patch Changes

- 460ab09: fixed: add MenuContext export
- b67b936: fixed: Add SpinProvider to RUIConfig
- 3e99b47: fix: update key binding in ScrollArea component for improved rendering
- Updated dependencies [31a8016]
  - @rark-ui/themes@1.5.0

## 1.4.0

### Minor Changes

- 8c172d6: - @rark-ui/shared:
  - Fixed dependency issues to improve package stability.
  - Add parseCubicBezier func
  - @rark-ui/themes:
    - Fixed dependency issues to improve package stability.
  - @rark-ui/vue:
    - Fixed Crafts type issues
    - Fixed useTheme Crafts judgement
    - Fixed dependency issues to improve package stability.

### Patch Changes

- Updated dependencies [8c172d6]
  - @rark-ui/shared@1.4.0
  - @rark-ui/themes@1.4.0

## 1.3.0

### Minor Changes

- 1b1c0eb: - @rark-ui/shared:
  - Fixed dependency issues to improve package stability.
  - Add parseCubicBezier func
  - @rark-ui/themes:
    - Fixed dependency issues to improve package stability.
  - @rark-ui/vue:
    - Fixed Crafts type issues
    - Fixed useTheme Crafts judgement
    - Fixed dependency issues to improve package stability.

### Patch Changes

- Updated dependencies [1b1c0eb]
  - @rark-ui/shared@1.3.0
  - @rark-ui/themes@1.3.0

## 1.2.5

### Patch Changes

- 6c3b66b: (fix) vue tree check node click behavior
  (fix) vue addons virtual grid class bind
  (chore) update @ark-ui dependency version

## 1.2.4

### Patch Changes

- a31629d: fix: tree component indicator warning
