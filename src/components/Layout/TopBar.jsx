import { MoonStar, ScanSearch, Settings2, Sparkles, SunMedium } from 'lucide-react'

export default function TopBar({
  theme,
  onThemeChange,
  onOpenSettings,
  onOpenScanner,
}) {
  const isDark = theme === 'dark'

  return (
    <header className="glass-panel subtle-grid flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-[0_14px_35px_rgba(99,102,241,0.35)]">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="eyebrow">Premium Utility Prototype</div>
          <h1 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-app-text">
            Email Signature Generator
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-app-muted">
            Table-based, Outlook-safe HTML signatures with live preview, rich
            clipboard export, and screenshot-to-form AI import.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          className="control-button control-button-primary"
          onClick={onOpenScanner}
          type="button"
        >
          <ScanSearch className="h-4 w-4" />
          Import from Screenshot
        </button>
        <button
          className="control-button"
          onClick={() => onThemeChange(isDark ? 'light' : 'dark')}
          type="button"
        >
          {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          {isDark ? 'Light UI' : 'Dark UI'}
        </button>
        <button
          aria-label="Open settings"
          className="control-button px-3"
          onClick={onOpenSettings}
          type="button"
        >
          <Settings2 className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
