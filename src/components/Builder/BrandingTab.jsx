import { Check } from 'lucide-react'
import { getMohawkLogoOption, mohawkLogoOptions } from '../../config/mohawkBrand'
import { FieldGroup } from './FormControls'

export default function BrandingTab({ formData, setSectionField }) {
  const selectedLogo = getMohawkLogoOption(formData.branding.logoVariant)

  return (
    <div className="space-y-8">
      <FieldGroup
        description="Only the approved Mohawk Group or Durkan lockups are available in this enterprise variant."
        title="Logo Selection"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {mohawkLogoOptions.map((option) => {
            const isSelected = option.value === formData.branding.logoVariant

            return (
              <button
                className={`rounded-[26px] border p-4 text-left transition ${
                  isSelected
                    ? 'border-[#8ea35d]/60 bg-[#8ea35d]/10 shadow-glow'
                    : 'border-app-border bg-app-elevated/60 hover:border-white/15'
                }`}
                key={option.value}
                onClick={() => setSectionField('branding', 'logoVariant', option.value)}
                type="button"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-heading text-lg font-semibold text-app-text">
                      {option.label}
                    </div>
                    <p className="mt-2 text-sm text-app-muted">{option.description}</p>
                  </div>
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-2xl border ${
                      isSelected
                        ? 'border-[#8ea35d]/50 bg-[#8ea35d] text-black'
                        : 'border-app-border text-app-muted'
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white p-4">
                  <img
                    alt={option.alt}
                    className="h-10 w-auto object-contain"
                    src={option.image}
                  />
                </div>
              </button>
            )
          })}
        </div>

        <div className="rounded-[24px] border border-app-border bg-app-elevated/60 p-4">
          <div className="field-label">Locked Enterprise Styling</div>
          <div className="text-sm font-medium text-app-text">
            Helvetica-based type, fixed brand colors, one Outlook-safe layout.
          </div>
          <p className="mt-2 text-xs text-app-muted">
            Current logo: {selectedLogo.label}
          </p>
        </div>
      </FieldGroup>
    </div>
  )
}
