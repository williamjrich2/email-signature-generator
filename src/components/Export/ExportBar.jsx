import { Check, Clipboard, ClipboardPenLine, Download } from 'lucide-react'
import InstructionTooltip from './InstructionTooltip'

function ActionButton({ active, icon, label, onClick, primary = false }) {
  const IconComponent = icon

  return (
    <button
      className={`flex h-full min-h-[54px] items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
        primary
          ? 'border-transparent bg-app-accent text-white shadow-[0_18px_45px_rgba(79,70,229,0.35)] hover:bg-indigo-500'
          : 'border-app-border bg-app-elevated/70 text-app-text hover:border-white/15'
      }`}
      onClick={onClick}
      type="button"
    >
      {active ? <Check className="h-4 w-4" /> : <IconComponent className="h-4 w-4" />}
      {label}
    </button>
  )
}

export default function ExportBar({
  copyState,
  onCopyHtml,
  onCopyRichText,
  onDownloadHtml,
}) {
  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="eyebrow">Export</div>
          <h3 className="mt-3 font-heading text-xl font-semibold text-app-text">
            Copy the signature in the format the email client expects.
          </h3>
          <p className="mt-2 max-w-xl text-sm text-app-muted">
            Rich text copy is the fastest route for most users. Raw HTML is
            available for hosted workflows, QA, or handoff.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <ActionButton
          active={copyState === 'html'}
          icon={Clipboard}
          label="Copy HTML"
          onClick={onCopyHtml}
        />
        <ActionButton
          active={copyState === 'rich'}
          icon={ClipboardPenLine}
          label="Copy as Rich Text"
          onClick={onCopyRichText}
          primary
        />
        <ActionButton
          active={copyState === 'download'}
          icon={Download}
          label="Download HTML"
          onClick={onDownloadHtml}
        />
      </div>

      <div className="mt-4">
        <InstructionTooltip />
      </div>
    </div>
  )
}
