import { useEffect, useState } from 'react'
import {
  MOHAWK_COMPANY_NAME,
  buildMohawkEmail,
  getMohawkLogoOption,
} from '../config/mohawkBrand'

const STORAGE_KEY = 'mohawk-signature-generator-form-data'

function createDefaultFormData() {
  const firstName = 'Jordan'
  const lastName = 'Bennett'
  const defaultEmail = buildMohawkEmail(firstName, lastName)
  const defaultLogo = getMohawkLogoOption('mohawk')

  return {
    template: 'mohawkEnterprise',
    personal: {
      firstName,
      lastName,
      jobTitle: 'Senior Account Executive',
      companyName: MOHAWK_COMPANY_NAME,
      accreditations: 'IIDA, LEED AP',
    },
    contact: {
      email: defaultEmail,
      emailCustomized: false,
    },
    location: {
      address: '',
      city: '',
    },
    branding: {
      logoVariant: defaultLogo.value,
      brandPrimary: defaultLogo.colors.primary,
      brandAccent: defaultLogo.colors.accent,
      fontPreference: 'helvetica',
    },
    banner: {
      enabled: true,
      selectedPreset: 'workspace',
    },
    meta: {
      suggestedTemplate: 'mohawkEnterprise',
      suggestedEmail: defaultEmail,
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

function loadStoredFormData() {
  if (typeof window === 'undefined') {
    return createDefaultFormData()
  }

  const fallback = createDefaultFormData()
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

export function useFormData() {
  const [formData, setFormData] = useState(() => loadStoredFormData())

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  function setSectionField(section, field, value) {
    setFormData((current) => {
      if (section === 'personal') {
        const nextPersonal = {
          ...current.personal,
          [field]: value,
        }

        const suggestedEmail = buildMohawkEmail(
          nextPersonal.firstName,
          nextPersonal.lastName,
        )

        return {
          ...current,
          personal: nextPersonal,
          contact: {
            ...current.contact,
            email: current.contact.emailCustomized
              ? current.contact.email
              : suggestedEmail,
          },
          meta: {
            ...current.meta,
            suggestedEmail,
          },
        }
      }

      if (section === 'contact' && field === 'email') {
        const suggestedEmail = buildMohawkEmail(
          current.personal.firstName,
          current.personal.lastName,
        )

        return {
          ...current,
          contact: {
            ...current.contact,
            email: value,
            emailCustomized:
              value.trim().toLowerCase() !== suggestedEmail.trim().toLowerCase(),
          },
          meta: {
            ...current.meta,
            suggestedEmail,
          },
        }
      }

      if (section === 'branding' && field === 'logoVariant') {
        const selectedLogo = getMohawkLogoOption(value)

        return {
          ...current,
          branding: {
            ...current.branding,
            logoVariant: value,
            brandPrimary: selectedLogo.colors.primary,
            brandAccent: selectedLogo.colors.accent,
          },
        }
      }

      if (section === 'banner' && field === 'selectedPreset') {
        return {
          ...current,
          banner: {
            ...current.banner,
            selectedPreset: value,
            enabled: value !== 'none',
          },
        }
      }

      return {
        ...current,
        [section]: {
          ...current[section],
          [field]: value,
        },
      }
    })
  }

  function setTemplate(template) {
    setFormData((current) => ({
      ...current,
      template,
    }))
  }

  function resetFormData() {
    setFormData(createDefaultFormData())
  }

  return {
    formData,
    resetFormData,
    setSectionField,
    setTemplate,
  }
}
