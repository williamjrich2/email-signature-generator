import boldBrand from '../templates/boldBrand'
import classic from '../templates/classic'
import creative from '../templates/creative'
import enterprise from '../templates/enterprise'
import executive from '../templates/executive'
import modernMinimal from '../templates/modernMinimal'
import sideBySide from '../templates/sideBySide'
import socialForward from '../templates/socialForward'
import {
  buildAbsoluteAssetUrl,
  ensureHttpUrl,
  getInitials,
  normalizeHexColor,
} from './inlineStyles'
import {
  formatPhoneDisplay,
  getWebsiteDisplay,
  normalizePhoneHref,
} from './phoneFormatter'

export const fontOptions = [
  {
    value: 'helvetica',
    label: 'Helvetica / Arial',
    stack: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  {
    value: 'georgia',
    label: 'Georgia',
    stack: "Georgia, 'Times New Roman', serif",
  },
  {
    value: 'trebuchet',
    label: 'Trebuchet MS',
    stack: "'Trebuchet MS', Helvetica, Arial, sans-serif",
  },
  {
    value: 'verdana',
    label: 'Verdana',
    stack: 'Verdana, Geneva, sans-serif',
  },
]

export const templateOptions = [
  {
    value: 'classic',
    name: 'Classic',
    summary: 'Logo up top, divider line, stacked details.',
    vibe: 'Balanced, safe, proven in Outlook.',
  },
  {
    value: 'modernMinimal',
    name: 'Modern Minimal',
    summary: 'Lean text-first layout with just enough accent.',
    vibe: 'Compact, crisp, startup-friendly.',
  },
  {
    value: 'sideBySide',
    name: 'Side-by-Side',
    summary: 'Left visual, right content in a tight two-column grid.',
    vibe: 'Great for logos or profile shots.',
  },
  {
    value: 'boldBrand',
    name: 'Bold Brand',
    summary: 'Vertical accent bar with strong hierarchy.',
    vibe: 'Statement-making without getting loud.',
  },
  {
    value: 'executive',
    name: 'Executive',
    summary: 'Serif-forward composition with quiet authority.',
    vibe: 'Boardroom, advisory, premium services.',
  },
  {
    value: 'socialForward',
    name: 'Social Forward',
    summary: 'Social row gets a larger role in the layout.',
    vibe: 'Creator, marketing, partnerships.',
  },
  {
    value: 'creative',
    name: 'Creative',
    summary: 'Asymmetry, profile image, and more color.',
    vibe: 'Personal brand with polish.',
  },
  {
    value: 'enterprise',
    name: 'Enterprise',
    summary: 'Dual logos and compliance-friendly structure.',
    vibe: 'Corporate, multi-brand, scalable.',
  },
]

const templateMap = {
  classic,
  modernMinimal,
  sideBySide,
  boldBrand,
  executive,
  socialForward,
  creative,
  enterprise,
}

function getFontStack(value) {
  return (
    fontOptions.find((option) => option.value === value)?.stack ||
    fontOptions[0].stack
  )
}

function resolveAsset(absoluteBaseUrl, previewUrl, hostedUrl, fallbackPath = '') {
  const candidate = hostedUrl || previewUrl || fallbackPath
  return buildAbsoluteAssetUrl(candidate, absoluteBaseUrl)
}

function buildContactRows(formData) {
  const country = formData.contact.phoneCountry || 'US'
  const rows = []

  if (formData.contact.phoneCell) {
    rows.push({
      label: 'C',
      display: formatPhoneDisplay(formData.contact.phoneCell, country),
      href: normalizePhoneHref(formData.contact.phoneCell, country),
    })
  }

  if (formData.contact.phoneOffice) {
    rows.push({
      label: 'O',
      display: `${formatPhoneDisplay(formData.contact.phoneOffice, country)}${
        formData.contact.officeExt ? ` x${formData.contact.officeExt}` : ''
      }`,
      href: normalizePhoneHref(
        formData.contact.phoneOffice,
        country,
        formData.contact.officeExt,
      ),
    })
  }

  if (formData.contact.email) {
    rows.push({
      label: 'E',
      display: formData.contact.email.trim(),
      href: `mailto:${formData.contact.email.trim()}`,
    })
  }

  if (formData.contact.website) {
    rows.push({
      label: 'W',
      display: getWebsiteDisplay(formData.contact.website),
      href: ensureHttpUrl(formData.contact.website),
    })
  }

  return rows
}

function buildAddressLine(location) {
  return [
    location.street,
    location.city,
    location.state,
    location.postalCode,
    location.country,
  ]
    .filter(Boolean)
    .join(', ')
}

export function buildSignatureModel(formData, settings = {}, options = {}) {
  const assetBaseUrl =
    options.assetBaseUrl ||
    (typeof window !== 'undefined' ? window.location.origin : 'https://example.com')

  const width = Number(settings.defaultSignatureWidth || 350)
  const fontFamily = getFontStack(formData.branding.fontPreference)
  const name = `${formData.personal.firstName} ${formData.personal.lastName}`.trim()
  const companyName = formData.personal.companyName.trim()
  const titleLine = [formData.personal.jobTitle, formData.personal.department]
    .filter(Boolean)
    .join(' | ')
  const addressLine = buildAddressLine(formData.location)
  const primaryColor = normalizeHexColor(formData.branding.brandPrimary, '#13161f')
  const accentColor = normalizeHexColor(formData.branding.brandAccent, '#1f6feb')
  const logoSrc = resolveAsset(
    assetBaseUrl,
    formData.branding.logoPreviewUrl,
    formData.branding.logoHostedUrl,
  )
  const secondaryLogoSrc = resolveAsset(
    assetBaseUrl,
    formData.branding.secondaryLogoPreviewUrl,
    formData.branding.secondaryLogoHostedUrl,
  )
  const profileSrc = resolveAsset(
    assetBaseUrl,
    formData.branding.profilePreviewUrl,
    formData.branding.profileHostedUrl,
  )
  const bannerSrc = resolveAsset(
    assetBaseUrl,
    formData.banner.previewUrl,
    formData.banner.hostedUrl,
  )

  const socialItems = Object.entries(formData.social)
    .filter(([, value]) => value.enabled && value.url)
    .map(([network, value]) => ({
      network,
      href: ensureHttpUrl(value.url),
      icon: `${assetBaseUrl}/icons/${network}.png`,
      alt: `${network} icon`,
    }))

  return {
    template: formData.template,
    width,
    name,
    fallbackName: name || 'Your Name',
    initials: getInitials(name || companyName),
    titleLine: titleLine || 'Job Title',
    companyName: companyName || 'Company Name',
    accreditations: formData.personal.accreditations,
    email: formData.contact.email,
    addressLine,
    contactRows: buildContactRows(formData),
    fontFamily,
    socialItems,
    colors: {
      primary: primaryColor,
      accent: accentColor,
      text: '#111827',
      subtle: '#4b5563',
      line: '#d1d5db',
      inverse: '#ffffff',
    },
    assets: {
      logo: {
        src: logoSrc,
        alt: `${companyName || 'Company'} logo`,
      },
      secondaryLogo: {
        src: secondaryLogoSrc,
        alt: `${companyName || 'Company'} division logo`,
      },
      profile: {
        src: profileSrc,
        alt: `${name || 'Profile'} photo`,
      },
      banner: {
        src: bannerSrc,
        href: ensureHttpUrl(formData.banner.linkUrl),
        alt: formData.banner.altText || 'Call to action banner',
        enabled: formData.banner.enabled && Boolean(bannerSrc),
      },
    },
    meta: formData.meta,
  }
}

export default function generateSignatureHtml(formData, settings = {}, options = {}) {
  const model = buildSignatureModel(formData, settings, options)
  const renderTemplate = templateMap[model.template] || classic
  return renderTemplate(model)
}
