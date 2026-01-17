import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const TARGET_ROOT = path.join(ROOT, 'packages', 'vue', 'core')

const IGNORE_DIRS = new Set(['node_modules', 'dist', '.turbo', '.git'])
const FILE_RE = /\.(vue|ts|tsx)$/

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      if (IGNORE_DIRS.has(ent.name)) continue
      walk(path.join(dir, ent.name), out)
    } else if (ent.isFile()) {
      const fp = path.join(dir, ent.name)
      if (FILE_RE.test(fp)) out.push(fp)
    }
  }
  return out
}

function hasComputedImport(code) {
  return /\bcomputed\b/.test(code) && /from\s+['"]vue['"]/.test(code) && /import\s+.*\bcomputed\b/.test(code)
}

function ensureComputedImport(code) {
  // If any import from 'vue' already includes computed, nothing to do.
  if (/\bimport\s+\{[^}]*\bcomputed\b[^}]*\}\s+from\s+['"]vue['"]/.test(code)) return code
  if (/\bimport\s+\{\s*computed\s*\}\s+from\s+['"]vue['"]/.test(code)) return code

  // Add computed to the first named import from vue if present
  const namedVueImport = /import\s+\{([^}]*)\}\s+from\s+['"]vue['"];?/m
  if (namedVueImport.test(code)) {
    return code.replace(namedVueImport, (m, inner) => {
      const parts = inner.split(',').map((s) => s.trim()).filter(Boolean)
      if (parts.includes('computed')) return m
      return `import { computed, ${inner.trim()} } from 'vue'`
    })
  }

  // Otherwise, insert a new import after the last import line
  const importLines = [...code.matchAll(/^\s*import .*?;\s*$/gm)]
  if (importLines.length > 0) {
    const last = importLines[importLines.length - 1]
    const idx = last.index + last[0].length
    return code.slice(0, idx) + `\nimport { computed } from 'vue'\n` + code.slice(idx)
  }

  // No imports found, prepend
  return `import { computed } from 'vue'\n` + code
}

function wrapUseThemeObjectArgs(code) {
  let changed = false
  let i = 0
  while (true) {
    const idx = code.indexOf('useTheme(', i)
    if (idx === -1) break

    // Skip if already useTheme(computed(...))
    const after = code.slice(idx, idx + 40)
    if (/useTheme\(\s*computed\s*\(/.test(after)) {
      i = idx + 8
      continue
    }

    let j = idx + 'useTheme('.length
    // skip whitespace/newlines
    while (j < code.length && /\s/.test(code[j])) j++
    if (code[j] !== '{') {
      i = idx + 8
      continue
    }

    const objStart = j
    // naive brace matching (works for our simple object literals)
    let depth = 0
    let k = objStart
    let inStr = null
    let escape = false
    while (k < code.length) {
      const ch = code[k]
      if (inStr) {
        if (escape) {
          escape = false
        } else if (ch === '\\') {
          escape = true
        } else if (ch === inStr) {
          inStr = null
        }
        k++
        continue
      }
      if (ch === "'" || ch === '"' || ch === '`') {
        inStr = ch
        k++
        continue
      }
      if (ch === '{') depth++
      if (ch === '}') {
        depth--
        if (depth === 0) {
          k++ // include closing brace
          break
        }
      }
      k++
    }
    if (depth !== 0) {
      i = idx + 8
      continue
    }
    const objEnd = k

    // Ensure the object is directly the argument to useTheme(...) (next non-space should be ')')
    let t = objEnd
    while (t < code.length && /\s/.test(code[t])) t++
    if (code[t] !== ')') {
      i = idx + 8
      continue
    }

    const before = code.slice(0, idx + 'useTheme('.length)
    const obj = code.slice(objStart, objEnd)
    const afterRest = code.slice(objEnd)

    code = before + `computed(() => (${obj}))` + afterRest
    changed = true
    i = idx + 8
  }
  return { code, changed }
}

const files = walk(TARGET_ROOT)
let changedFiles = 0
for (const fp of files) {
  const rel = path.relative(ROOT, fp)
  let code = fs.readFileSync(fp, 'utf8')
  const { code: next, changed } = wrapUseThemeObjectArgs(code)
  if (!changed) continue
  code = ensureComputedImport(next)
  if (code !== fs.readFileSync(fp, 'utf8')) {
    fs.writeFileSync(fp, code, 'utf8')
    changedFiles++
    console.log(`updated ${rel}`)
  }
}

console.log(`done. changed files: ${changedFiles}`)

