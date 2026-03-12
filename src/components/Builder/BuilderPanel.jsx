import { Building2, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import BannerTab from './BannerTab'
import BrandingTab from './BrandingTab'
import ContactInfoTab from './ContactInfoTab'
import PersonalInfoTab from './PersonalInfoTab'

const tabs = [
  { id: 'personal', label: 'Employee' },
  { id: 'contact', label: 'Contact' },
  { id: 'branding', label: 'Brand' },
  { id: 'banner', label: 'CTA' },
]

export default function BuilderPanel({ formData, onReset, setSectionField }) {
  const [activeTab, setActiveTab] = useState('personal')

  function renderActiveTab() {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoTab formData={formData} setSectionField={setSectionField} />
      case 'contact':
        return <ContactInfoTab formData={formData} setSectionField={setSectionField} />
      case 'branding':
        return <BrandingTab formData={formData} setSectionField={setSectionField} />
      case 'banner':
        return <BannerTab formData={formData} setSectionField={setSectionField} />
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
              Generate Mohawk-ready signatures with only the fields people actually need.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-app-muted">
              Name, title, accreditation, email, logo choice, and CTA banner are
              the main controls. The rest is fixed to Mohawk enterprise defaults.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-app-muted sm:flex">
              <Building2 className="h-4 w-4 text-[#8ea35d]" />
              Mohawk Group preset
            </div>
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
