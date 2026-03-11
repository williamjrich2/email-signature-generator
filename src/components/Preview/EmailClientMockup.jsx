function buildPreviewDocument(html, backdrop) {
  const background = backdrop === 'dark' ? '#0f172a' : '#f8fafc'

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>
  <body style="margin:0;padding:24px;background:${background};font-family:Arial,sans-serif;">
    ${html}
  </body>
</html>`
}

export default function EmailClientMockup({ html, previewBackdrop }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-app-border bg-app-elevated/80 shadow-[0_35px_90px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between border-b border-app-border bg-black/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-app-muted">
          Signature Preview
        </div>
      </div>

      <div
        className={`subtle-grid p-4 sm:p-6 ${
          previewBackdrop === 'dark'
            ? 'bg-[linear-gradient(180deg,#111827,#0f172a)]'
            : 'bg-[linear-gradient(180deg,#f8fafc,#eef2ff)]'
        }`}
      >
        <div className="rounded-[24px] border border-black/10 bg-white p-0 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
          <iframe
            className="block min-h-[460px] w-full rounded-[24px] bg-white"
            srcDoc={buildPreviewDocument(html, previewBackdrop)}
            title="Email signature preview"
          />
        </div>
      </div>
    </div>
  )
}
