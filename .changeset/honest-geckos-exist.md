---
"@rark-ui/vue": patch
---

- Introduced a renderName function in TreeCheckboxNode and TreeNode components to handle dynamic node names, supporting strings, VNodes, and functions.
- Updated the Tree component's display logic to utilize the new renderName function for improved flexibility.