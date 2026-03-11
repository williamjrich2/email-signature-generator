import { Sparkles } from 'lucide-react'

export default function ScannerResults({ result, onApply }) {
  const socialEntries = Object.entries(result.socialLinks || {}).filter(([, value]) => value)
  const detectedName = [result.firstName, result.lastName].filter(Boolean).join(' ') || 'Unknown contact'
  const templateLabel = (result.suggestedTemplate || 'classic')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (character) => character.toUpperCase())

  return (
    <div className="space-y-4 rounded-[24px] border border-app-border bg-app-elevated/70 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="eyebrow">Parsed Result</div>
          <h4 className="mt-3 font-heading text-lg font-semibold text-app-text">
            {detectedName}
          </h4>
          <p className="mt-1 text-sm text-app-muted">
            {result.title || 'No title detected'}
            {result.company ? ` • ${result.company}` : ''}
          </p>
        </div>
        <button className="control-button control-button-primary" onClick={onApply} type="button">
          <Sparkles className="h-4 w-4" />
          Apply to Builder
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-app-border bg-black/10 p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">
            Key Fields
          </div>
          <dl className="mt-3 space-y-2 text-sm text-app-text">
            <div className="flex justify-between gap-4">
              <dt className="text-app-muted">Email</dt>
              <dd>{result.email || 'Not found'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-app-muted">Cell</dt>
              <dd>{result.phoneCell || 'Not found'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-app-muted">Office</dt>
              <dd>{result.phoneOffice || 'Not found'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-app-muted">Website</dt>
              <dd>{result.website || 'Not found'}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-app-border bg-black/10 p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-app-muted">
            AI Suggestions
          </div>
          <div className="mt-3 space-y-3 text-sm text-app-text">
            <div>
              <div className="text-app-muted">Suggested Template</div>
              <div className="mt-1 font-medium">{templateLabel}</div>
            </div>
            <div>
              <div className="text-app-muted">Brand Colors</div>
              <div className="mt-1 flex gap-2">
                {[result.brandColors?.primary, result.brandColors?.accent]
                  .filter(Boolean)
                  .map((color) => (
                    <span
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1"
                      key={color}
                    >
                      <span
                        className="h-3 w-3 rounded-full border border-black/10"
                        style={{ background: color }}
                      />
                      {color}
                    </span>
                  ))}
              </div>
            </div>
            <div>
              <div className="text-app-muted">Social Links</div>
              <div className="mt-1">
                {socialEntries.length
                  ? socialEntries.map(([key]) => key).join(', ')
                  : 'No social links detected'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {result.notes ? (
        <div className="rounded-2xl border border-app-border bg-black/10 p-4 text-sm text-app-muted">
          {result.notes}
        </div>
      ) : null}
    </div>
  )
}
