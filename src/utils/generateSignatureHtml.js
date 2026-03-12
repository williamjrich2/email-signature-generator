import {
  MOHAWK_COMPANY_NAME,
  MOHAWK_SIGNATURE_WIDTH,
  getMohawkBannerOption,
  getMohawkLogoOption,
} from '../config/mohawkBrand'
import mohawkEnterprise from '../templates/mohawkEnterprise'
import {
  buildAbsoluteAssetUrl,
  getInitials,
  normalizeHexColor,
} from './inlineStyles'

export function buildSignatureModel(formData, settings = {}, options = {}) {
  const assetBaseUrl =
    options.assetBaseUrl ||
    (typeof window !== 'undefined' ? window.location.origin : 'https://example.com')

  const width = Number(settings.defaultSignatureWidth || MOHAWK_SIGNATURE_WIDTH)
  const fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif"
  const selectedLogo = getMohawkLogoOption(formData.branding.logoVariant)
  const selectedBanner = getMohawkBannerOption(formData.banner.selectedPreset)
  const name = `${formData.personal.firstName} ${formData.personal.lastName}`.trim()
  const companyName = formData.personal.companyName.trim() || MOHAWK_COMPANY_NAME
  const addressLines = [formData.location.address, formData.location.city].filter(Boolean)
  const primaryColor = normalizeHexColor(
    selectedLogo.colors.primary || formData.branding.brandPrimary,
    '#1d232c',
  )
  const accentColor = normalizeHexColor(
    selectedLogo.colors.accent || formData.branding.brandAccent,
    '#8ea35d',
  )
  const logoSrc = buildAbsoluteAssetUrl(selectedLogo.image, assetBaseUrl)
  const bannerSrc = selectedBanner.image
    ? buildAbsoluteAssetUrl(selectedBanner.image, assetBaseUrl)
    : ''

  return {
    template: formData.template,
    width,
    name,
    fallbackName: name || 'Your Name',
    initials: getInitials(name || companyName),
    titleLine: formData.personal.jobTitle || 'Job Title',
    companyName,
    accreditations: formData.personal.accreditations,
    addressLines,
    contactRows: formData.contact.email
      ? [
          {
            label: 'E',
            display: formData.contact.email.trim(),
            href: `mailto:${formData.contact.email.trim()}`,
          },
        ]
      : [],
    fontFamily,
    socialItems: [],
    brand: selectedLogo,
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
        alt: selectedLogo.alt,
      },
      banner: {
        src: bannerSrc,
        href: selectedBanner.link,
        alt: selectedBanner.alt || 'Call to action banner',
        enabled: Boolean(bannerSrc) && formData.banner.selectedPreset !== 'none',
      },
    },
    meta: formData.meta,
  }
}

export default function generateSignatureHtml(formData, settings = {}, options = {}) {
  const model = buildSignatureModel(formData, settings, options)
  return mohawkEnterprise(model)
}
