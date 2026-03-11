import { ShieldAlert, X } from 'lucide-react'
import { countryOptions } from '../../utils/phoneFormatter'
import { SelectInput, TextInput } from '../Builder/FormControls'

const widthOptions = [
  { value: '300', label: '300px' },
  { value: '350', label: '350px' },
  { value: '400', label: '400px' },
]

export default function SettingsPanel({
  isOpen,
  settings,
  onClose,
  onChangeField,
}) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="h-full w-full max-w-xl border-l border-app-border bg-[#0f1013] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between border-b border-app-border px-5 py-4 sm:px-6">
          <div>
            <div className="eyebrow">Settings</div>
            <h3 className="mt-3 font-heading text-2xl font-semibold text-app-text">
              Prototype Configuration
            </h3>
          </div>
          <button
            className="rounded-2xl border border-app-border p-3 text-app-muted transition hover:text-app-text"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto px-5 py-6 sm:px-6">
          <div className="rounded-[24px] border border-amber-400/30 bg-amber-500/10 p-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-5 w-5 text-amber-200" />
              <p className="text-sm text-amber-100">
                The Anthropic API key is stored in browser localStorage for this
                prototype. Move the scanner behind a server endpoint before launch.
              </p>
            </div>
          </div>

          <TextInput
            description="Used by the screenshot importer."
            label="Anthropic API Key"
            onChange={(value) => onChangeField('anthropicApiKey', value)}
            placeholder="sk-ant-..."
            value={settings.anthropicApiKey}
          />

          <SelectInput
            description="Controls the exported signature width."
            label="Default Signature Width"
            onChange={(value) => onChangeField('defaultSignatureWidth', value)}
            options={widthOptions}
            value={settings.defaultSignatureWidth}
          />

          <SelectInput
            description="Used for initial phone number formatting."
            label="Default Country"
            onChange={(value) => onChangeField('defaultCountry', value)}
            options={countryOptions}
            value={settings.defaultCountry}
          />
        </div>
      </div>
    </div>
  )
}
