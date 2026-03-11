import {
  FieldGroup,
  ImageUploadField,
  TextInput,
  ToggleField,
} from './FormControls'

export default function BannerTab({ formData, setSectionField }) {
  return (
    <div className="space-y-8">
      <FieldGroup
        description="Optional CTA area for a book-a-demo banner, campaign panel, or event promo."
        title="Ad Banner / CTA"
      >
        <ToggleField
          checked={formData.banner.enabled}
          description="When enabled, the banner renders beneath the signature body."
          label="Show banner"
          onChange={(value) => setSectionField('banner', 'enabled', value)}
        />

        <ImageUploadField
          description="Recommended width: 300px or the same as your signature width."
          hostedUrl={formData.banner.hostedUrl}
          label="Banner Image"
          onHostedUrlChange={(value) => setSectionField('banner', 'hostedUrl', value)}
          onPreviewChange={(value) => setSectionField('banner', 'previewUrl', value)}
          previewUrl={formData.banner.previewUrl}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <TextInput
            label="Banner Link URL"
            onChange={(value) => setSectionField('banner', 'linkUrl', value)}
            placeholder="https://northstarlabs.co/demo"
            value={formData.banner.linkUrl}
          />
          <TextInput
            label="Banner Alt Text"
            onChange={(value) => setSectionField('banner', 'altText', value)}
            placeholder="Schedule a strategy session"
            value={formData.banner.altText}
          />
        </div>
      </FieldGroup>
    </div>
  )
}
