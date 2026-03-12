import { FieldGroup, TextInput } from './FormControls'

export default function PersonalInfoTab({ formData, setSectionField }) {
  return (
    <div className="space-y-8">
      <FieldGroup
        description="This is the only required information most Mohawk users should have to enter."
        title="Employee Details"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="First Name"
            onChange={(value) => setSectionField('personal', 'firstName', value)}
            placeholder="Jordan"
            required
            value={formData.personal.firstName}
          />
          <TextInput
            label="Last Name"
            onChange={(value) => setSectionField('personal', 'lastName', value)}
            placeholder="Bennett"
            required
            value={formData.personal.lastName}
          />
          <TextInput
            label="Title"
            onChange={(value) => setSectionField('personal', 'jobTitle', value)}
            placeholder="Senior Account Executive"
            required
            value={formData.personal.jobTitle}
          />
          <TextInput
            description='Appears inline beside the name, for example "IIDA, LEED AP".'
            label="Accreditations"
            onChange={(value) => setSectionField('personal', 'accreditations', value)}
            placeholder="IIDA, LEED AP"
            value={formData.personal.accreditations}
          />
        </div>

        <div className="rounded-[24px] border border-app-border bg-app-elevated/60 p-4">
          <div className="field-label">Company</div>
          <div className="text-sm font-medium text-app-text">{formData.personal.companyName}</div>
          <p className="mt-2 text-xs text-app-muted">
            Locked to the Mohawk Group enterprise variant.
          </p>
        </div>
      </FieldGroup>
    </div>
  )
}
