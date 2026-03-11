import { ImagePlus, Link2, Upload, X } from 'lucide-react'

function Field({ label, description, required = false, children }) {
  return (
    <label className="block">
      <span className="field-label">
        {label}
        {required ? ' *' : ''}
      </span>
      {children}
      {description ? <p className="mt-2 text-xs text-app-muted">{description}</p> : null}
    </label>
  )
}

export function TextInput({
  label,
  description,
  required,
  value,
  onChange,
  placeholder,
  type = 'text',
}) {
  return (
    <Field description={description} label={label} required={required}>
      <div className="field-shell">
        <input
          className="input-base"
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </div>
    </Field>
  )
}

export function TextAreaInput({
  label,
  description,
  required,
  value,
  onChange,
  placeholder,
  rows = 3,
}) {
  return (
    <Field description={description} label={label} required={required}>
      <div className="field-shell">
        <textarea
          className="input-base resize-none"
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
          value={value}
        />
      </div>
    </Field>
  )
}

export function SelectInput({
  label,
  description,
  required,
  value,
  onChange,
  options,
}) {
  return (
    <Field description={description} label={label} required={required}>
      <div className="field-shell">
        <select
          className="input-base cursor-pointer appearance-none"
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          {options.map((option) => (
            <option className="bg-slate-900 text-white" key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </Field>
  )
}

export function ToggleField({ checked, label, onChange, description }) {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
        checked
          ? 'border-app-accent/50 bg-app-accent/15'
          : 'border-app-border bg-app-elevated/70'
      }`}
      onClick={() => onChange(!checked)}
      type="button"
    >
      <div>
        <div className="text-sm font-medium text-app-text">{label}</div>
        {description ? <div className="mt-1 text-xs text-app-muted">{description}</div> : null}
      </div>
      <div
        className={`relative h-6 w-11 rounded-full transition ${
          checked ? 'bg-app-accent' : 'bg-white/10'
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? 'left-6' : 'left-1'
          }`}
        />
      </div>
    </button>
  )
}

export function ColorInput({ label, value, onChange, description }) {
  return (
    <Field description={description} label={label}>
      <div className="field-shell flex items-center gap-3">
        <input
          className="h-10 w-12 cursor-pointer rounded-xl border border-app-border bg-transparent"
          onChange={(event) => onChange(event.target.value)}
          type="color"
          value={value}
        />
        <div className="flex h-10 flex-1 items-center rounded-xl border border-app-border bg-black/10 px-3">
          <span className="mr-2 inline-block h-3 w-3 rounded-full" style={{ background: value }} />
          <input
            className="input-base"
            onChange={(event) => onChange(event.target.value)}
            value={value}
          />
        </div>
      </div>
    </Field>
  )
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Unable to read file.'))
    reader.readAsDataURL(file)
  })
}

export function ImageUploadField({
  label,
  description,
  previewUrl,
  hostedUrl,
  onPreviewChange,
  onHostedUrlChange,
}) {
  const displayUrl = previewUrl || hostedUrl

  async function handleFileChange(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const dataUrl = await readFileAsDataUrl(file)
    onPreviewChange(String(dataUrl))
  }

  return (
    <div className="space-y-3 rounded-[24px] border border-app-border bg-app-elevated/60 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="field-label mb-1">{label}</div>
          {description ? <p className="text-xs text-app-muted">{description}</p> : null}
        </div>
        {previewUrl ? (
          <button
            className="rounded-xl border border-app-border p-2 text-app-muted transition hover:text-app-text"
            onClick={() => onPreviewChange('')}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <div className="grid gap-3 md:grid-cols-[132px_minmax(0,1fr)]">
        <div className="flex h-32 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-app-border bg-black/10">
          {displayUrl ? (
            <img
              alt={label}
              className="h-full w-full object-cover"
              src={displayUrl}
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-app-muted">
              <ImagePlus className="h-6 w-6" />
              <span className="text-xs">Preview</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <label className="control-button flex cursor-pointer justify-start">
            <Upload className="h-4 w-4" />
            Upload image
            <input
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              type="file"
            />
          </label>

          <div>
            <span className="field-label">Hosted URL</span>
            <div className="field-shell flex items-center gap-2">
              <Link2 className="h-4 w-4 text-app-muted" />
              <input
                className="input-base"
                onChange={(event) => onHostedUrlChange(event.target.value)}
                placeholder="https://cdn.yourbrand.com/signature/logo.png"
                value={hostedUrl}
              />
            </div>
            <p className="mt-2 text-xs text-app-muted">
              Hosted URLs are recommended for best email-client compatibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FieldGroup({ children, title, description }) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="font-heading text-lg font-semibold text-app-text">{title}</h3>
        {description ? <p className="mt-1 text-sm text-app-muted">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}
