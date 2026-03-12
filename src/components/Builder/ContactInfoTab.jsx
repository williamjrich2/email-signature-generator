import { WandSparkles } from 'lucide-react'
import { FieldGroup, TextInput } from './FormControls'

export default function ContactInfoTab({ formData, setSectionField }) {
  return (
    <div className="space-y-8">
      <FieldGroup
        description="Email is auto-suggested from the employee name and can still be edited when needed."
        title="Email and Location"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Email"
            onChange={(value) => setSectionField('contact', 'email', value)}
            placeholder="jordan_bennett@mohawkind.com"
            required
            type="email"
            value={formData.contact.email}
          />
        </div>

        <div className="rounded-[24px] border border-app-border bg-app-elevated/60 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#8ea35d]/15 text-[#b7cc83]">
              <WandSparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="field-label mb-1">Suggested Email</div>
              <div className="break-all text-sm font-medium text-app-text">
                {formData.meta.suggestedEmail}
              </div>
              <button
                className="mt-3 rounded-xl border border-app-border px-3 py-2 text-xs font-medium text-app-muted transition hover:border-white/15 hover:text-app-text"
                onClick={() =>
                  setSectionField('contact', 'email', formData.meta.suggestedEmail)
                }
                type="button"
              >
                Reset to suggested email
              </button>
            </div>
          </div>
        </div>
      </FieldGroup>

      <FieldGroup
        description="Optional address lines for users who need location detail in the signature."
        title="Optional Location"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Address"
            onChange={(value) => setSectionField('location', 'address', value)}
            placeholder="160 S Industrial Blvd"
            value={formData.location.address}
          />
          <TextInput
            label="City"
            onChange={(value) => setSectionField('location', 'city', value)}
            placeholder="Calhoun, GA"
            value={formData.location.city}
          />
        </div>
      </FieldGroup>
    </div>
  )
}
