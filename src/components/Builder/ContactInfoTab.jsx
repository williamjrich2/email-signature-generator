import { ChevronDown } from 'lucide-react'
import { countryOptions, formatPhoneInput } from '../../utils/phoneFormatter'
import { FieldGroup, SelectInput, TextInput } from './FormControls'

export default function ContactInfoTab({ formData, settings, setSectionField }) {
  const activeCountry = formData.contact.phoneCountry || settings.defaultCountry

  function handlePhoneChange(field, value) {
    setSectionField('contact', field, formatPhoneInput(value, activeCountry))
  }

  return (
    <div className="space-y-8">
      <FieldGroup
        description="Use a default country/region for consistent international formatting."
        title="Contact Info"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <SelectInput
            description="Used by the phone formatter and tel links."
            label="Phone Country"
            onChange={(value) => setSectionField('contact', 'phoneCountry', value)}
            options={countryOptions}
            value={activeCountry}
          />
          <TextInput
            label="Email"
            onChange={(value) => setSectionField('contact', 'email', value)}
            placeholder="avery@northstarlabs.co"
            required
            type="email"
            value={formData.contact.email}
          />
          <TextInput
            description="Auto-formatted as you type."
            label="Phone — Cell"
            onChange={(value) => handlePhoneChange('phoneCell', value)}
            placeholder="+1 404 555 0162"
            required
            value={formData.contact.phoneCell}
          />
          <TextInput
            label="Phone — Office"
            onChange={(value) => handlePhoneChange('phoneOffice', value)}
            placeholder="+1 212 555 0147"
            value={formData.contact.phoneOffice}
          />
          <TextInput
            label="Office Extension"
            onChange={(value) => setSectionField('contact', 'officeExt', value)}
            placeholder="204"
            value={formData.contact.officeExt}
          />
          <TextInput
            label="Website URL"
            onChange={(value) => setSectionField('contact', 'website', value)}
            placeholder="northstarlabs.co"
            value={formData.contact.website}
          />
        </div>
      </FieldGroup>

      <FieldGroup
        description="Optional address block for more corporate or regional signatures."
        title="Location"
      >
        <button
          className="flex w-full items-center justify-between rounded-2xl border border-app-border bg-app-elevated/60 px-4 py-3 text-left"
          onClick={() =>
            setSectionField('location', 'expanded', !formData.location.expanded)
          }
          type="button"
        >
          <div>
            <div className="text-sm font-medium text-app-text">Address Fields</div>
            <div className="mt-1 text-xs text-app-muted">
              Collapse when you want a more compact signature.
            </div>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-app-muted transition ${
              formData.location.expanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {formData.location.expanded ? (
          <div className="grid animate-fade-in gap-4 md:grid-cols-2">
            <TextInput
              label="Street"
              onChange={(value) => setSectionField('location', 'street', value)}
              placeholder="145 W 26th St"
              value={formData.location.street}
            />
            <TextInput
              label="City"
              onChange={(value) => setSectionField('location', 'city', value)}
              placeholder="New York"
              value={formData.location.city}
            />
            <TextInput
              label="State / Province"
              onChange={(value) => setSectionField('location', 'state', value)}
              placeholder="NY"
              value={formData.location.state}
            />
            <TextInput
              label="Postal Code"
              onChange={(value) => setSectionField('location', 'postalCode', value)}
              placeholder="10001"
              value={formData.location.postalCode}
            />
            <TextInput
              label="Country"
              onChange={(value) => setSectionField('location', 'country', value)}
              placeholder="United States"
              value={formData.location.country}
            />
          </div>
        ) : null}
      </FieldGroup>
    </div>
  )
}
