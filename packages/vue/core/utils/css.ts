export function getNodeCssVar(
  node: HTMLElement | null | undefined,
  varName: string,
): string | undefined
export function getNodeCssVar(
  node: HTMLElement | null | undefined,
  varName: string,
  fallback: string,
): string
export function getNodeCssVar(
  node: HTMLElement | null | undefined,
  varName: string,
  fallback?: string,
): string | undefined {
  node = node ?? document.documentElement
  const value = getComputedStyle(node).getPropertyValue(varName).trim()
  if (value)
    return value
  return fallback !== undefined ? fallback : undefined
}

export function getCssVar(variableName: string, fallback?: string) {
  return getNodeCssVar(null, variableName, fallback ?? '')
}

export function getCssColor(colorName: string, fallback?: string) {
  return getCssVar(`--color-${colorName}`, fallback)
}
