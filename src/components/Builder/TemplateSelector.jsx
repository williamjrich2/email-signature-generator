import { Check, Sparkles } from 'lucide-react'
import { templateOptions } from '../../utils/generateSignatureHtml'

function TemplateThumbnail({ option }) {
  const accent = {
    classic: 'bg-slate-100',
    modernMinimal: 'bg-zinc-100',
    sideBySide: 'bg-sky-100',
    boldBrand: 'bg-indigo-100',
    executive: 'bg-amber-100',
    socialForward: 'bg-emerald-100',
    creative: 'bg-rose-100',
    enterprise: 'bg-slate-200',
  }[option.value]

  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
      <div className="flex h-28 items-stretch gap-2 rounded-xl bg-white p-3">
        {option.value === 'sideBySide' || option.value === 'creative' ? (
          <div className={`w-16 rounded-xl ${accent}`} />
        ) : option.value === 'boldBrand' ? (
          <div className="w-2 rounded-full bg-indigo-500" />
        ) : null}

        <div className="flex-1 space-y-2">
          <div className={`h-3 w-2/3 rounded-full ${accent}`} />
          <div className="h-2 w-1/2 rounded-full bg-slate-200" />
          <div className="h-2 w-5/6 rounded-full bg-slate-200" />
          <div className="h-2 w-4/6 rounded-full bg-slate-200" />
          <div className="pt-2">
            <div className="flex gap-1.5">
              <span className={`h-5 w-5 rounded-full ${accent}`} />
              <span className={`h-5 w-5 rounded-full ${accent}`} />
              <span className={`h-5 w-5 rounded-full ${accent}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TemplateSelector({
  selectedTemplate,
  suggestedTemplate,
  onSelectTemplate,
}) {
  return (
    <div className="space-y-6">
      <div>
        <div className="eyebrow">Layouts</div>
        <h3 className="mt-3 font-heading text-xl font-semibold text-app-text">
          Pick the structure first, then fine-tune the details.
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-app-muted">
          Every template stays within a signature-safe width and exports as inline
          table markup. The live preview uses the exact same generated HTML.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {templateOptions.map((option) => {
          const isSelected = option.value === selectedTemplate
          const isSuggested = option.value === suggestedTemplate

          return (
            <button
              className={`group rounded-[28px] border p-4 text-left transition duration-200 ${
                isSelected
                  ? 'border-app-accent/60 bg-app-accent/10 shadow-glow'
                  : 'border-app-border bg-app-elevated/60 hover:-translate-y-0.5 hover:border-white/15'
              }`}
              key={option.value}
              onClick={() => onSelectTemplate(option.value)}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading text-lg font-semibold text-app-text">
                      {option.name}
                    </h4>
                    {isSuggested ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-200">
                        <Sparkles className="h-3 w-3" />
                        AI Match
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-app-muted">{option.summary}</p>
                </div>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-2xl border ${
                    isSelected
                      ? 'border-app-accent/50 bg-app-accent text-white'
                      : 'border-app-border text-app-muted'
                  }`}
                >
                  <Check className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-4 transition duration-200 group-hover:scale-[1.01]">
                <TemplateThumbnail option={option} />
              </div>

              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-app-muted">
                {option.vibe}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
