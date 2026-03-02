# Dialog 设计细节

## Variant（变体）

| Variant | 说明 | 适用场景 |
|---------|------|----------|
| **default** | 标准对话框，secondary background 背景，secondary border 边框 | 通用内容展示、表单、多步骤操作 |
| **alert** | 确认/警告类，更紧凑布局，强调操作 | 确认、取消、警告提示 |
| **destructive** | 危险操作，razer red 强调 | 删除、不可逆操作确认 |

## Size（尺寸）

| Size | header | body | footer | 说明 |
|------|--------|------|--------|------|
| **xs** | py-2 px-4, text-xs | p-4, text-xs | px-4 py-3, gap-4, text-xs | 轻量提示、简短确认 |
| **sm** | py-2.5 px-5, text-sm | p-5, text-sm | px-5 py-4, gap-5, text-sm | 常规确认、简短表单 |
| **base** | py-3 px-6, text-base | p-6, text-base | px-6 py-5, gap-6, text-base | 默认档位，通用场景 |
| **lg** | py-4 px-8, text-lg | p-8, text-lg | px-8 py-6, gap-8, text-lg | 复杂内容、多区块布局 |

## 尺寸与 Variant 对应

| Variant | 推荐 Size | 备注 |
|---------|-----------|------|
| default | base / sm / lg | 按内容量选择 |
| alert | xs / sm | 保持紧凑 |
| destructive | sm / base | 避免过大分散注意力 |

## 其他规范

- **backdrop**：模糊遮罩，secondary background 叠加，满足点击关闭
- **content**：max-w 80vw（md 及以上），border radius 遵循 size-guide
- **close 按钮**：header 内或 content 右上角（content-close），遵循 Button text/icon variant
