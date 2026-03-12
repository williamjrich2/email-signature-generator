import { Building2, MoonStar, ShieldCheck, SunMedium } from 'lucide-react'

export default function TopBar({ theme, onThemeChange }) {
  const isDark = theme === 'dark'

  return (
    <header className="glass-panel subtle-grid flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8ea35d] via-[#71814a] to-[#2c3440] shadow-[0_14px_35px_rgba(44,52,64,0.35)]">
          <Building2 className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="eyebrow">Enterprise Variant</div>
          <h1 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-app-text">
            Mohawk Group Signature Builder
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-app-muted">
            Preloaded Mohawk branding, reduced inputs, and Outlook-safe export for
            internal signature generation on desktop and mobile.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-app-muted sm:flex">
          <ShieldCheck className="h-4 w-4 text-[#8ea35d]" />
          Fixed brand controls
        </div>
        <button
          className="control-button w-full sm:w-auto"
          onClick={() => onThemeChange(isDark ? 'light' : 'dark')}
          type="button"
        >
          {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          {isDark ? 'Light UI' : 'Dark UI'}
        </button>
      </div>
    </header>
  )
}
