import { fontOptions } from '../../utils/generateSignatureHtml'
import {
  ColorInput,
  FieldGroup,
  ImageUploadField,
  SelectInput,
} from './FormControls'

export default function BrandingTab({ formData, setSectionField }) {
  return (
    <div className="space-y-8">
      <FieldGroup
        description="These fields affect template accents and exported email-safe typography."
        title="Brand Controls"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ColorInput
            description="Used for dividers, highlights, and some monogram fallbacks."
            label="Primary Color"
            onChange={(value) => setSectionField('branding', 'brandPrimary', value)}
            value={formData.branding.brandPrimary}
          />
          <ColorInput
            description="Used for icons, accents, and CTA emphasis."
            label="Accent Color"
            onChange={(value) => setSectionField('branding', 'brandAccent', value)}
            value={formData.branding.brandAccent}
          />
          <SelectInput
            description="Only web-safe fonts are used in exported HTML."
            label="Signature Font"
            onChange={(value) => setSectionField('branding', 'fontPreference', value)}
            options={fontOptions.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            value={formData.branding.fontPreference}
          />
        </div>
      </FieldGroup>

      <FieldGroup
        description="Upload locally for preview, then add a hosted URL for the most reliable final export."
        title="Images"
      >
        <div className="space-y-4">
          <ImageUploadField
            description="Recommended: 84×84 or larger transparent PNG."
            hostedUrl={formData.branding.logoHostedUrl}
            label="Company Logo"
            onHostedUrlChange={(value) =>
              setSectionField('branding', 'logoHostedUrl', value)
            }
            onPreviewChange={(value) =>
              setSectionField('branding', 'logoPreviewUrl', value)
            }
            previewUrl={formData.branding.logoPreviewUrl}
          />
          <ImageUploadField
            description="Only shown by the Enterprise template."
            hostedUrl={formData.branding.secondaryLogoHostedUrl}
            label="Secondary / Division Logo"
            onHostedUrlChange={(value) =>
              setSectionField('branding', 'secondaryLogoHostedUrl', value)
            }
            onPreviewChange={(value) =>
              setSectionField('branding', 'secondaryLogoPreviewUrl', value)
            }
            previewUrl={formData.branding.secondaryLogoPreviewUrl}
          />
          <ImageUploadField
            description="Used by Side-by-Side and Creative. Rendered as a circular crop."
            hostedUrl={formData.branding.profileHostedUrl}
            label="Profile Photo"
            onHostedUrlChange={(value) =>
              setSectionField('branding', 'profileHostedUrl', value)
            }
            onPreviewChange={(value) =>
              setSectionField('branding', 'profilePreviewUrl', value)
            }
            previewUrl={formData.branding.profilePreviewUrl}
          />
        </div>
      </FieldGroup>
    </div>
  )
}
