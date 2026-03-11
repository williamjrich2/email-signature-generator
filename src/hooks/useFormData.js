import { startTransition, useEffect, useState } from 'react'

const STORAGE_KEY = 'signature-generator-form-data'

const scannerTemplateMap = {
  classic: 'classic',
  modernminimal: 'modernMinimal',
  sidebyside: 'sideBySide',
  boldbrand: 'boldBrand',
  executive: 'executive',
  socialforward: 'socialForward',
  creative: 'creative',
  enterprise: 'enterprise',
}

function normalizeScannerTemplate(value = '') {
  const normalized = value.toLowerCase().replace(/[\s_-]/g, '')
  return scannerTemplateMap[normalized] || 'classic'
}

function createDefaultFormData(defaultCountry = 'US') {
  return {
    template: 'sideBySide',
    personal: {
      firstName: 'Avery',
      lastName: 'Stone',
      jobTitle: 'Design Director',
      department: 'Growth Studio',
      companyName: 'Northstar Labs',
      accreditations: 'LEED AP, NCIDQ',
    },
    contact: {
      email: 'avery@northstarlabs.co',
      phoneCountry: defaultCountry,
      phoneCell: '+1 404 555 0162',
      phoneOffice: '+1 212 555 0147',
      officeExt: '204',
      website: 'northstarlabs.co',
    },
    location: {
      street: '145 W 26th St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
      expanded: false,
    },
    branding: {
      logoHostedUrl: '/sample-logo.png',
      logoPreviewUrl: '',
      secondaryLogoHostedUrl: '/sample-secondary-logo.png',
      secondaryLogoPreviewUrl: '',
      profileHostedUrl: '/sample-profile.png',
      profilePreviewUrl: '',
      brandPrimary: '#13161f',
      brandAccent: '#1f6feb',
      fontPreference: 'helvetica',
    },
    social: {
      linkedin: { enabled: true, url: 'linkedin.com/in/avery-stone' },
      instagram: { enabled: false, url: '' },
      twitter: { enabled: false, url: '' },
      facebook: { enabled: false, url: '' },
      youtube: { enabled: false, url: '' },
      tiktok: { enabled: false, url: '' },
    },
    banner: {
      enabled: true,
      hostedUrl: '/sample-banner.png',
      previewUrl: '',
      linkUrl: 'https://northstarlabs.co/demo',
      altText: 'Schedule a strategy session',
    },
    meta: {
      suggestedTemplate: 'sideBySide',
      logoDescription: '',
      notes: '',
    },
  }
}

function deepMerge(base, override) {
  if (!override || typeof override !== 'object' || Array.isArray(override)) {
    return base
  }

  return Object.entries(base).reduce((accumulator, [key, value]) => {
    const nextValue = override[key]

    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      nextValue &&
      typeof nextValue === 'object' &&
      !Array.isArray(nextValue)
    ) {
      accumulator[key] = deepMerge(value, nextValue)
      return accumulator
    }

    accumulator[key] = nextValue ?? value
    return accumulator
  }, {})
}

function loadStoredFormData(defaultCountry) {
  if (typeof window === 'undefined') {
    return createDefaultFormData(defaultCountry)
  }

  const fallback = createDefaultFormData(defaultCountry)
  const rawValue = window.localStorage.getItem(STORAGE_KEY)

  if (!rawValue) {
    return fallback
  }

  try {
    const parsed = JSON.parse(rawValue)
    return deepMerge(fallback, parsed)
  } catch {
    return fallback
  }
}

function splitName(value = '') {
  const tokens = value.trim().split(/\s+/).filter(Boolean)

  if (tokens.length < 2) {
    return {
      firstName: tokens[0] || '',
      lastName: '',
    }
  }

  return {
    firstName: tokens[0],
    lastName: tokens.slice(1).join(' '),
  }
}

export function useFormData(defaultCountry = 'US') {
  const [formData, setFormData] = useState(() => loadStoredFormData(defaultCountry))

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  function setSectionField(section, field, value) {
    setFormData((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }))
  }

  function setSocialField(network, field, value) {
    setFormData((current) => ({
      ...current,
      social: {
        ...current.social,
        [network]: {
          ...current.social[network],
          [field]: value,
        },
      },
    }))
  }

  function setTemplate(template) {
    setFormData((current) => ({
      ...current,
      template,
    }))
  }

  function resetFormData() {
    setFormData(createDefaultFormData(defaultCountry))
  }

  function applyScannerData(scannerData) {
    startTransition(() => {
      setFormData((current) => {
        const inferredName = splitName(
          `${scannerData.firstName || ''} ${scannerData.lastName || ''}`.trim(),
        )

        return {
          ...current,
          template: scannerData.suggestedTemplate
            ? normalizeScannerTemplate(scannerData.suggestedTemplate)
            : current.template,
          personal: {
            ...current.personal,
            firstName: scannerData.firstName || inferredName.firstName || current.personal.firstName,
            lastName: scannerData.lastName || inferredName.lastName || current.personal.lastName,
            jobTitle: scannerData.title || current.personal.jobTitle,
            department: scannerData.department || current.personal.department,
            companyName: scannerData.company || current.personal.companyName,
            accreditations:
              scannerData.accreditations || current.personal.accreditations,
          },
          contact: {
            ...current.contact,
            email: scannerData.email || current.contact.email,
            phoneCell: scannerData.phoneCell || current.contact.phoneCell,
            phoneOffice: scannerData.phoneOffice || current.contact.phoneOffice,
            officeExt: scannerData.officeExt || current.contact.officeExt,
            website: scannerData.website || current.contact.website,
          },
          location: {
            ...current.location,
            street: scannerData.address?.street || current.location.street,
            city: scannerData.address?.city || current.location.city,
            state: scannerData.address?.state || current.location.state,
            postalCode:
              scannerData.address?.postalCode || current.location.postalCode,
            country: scannerData.address?.country || current.location.country,
          },
          branding: {
            ...current.branding,
            brandPrimary:
              scannerData.brandColors?.primary || current.branding.brandPrimary,
            brandAccent:
              scannerData.brandColors?.accent || current.branding.brandAccent,
          },
          social: {
            linkedin: {
              enabled: Boolean(scannerData.socialLinks?.linkedin),
              url: scannerData.socialLinks?.linkedin || current.social.linkedin.url,
            },
            instagram: {
              enabled: Boolean(scannerData.socialLinks?.instagram),
              url:
                scannerData.socialLinks?.instagram || current.social.instagram.url,
            },
            twitter: {
              enabled: Boolean(scannerData.socialLinks?.twitter),
              url: scannerData.socialLinks?.twitter || current.social.twitter.url,
            },
            facebook: {
              enabled: Boolean(scannerData.socialLinks?.facebook),
              url:
                scannerData.socialLinks?.facebook || current.social.facebook.url,
            },
            youtube: {
              enabled: Boolean(scannerData.socialLinks?.youtube),
              url: scannerData.socialLinks?.youtube || current.social.youtube.url,
            },
            tiktok: {
              enabled: Boolean(scannerData.socialLinks?.tiktok),
              url: scannerData.socialLinks?.tiktok || current.social.tiktok.url,
            },
          },
          meta: {
            suggestedTemplate: scannerData.suggestedTemplate
              ? normalizeScannerTemplate(scannerData.suggestedTemplate)
              : current.meta.suggestedTemplate,
            logoDescription:
              scannerData.logoDescription || current.meta.logoDescription,
            notes: scannerData.notes || current.meta.notes,
          },
        }
      })
    })
  }

  return {
    formData,
    resetFormData,
    setSectionField,
    setSocialField,
    setTemplate,
    applyScannerData,
  }
}
