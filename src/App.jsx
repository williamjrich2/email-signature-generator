import { useDeferredValue, useEffect, useState } from 'react'
import BuilderPanel from './components/Builder/BuilderPanel'
import ExportBar from './components/Export/ExportBar'
import { MOHAWK_SIGNATURE_WIDTH } from './config/mohawkBrand'
import AppShell from './components/Layout/AppShell'
import TopBar from './components/Layout/TopBar'
import PreviewPanel from './components/Preview/PreviewPanel'
import { useDebounce } from './hooks/useDebounce'
import { useFormData } from './hooks/useFormData'
import {
  copyHtmlToClipboard,
  copyRichHtmlToClipboard,
  downloadHtmlFile,
} from './utils/copyToClipboard'
import generateSignatureHtml from './utils/generateSignatureHtml'

const THEME_KEY = 'signature-generator-theme'

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }

    return window.localStorage.getItem(THEME_KEY) || 'dark'
  })
  const [previewBackdrop, setPreviewBackdrop] = useState('light')
  const [toast, setToast] = useState(null)
  const [copyState, setCopyState] = useState('')

  const { formData, resetFormData, setSectionField } = useFormData()

  const debouncedFormData = useDebounce(formData, 120)
  const signatureHtml = generateSignatureHtml(debouncedFormData, {
    defaultSignatureWidth: String(MOHAWK_SIGNATURE_WIDTH),
  })
  const deferredSignatureHtml = useDeferredValue(signatureHtml)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setToast(null), 2600)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  useEffect(() => {
    if (!copyState) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setCopyState(''), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [copyState])

  function showToast(message, tone = 'success') {
    setToast({
      id: Date.now(),
      message,
      tone,
    })
  }

  async function handleCopyHtml() {
    try {
      await copyHtmlToClipboard(signatureHtml)
      setCopyState('html')
      showToast('Inline HTML copied')
    } catch (error) {
      showToast(error.message || 'Unable to copy HTML', 'warning')
    }
  }

  async function handleCopyRichText() {
    try {
      await copyRichHtmlToClipboard(signatureHtml)
      setCopyState('rich')
      showToast('Rich signature copied')
    } catch (error) {
      showToast(error.message || 'Unable to copy rich text', 'warning')
    }
  }

  function handleDownloadHtml() {
    const safeName = `${formData.personal.firstName || 'email'}-${formData.personal.lastName || 'signature'}`
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase()

    downloadHtmlFile(signatureHtml, `${safeName}.html`)
    setCopyState('download')
    showToast('HTML file downloaded')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-app-bg text-app-text">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-12%] h-80 w-80 rounded-full bg-[#8ea35d]/15 blur-3xl" />
        <div className="absolute bottom-[-18%] right-[-8%] h-96 w-96 rounded-full bg-[#2c3440]/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.02)_0%,transparent_60%)]" />
      </div>

      <AppShell
        topBar={<TopBar theme={theme} onThemeChange={setTheme} />}
        builder={
          <BuilderPanel
            formData={formData}
            onReset={resetFormData}
            setSectionField={setSectionField}
          />
        }
        preview={
          <div className="space-y-6">
            <PreviewPanel
              html={deferredSignatureHtml}
              width={String(MOHAWK_SIGNATURE_WIDTH)}
              previewBackdrop={previewBackdrop}
              onBackdropChange={setPreviewBackdrop}
            />
            <ExportBar
              copyState={copyState}
              onCopyHtml={handleCopyHtml}
              onCopyRichText={handleCopyRichText}
              onDownloadHtml={handleDownloadHtml}
            />
          </div>
        }
      />

      {toast ? (
        <div className="pointer-events-none fixed bottom-6 right-6 z-50 animate-fade-in">
          <div
            className={`rounded-2xl border px-4 py-3 text-sm shadow-glow ${
              toast.tone === 'warning'
                ? 'border-amber-400/40 bg-amber-500/15 text-amber-100'
                : 'border-emerald-400/40 bg-emerald-500/15 text-emerald-50'
            }`}
          >
            {toast.message}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
