export const MOHAWK_COMPANY_NAME = 'Mohawk Group'
export const MOHAWK_EMAIL_DOMAIN = 'mohawkind.com'
export const MOHAWK_SIGNATURE_WIDTH = 350
export const MOHAWK_WEBSITE_URL = 'https://www.mohawkind.com/'

export const mohawkLogoOptions = [
  {
    value: 'mohawk',
    label: 'Mohawk Group',
    description: 'Primary Mohawk Group signature lockup.',
    image: '/mohawk/logos/mohawk-group-logo.png',
    alt: 'Mohawk Group logo',
    width: 154,
    height: 34,
    companyLine: 'Mohawk Group',
    brandLine: 'Commercial Interiors',
    website: MOHAWK_WEBSITE_URL,
    colors: {
      primary: '#1d232c',
      accent: '#8ea35d',
    },
  },
  {
    value: 'durkan',
    label: 'Durkan',
    description: 'Durkan brand signature with Mohawk parent branding.',
    image: '/mohawk/logos/durkan-logo.png',
    alt: 'Durkan logo',
    width: 132,
    height: 34,
    companyLine: 'Durkan',
    brandLine: 'A Mohawk Group Brand',
    website: 'https://www.durkan.com/',
    colors: {
      primary: '#221f1b',
      accent: '#a96d4f',
    },
  },
]

export const mohawkBannerOptions = [
  {
    value: 'none',
    label: 'No Banner',
    description: 'Render the signature without a CTA footer.',
    image: '',
    link: '',
    alt: '',
    tag: '',
  },
  {
    value: 'workspace',
    label: 'Workspace Edit',
    description: 'Placeholder preset for the main Mohawk workspace message.',
    image: '/mohawk/banners/workspace-edit.png',
    link: MOHAWK_WEBSITE_URL,
    alt: 'Explore Mohawk Group workspace solutions',
    tag: 'Placeholder',
  },
  {
    value: 'sustainability',
    label: 'Sustainability Story',
    description: 'Placeholder preset for an ESG or circularity campaign.',
    image: '/mohawk/banners/sustainability-story.png',
    link: `${MOHAWK_WEBSITE_URL}sustainability`,
    alt: 'See Mohawk Group sustainability initiatives',
    tag: 'Placeholder',
  },
  {
    value: 'durkan-collections',
    label: 'Durkan Collections',
    description: 'Placeholder preset for a Durkan-specific CTA.',
    image: '/mohawk/banners/durkan-collections.png',
    link: 'https://www.durkan.com/',
    alt: 'Discover Durkan collections',
    tag: 'Placeholder',
  },
]

export function getMohawkLogoOption(value = 'mohawk') {
  return (
    mohawkLogoOptions.find((option) => option.value === value) || mohawkLogoOptions[0]
  )
}

export function getMohawkBannerOption(value = 'none') {
  return (
    mohawkBannerOptions.find((option) => option.value === value) ||
    mohawkBannerOptions[0]
  )
}

export function buildMohawkEmail(firstName = '', lastName = '') {
  const sanitize = (value) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase()

  const first = sanitize(firstName)
  const last = sanitize(lastName)

  if (!first && !last) {
    return ''
  }

  if (!first || !last) {
    return `${first || last}@${MOHAWK_EMAIL_DOMAIN}`
  }

  return `${first}_${last}@${MOHAWK_EMAIL_DOMAIN}`
}
