import { Facebook, Instagram, Linkedin, Link2, Radio, Video, Youtube } from 'lucide-react'
import { FieldGroup, ToggleField } from './FormControls'

const socialOptions = [
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'twitter', label: 'X / Twitter', icon: Radio },
  { key: 'facebook', label: 'Facebook', icon: Facebook },
  { key: 'youtube', label: 'YouTube', icon: Youtube },
  { key: 'tiktok', label: 'TikTok', icon: Video },
]

export default function SocialMediaTab({ formData, setSocialField }) {
  return (
    <div className="space-y-8">
      <FieldGroup
        description="Toggle a platform on, then drop in the profile URL. Active links show in the exported HTML."
        title="Social Media"
      >
        <div className="space-y-4">
          {socialOptions.map((item) => {
            const Icon = item.icon
            const network = formData.social[item.key]

            return (
              <div
                className="rounded-[24px] border border-app-border bg-app-elevated/60 p-4"
                key={item.key}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/10">
                      <Icon className="h-4 w-4 text-app-text" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-app-text">{item.label}</div>
                      <div className="text-xs text-app-muted">
                        Add only if you want it visible in the signature.
                      </div>
                    </div>
                  </div>

                  <div className="w-[180px] max-w-full">
                    <ToggleField
                      checked={network.enabled}
                      label={network.enabled ? 'Visible' : 'Hidden'}
                      onChange={(value) => setSocialField(item.key, 'enabled', value)}
                    />
                  </div>
                </div>

                <div className="field-shell flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-app-muted" />
                  <input
                    className="input-base"
                    onChange={(event) => setSocialField(item.key, 'url', event.target.value)}
                    placeholder={`https://${item.key}.com/your-profile`}
                    value={network.url}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </FieldGroup>
    </div>
  )
}
