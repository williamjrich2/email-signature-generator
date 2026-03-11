import { FieldGroup, TextInput } from './FormControls'

export default function PersonalInfoTab({ formData, setSectionField }) {
  return (
    <div className="space-y-8">
      <FieldGroup
        description="Start with the core identity fields that every template needs."
        title="Personal Info"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="First Name"
            onChange={(value) => setSectionField('personal', 'firstName', value)}
            placeholder="Avery"
            required
            value={formData.personal.firstName}
          />
          <TextInput
            label="Last Name"
            onChange={(value) => setSectionField('personal', 'lastName', value)}
            placeholder="Stone"
            required
            value={formData.personal.lastName}
          />
          <TextInput
            label="Job Title"
            onChange={(value) => setSectionField('personal', 'jobTitle', value)}
            placeholder="Design Director"
            required
            value={formData.personal.jobTitle}
          />
          <TextInput
            label="Department"
            onChange={(value) => setSectionField('personal', 'department', value)}
            placeholder="Growth Studio"
            value={formData.personal.department}
          />
          <TextInput
            label="Company Name"
            onChange={(value) => setSectionField('personal', 'companyName', value)}
            placeholder="Northstar Labs"
            required
            value={formData.personal.companyName}
          />
          <TextInput
            description='Examples: "LEED AP, NCIDQ" or "CPA, CFP".'
            label="Accreditations / Credentials"
            onChange={(value) => setSectionField('personal', 'accreditations', value)}
            placeholder="LEED AP, NCIDQ"
            value={formData.personal.accreditations}
          />
        </div>
      </FieldGroup>
    </div>
  )
}
