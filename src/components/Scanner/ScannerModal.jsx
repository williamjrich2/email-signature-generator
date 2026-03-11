import { LoaderCircle, ScanSearch, Upload, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { analyzeSignatureScreenshot } from '../../utils/anthropicApi'
import { TextInput } from '../Builder/FormControls'
import ScannerResults from './ScannerResults'

function fileToPayload(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result || '')
      const [header, base64Image] = result.split(',')
      const inferredType = header?.match(/^data:(.*);base64$/)?.[1] || 'image/png'
      resolve({
        previewUrl: result,
        mediaType: file.type || inferredType,
        base64Image,
      })
    }
    reader.onerror = () => reject(new Error('Unable to read the image file.'))
    reader.readAsDataURL(file)
  })
}

function normalizeTemplateKey(value = '') {
  const normalized = value.trim().toLowerCase().replace(/[\s_-]/g, '')

  return {
    classic: 'classic',
    modernminimal: 'modernMinimal',
    sidebyside: 'sideBySide',
    boldbrand: 'boldBrand',
    executive: 'executive',
    socialforward: 'socialForward',
    creative: 'creative',
    enterprise: 'enterprise',
  }[normalized]
}

export default function ScannerModal({
  apiKey,
  defaultCountry,
  isOpen,
  onApply,
  onClose,
  onSaveApiKey,
}) {
  const [draftApiKey, setDraftApiKey] = useState(apiKey)
  const [imagePayload, setImagePayload] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setDraftApiKey(apiKey)
  }, [apiKey])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    async function handlePaste(event) {
      const file = [...(event.clipboardData?.files || [])][0]

      if (!file || !file.type.startsWith('image/')) {
        return
      }

      event.preventDefault()
      const payload = await fileToPayload(file)
      setImagePayload(payload)
      setResult(null)
      setError('')
    }

    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  async function handleUpload(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const payload = await fileToPayload(file)
    setImagePayload(payload)
    setResult(null)
    setError('')
  }

  async function handleAnalyze() {
    if (!imagePayload) {
      setError('Paste or upload an image first.')
      return
    }

    try {
      setLoading(true)
      setError('')
      onSaveApiKey(draftApiKey)

      const parsed = await analyzeSignatureScreenshot({
        apiKey: draftApiKey,
        mediaType: imagePayload.mediaType,
        base64Image: imagePayload.base64Image,
      })

      setResult({
        ...parsed,
        suggestedTemplate:
          normalizeTemplateKey(parsed.suggestedTemplate) || 'classic',
        notes:
          parsed.notes ||
          `Default formatting region assumed: ${defaultCountry.toUpperCase()}.`,
      })
    } catch (requestError) {
      setError(requestError.message || 'Scanner request failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-md">
      <div className="glass-panel max-h-[92vh] w-full max-w-5xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-app-border px-5 py-4 sm:px-6">
          <div>
            <div className="eyebrow">AI Screenshot Scanner</div>
            <h3 className="mt-3 font-heading text-2xl font-semibold text-app-text">
              Import an existing signature from an image.
            </h3>
          </div>
          <button
            className="rounded-2xl border border-app-border p-3 text-app-muted transition hover:text-app-text"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid max-h-[calc(92vh-88px)] gap-0 overflow-y-auto lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)]">
          <div className="space-y-5 border-b border-app-border p-5 lg:border-b-0 lg:border-r sm:p-6">
            <div className="rounded-[24px] border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-100">
              Prototype-only warning: the Anthropic API key is stored in localStorage
              for this browser so the scanner can run client-side.
            </div>

            <TextInput
              description="Stored locally in this browser only."
              label="Anthropic API Key"
              onChange={setDraftApiKey}
              placeholder="sk-ant-..."
              value={draftApiKey}
            />

            <div className="rounded-[24px] border border-dashed border-app-border bg-app-elevated/60 p-5">
              <div className="flex flex-col items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-app-accent/15 text-app-accent">
                  <ScanSearch className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold text-app-text">
                    Paste or upload a signature screenshot
                  </h4>
                  <p className="mt-2 text-sm text-app-muted">
                    Use <span className="font-medium text-app-text">Cmd/Ctrl + V</span>{' '}
                    while this modal is open, or upload an image below.
                  </p>
                </div>
                <label className="control-button cursor-pointer">
                  <Upload className="h-4 w-4" />
                  Upload screenshot
                  <input
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                    type="file"
                  />
                </label>
              </div>

              {imagePayload ? (
                <div className="mt-5 overflow-hidden rounded-2xl border border-app-border">
                  <img
                    alt="Screenshot preview"
                    className="max-h-[260px] w-full object-contain bg-black/10"
                    src={imagePayload.previewUrl}
                  />
                </div>
              ) : null}
            </div>

            {error ? (
              <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            ) : null}

            <button
              className="control-button control-button-primary w-full justify-center"
              disabled={loading}
              onClick={handleAnalyze}
              type="button"
            >
              {loading ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Analyzing with Claude
                </>
              ) : (
                <>
                  <ScanSearch className="h-4 w-4" />
                  Analyze Screenshot
                </>
              )}
            </button>
          </div>

          <div className="p-5 sm:p-6">
            {result ? (
              <ScannerResults result={result} onApply={() => onApply(result)} />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center rounded-[24px] border border-app-border bg-app-elevated/60 p-8 text-center text-sm text-app-muted">
                Claude results will land here once the screenshot has been analyzed.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
