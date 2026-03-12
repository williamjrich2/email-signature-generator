import { Check } from 'lucide-react'
import {
  getMohawkBannerOption,
  mohawkBannerOptions,
} from '../../config/mohawkBrand'
import { FieldGroup } from './FormControls'

export default function BannerTab({ formData, setSectionField }) {
  const selectedBanner = getMohawkBannerOption(formData.banner.selectedPreset)

  return (
    <div className="space-y-8">
      <FieldGroup
        description="Select a preset footer banner. These are placeholder options until you provide the final Mohawk assets."
        title="CTA Banner"
      >
        <div className="grid gap-4">
          {mohawkBannerOptions.map((option) => {
            const isSelected = option.value === formData.banner.selectedPreset

            return (
              <button
                className={`rounded-[26px] border p-4 text-left transition ${
                  isSelected
                    ? 'border-[#8ea35d]/60 bg-[#8ea35d]/10 shadow-glow'
                    : 'border-app-border bg-app-elevated/60 hover:border-white/15'
                }`}
                key={option.value}
                onClick={() => setSectionField('banner', 'selectedPreset', option.value)}
                type="button"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="font-heading text-lg font-semibold text-app-text">
                        {option.label}
                      </div>
                      {option.tag ? (
                        <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-1 text-[11px] uppercase tracking-[0.18em] text-amber-200">
                          {option.tag}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm text-app-muted">{option.description}</p>
                  </div>
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border ${
                      isSelected
                        ? 'border-[#8ea35d]/50 bg-[#8ea35d] text-black'
                        : 'border-app-border text-app-muted'
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </div>
                </div>

                {option.image ? (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/10">
                    <img
                      alt={option.alt}
                      className="block w-full object-cover"
                      src={option.image}
                    />
                  </div>
                ) : null}
              </button>
            )
          })}
        </div>

        <div className="rounded-[24px] border border-app-border bg-app-elevated/60 p-4">
          <div className="field-label">Selected CTA</div>
          <div className="text-sm font-medium text-app-text">{selectedBanner.label}</div>
          <p className="mt-2 text-xs text-app-muted">
            Swap these presets with final Mohawk-approved banners once you send them.
          </p>
        </div>
      </FieldGroup>
    </div>
  )
}
