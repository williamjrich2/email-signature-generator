import { RotateCcw, ScanSearch } from 'lucide-react'
import { useState } from 'react'
import BannerTab from './BannerTab'
import BrandingTab from './BrandingTab'
import ContactInfoTab from './ContactInfoTab'
import PersonalInfoTab from './PersonalInfoTab'
import SocialMediaTab from './SocialMediaTab'
import TemplateSelector from './TemplateSelector'

const tabs = [
  { id: 'personal', label: 'Personal' },
  { id: 'contact', label: 'Contact' },
  { id: 'branding', label: 'Branding' },
  { id: 'social', label: 'Social' },
  { id: 'banner', label: 'CTA' },
  { id: 'templates', label: 'Templates' },
]

export default function BuilderPanel({
  formData,
  settings,
  onOpenScanner,
  onReset,
  setSectionField,
  setSocialField,
  setTemplate,
}) {
  const [activeTab, setActiveTab] = useState('personal')

  function renderActiveTab() {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoTab formData={formData} setSectionField={setSectionField} />
      case 'contact':
        return (
          <ContactInfoTab
            formData={formData}
            settings={settings}
            setSectionField={setSectionField}
          />
        )
      case 'branding':
        return <BrandingTab formData={formData} setSectionField={setSectionField} />
      case 'social':
        return <SocialMediaTab formData={formData} setSocialField={setSocialField} />
      case 'banner':
        return <BannerTab formData={formData} setSectionField={setSectionField} />
      case 'templates':
        return (
          <TemplateSelector
            selectedTemplate={formData.template}
            suggestedTemplate={formData.meta.suggestedTemplate}
            onSelectTemplate={setTemplate}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="glass-panel overflow-hidden">
      <div className="border-b border-app-border px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="eyebrow">Builder</div>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-app-text">
              Design the signature, then export production-ready HTML.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-app-muted">
              Every template renders as inline-styled tables. Edit live, import
              from a screenshot, and copy directly into Outlook or Gmail.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="control-button" onClick={onOpenScanner} type="button">
              <ScanSearch className="h-4 w-4" />
              Screenshot Import
            </button>
            <button className="control-button" onClick={onReset} type="button">
              <RotateCcw className="h-4 w-4" />
              Restore Sample
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-app-border px-3 py-3 sm:px-4">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              className={`tab-button whitespace-nowrap ${
                tab.id === activeTab ? 'tab-button-active' : ''
              }`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-6 sm:px-6">
        <div className="animate-fade-in">{renderActiveTab()}</div>
      </div>
    </div>
  )
}
