import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js'
import { ensureHttpUrl, stripProtocol } from './inlineStyles'

export const countryOptions = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
]

export function formatPhoneInput(value = '', country = 'US') {
  if (!value) {
    return ''
  }

  const formatter = new AsYouType(country)
  return formatter.input(value)
}

export function formatPhoneDisplay(value = '', country = 'US') {
  if (!value) {
    return ''
  }

  const parsed = parsePhoneNumberFromString(value, country)
  return parsed ? parsed.formatInternational() : formatPhoneInput(value, country)
}

export function normalizePhoneHref(value = '', country = 'US', extension = '') {
  if (!value) {
    return ''
  }

  const parsed = parsePhoneNumberFromString(value, country)

  if (parsed) {
    return `tel:${parsed.number}${extension ? `;ext=${extension}` : ''}`
  }

  const fallback = value.replace(/[^\d+]/g, '')
  return fallback ? `tel:${fallback}` : ''
}

export function getWebsiteDisplay(value = '') {
  if (!value) {
    return ''
  }

  return stripProtocol(ensureHttpUrl(value))
}
