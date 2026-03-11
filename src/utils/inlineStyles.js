function toKebabCase(value) {
  return value.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`)
}

export function styleToString(styles = {}) {
  return Object.entries(styles)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${toKebabCase(key)}:${value}`)
    .join(';')
}

export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function normalizeHexColor(value, fallback = '#1f6feb') {
  if (!value) {
    return fallback
  }

  const normalized = value.trim()

  if (/^#[0-9a-f]{6}$/i.test(normalized)) {
    return normalized
  }

  if (/^#[0-9a-f]{3}$/i.test(normalized)) {
    return normalized
  }

  return fallback
}

export function ensureHttpUrl(value = '') {
  const trimmed = value.trim()

  if (!trimmed) {
    return ''
  }

  if (/^(https?:|mailto:|tel:|data:image|blob:)/i.test(trimmed)) {
    return trimmed
  }

  if (trimmed.startsWith('/')) {
    return trimmed
  }

  return `https://${trimmed.replace(/^\/+/, '')}`
}

export function stripProtocol(value = '') {
  return value.replace(/^https?:\/\//i, '').replace(/\/$/, '')
}

export function getInitials(value = '') {
  const words = value.trim().split(/\s+/).filter(Boolean)
  return words.slice(0, 2).map((word) => word[0]?.toUpperCase() || '').join('') || 'ES'
}

export function buildAbsoluteAssetUrl(value, assetBaseUrl) {
  const normalized = ensureHttpUrl(value)

  if (!normalized) {
    return ''
  }

  if (/^(https?:|data:image|blob:)/i.test(normalized)) {
    return normalized
  }

  if (normalized.startsWith('/') && assetBaseUrl) {
    return `${assetBaseUrl}${normalized}`
  }

  return normalized
}
