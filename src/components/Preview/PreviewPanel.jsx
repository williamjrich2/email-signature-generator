import EmailClientMockup from './EmailClientMockup'

export default function PreviewPanel({
  html,
  width,
  previewBackdrop,
  onBackdropChange,
  hasEmbeddedAssets,
}) {
  return (
    <div className="glass-panel overflow-hidden">
      <div className="border-b border-app-border px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="eyebrow">Live Preview</div>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-app-text">
              Rendered exactly from the exported HTML.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-app-muted">
              Toggle the email-client background to sanity-check contrast before
              you copy the signature into Outlook or Gmail.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-app-border bg-app-elevated/70 p-1">
            {['light', 'dark'].map((mode) => (
              <button
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  previewBackdrop === mode
                    ? 'bg-app-accent text-white shadow-[0_10px_25px_rgba(79,70,229,0.35)]'
                    : 'text-app-muted'
                }`}
                key={mode}
                onClick={() => onBackdropChange(mode)}
                type="button"
              >
                {mode === 'light' ? 'Light mode' : 'Dark mode'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-app-muted">
            Width {width}px
          </div>
          {hasEmbeddedAssets ? (
            <div className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
              Local uploads are embedded for preview. Hosted URLs are safer for
              email clients.
            </div>
          ) : (
            <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
              Asset references are ready as absolute URLs.
            </div>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <EmailClientMockup html={html} previewBackdrop={previewBackdrop} />
      </div>
    </div>
  )
}
