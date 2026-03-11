function htmlToPlainText(html) {
  const element = document.createElement('div')
  element.innerHTML = html
  return (element.textContent || element.innerText || '').trim()
}

function fallbackCopyFromSelection(html) {
  const container = document.createElement('div')
  container.innerHTML = html
  container.contentEditable = 'true'
  container.style.position = 'fixed'
  container.style.left = '-9999px'
  container.style.top = '0'

  document.body.appendChild(container)

  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(container)
  selection?.removeAllRanges()
  selection?.addRange(range)

  const copied = document.execCommand('copy')
  selection?.removeAllRanges()
  document.body.removeChild(container)

  if (!copied) {
    throw new Error('Clipboard access is not available in this browser.')
  }
}

export async function copyHtmlToClipboard(html) {
  await navigator.clipboard.writeText(html)
}

export async function copyRichHtmlToClipboard(html) {
  const plainText = htmlToPlainText(html)

  if (window.ClipboardItem && navigator.clipboard?.write) {
    const item = new window.ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([plainText], { type: 'text/plain' }),
    })

    await navigator.clipboard.write([item])
    return
  }

  fallbackCopyFromSelection(html)
}

export function downloadHtmlFile(html, fileName = 'signature.html') {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const blobUrl = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = blobUrl
  anchor.download = fileName
  anchor.click()

  URL.revokeObjectURL(blobUrl)
}
