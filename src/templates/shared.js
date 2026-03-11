import { escapeHtml, styleToString } from '../utils/inlineStyles'

export function spacer(height = 12) {
  return `<span style="margin:0;padding:0;font-size:1px;line-height:${height}px;">&nbsp;</span><br>`
}

export function wrapTable(width, rows, extraStyle = '') {
  return `<table cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;width:${width}px;max-width:${width}px;line-height:100% !important;background-color:rgba(255,255,255,0);${extraStyle}">${rows}</table>`
}

export function row(content, style = '', align = 'left') {
  return `<tr><td valign="top" align="${align}" style="vertical-align:top;${style}">${content}</td></tr>`
}

export function textLine(
  value,
  {
    color = '#111827',
    fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize = 12,
    lineHeight = 16,
    fontWeight = '400',
    fontStyle = 'normal',
    letterSpacing = '0',
    textTransform = 'none',
  } = {},
) {
  if (!value) {
    return ''
  }

  return `<span style="margin:0;padding:0;color:${color};font-family:${fontFamily};font-size:${fontSize}px;line-height:${lineHeight}px;font-weight:${fontWeight};font-style:${fontStyle};letter-spacing:${letterSpacing};text-transform:${textTransform};">${escapeHtml(value)}</span><br>`
}

export function renderLinkLine(
  item,
  {
    fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif",
    color = '#111827',
    fontSize = 12,
    lineHeight = 16,
    labelColor = '#6b7280',
  } = {},
) {
  if (!item?.href || !item?.display) {
    return ''
  }

  return `<span style="font-family:${fontFamily};font-size:${fontSize}px;line-height:${lineHeight}px;color:${color};"><span style="color:${labelColor};font-weight:700;">${escapeHtml(item.label)}:</span> <a href="${escapeHtml(
    item.href,
  )}" target="_blank" style="color:${color};text-decoration:none;">${escapeHtml(
    item.display,
  )}</a></span><br>`
}

export function renderDivider(color = '#d1d5db') {
  return row(`${spacer(10)}`, `border-top:1px solid ${color};`)
}

export function renderBadge(initials, backgroundColor, size = 42, radius = 10) {
  return `<table cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;"><tr><td align="center" valign="middle" style="width:${size}px;height:${size}px;background-color:${backgroundColor};border-radius:${radius}px;"><span style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;color:#ffffff;font-size:${Math.max(
    12,
    Math.floor(size / 2.4),
  )}px;line-height:${size}px;font-weight:700;letter-spacing:0.08em;">${escapeHtml(
    initials,
  )}</span></td></tr></table>`
}

export function renderImageOrBadge(
  asset,
  {
    initials = 'ES',
    backgroundColor = '#111827',
    size = 42,
    radius = 10,
    href = '',
    alt = 'Image',
  } = {},
) {
  if (!asset?.src) {
    return renderBadge(initials, backgroundColor, size, radius)
  }

  const imageTag = `<img src="${escapeHtml(asset.src)}" alt="${escapeHtml(
    asset.alt || alt,
  )}" width="${size}" height="${size}" style="${styleToString({
    display: 'block',
    width: `${size}px`,
    height: `${size}px`,
    border: '0',
    borderRadius: `${radius}px`,
  })}">`

  if (!href) {
    return imageTag
  }

  return `<a href="${escapeHtml(href)}" target="_blank" style="display:block;text-decoration:none;border:0;">${imageTag}</a>`
}

export function renderDualLogos(model, size = 34) {
  const websiteHref =
    model.contactRows.find((item) => item.label === 'W')?.href || ''

  return `<table cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;"><tr><td valign="top" style="vertical-align:top;">${renderImageOrBadge(
    model.assets.logo,
    {
      initials: model.initials,
      backgroundColor: model.colors.primary,
      size,
      radius: 10,
      href: websiteHref,
      alt: model.assets.logo.alt,
    },
  )}</td><td style="width:8px;">${spacer(1)}</td><td valign="top" style="vertical-align:top;">${renderImageOrBadge(
    model.assets.secondaryLogo,
    {
      initials: model.companyName.slice(0, 2).toUpperCase(),
      backgroundColor: model.colors.accent,
      size,
      radius: 10,
      href: websiteHref,
      alt: model.assets.secondaryLogo.alt,
    },
  )}</td></tr></table>`
}

export function renderIdentity(model, options = {}) {
  const {
    nameSize = 16,
    nameColor = model.colors.primary,
    titleColor = '#4b5563',
    companyColor = '#111827',
    nameFontFamily = model.fontFamily,
    copyFontFamily = model.fontFamily,
    italicTitle = false,
    uppercaseName = false,
    compact = false,
  } = options

  return [
    textLine(model.fallbackName, {
      color: nameColor,
      fontFamily: nameFontFamily,
      fontSize: nameSize,
      lineHeight: nameSize + 4,
      fontWeight: '700',
      letterSpacing: uppercaseName ? '0.08em' : '0',
      textTransform: uppercaseName ? 'uppercase' : 'none',
    }),
    textLine(model.titleLine, {
      color: titleColor,
      fontFamily: copyFontFamily,
      fontSize: compact ? 11 : 12,
      lineHeight: compact ? 15 : 16,
      fontWeight: '400',
      fontStyle: italicTitle ? 'italic' : 'normal',
    }),
    textLine(model.companyName, {
      color: companyColor,
      fontFamily: copyFontFamily,
      fontSize: compact ? 11 : 12,
      lineHeight: compact ? 15 : 16,
      fontWeight: '500',
    }),
    model.accreditations
      ? textLine(model.accreditations, {
          color: titleColor,
          fontFamily: copyFontFamily,
          fontSize: 11,
          lineHeight: 15,
          fontWeight: '400',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        })
      : '',
  ].join('')
}

export function renderContactRows(model, options = {}) {
  const {
    color = '#111827',
    labelColor = model.colors.accent,
    fontSize = 12,
    lineHeight = 16,
  } = options

  return model.contactRows
    .map((item) =>
      renderLinkLine(item, {
        fontFamily: model.fontFamily,
        color,
        fontSize,
        lineHeight,
        labelColor,
      }),
    )
    .join('')
}

export function renderAddressLine(model, options = {}) {
  if (!model.addressLine) {
    return ''
  }

  return textLine(model.addressLine, {
    color: options.color || '#6b7280',
    fontFamily: model.fontFamily,
    fontSize: options.fontSize || 11,
    lineHeight: options.lineHeight || 15,
  })
}

export function renderSocialRow(model, options = {}) {
  if (!model.socialItems.length) {
    return ''
  }

  const iconSize = options.iconSize || 20
  const gap = options.gap || 8

  const cells = model.socialItems
    .map(
      (item, index) =>
        `<td valign="middle" style="vertical-align:middle;${
          index < model.socialItems.length - 1 ? `padding-right:${gap}px;` : ''
        }"><a href="${escapeHtml(
          item.href,
        )}" target="_blank" style="display:block;text-decoration:none;border:0;"><img src="${escapeHtml(
          item.icon,
        )}" alt="${escapeHtml(
          item.alt,
        )}" width="${iconSize}" height="${iconSize}" style="display:block;width:${iconSize}px;height:${iconSize}px;border:0;"></a></td>`,
    )
    .join('')

  return `<table cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;"><tr>${cells}</tr></table>`
}

export function renderBanner(model) {
  if (!model.assets.banner.enabled || !model.assets.banner.src || !model.assets.banner.href) {
    return ''
  }

  return `<a href="${escapeHtml(
    model.assets.banner.href,
  )}" target="_blank" style="display:block;text-decoration:none;border:0;"><img src="${escapeHtml(
    model.assets.banner.src,
  )}" alt="${escapeHtml(
    model.assets.banner.alt,
  )}" width="${model.width}" height="88" style="display:block;width:${model.width}px;height:auto;border:0;"></a>`
}

export function renderButtonishLink(model, text) {
  const url = model.assets.banner.href || model.contactRows.find((item) => item.label === 'W')?.href

  if (!url) {
    return ''
  }

  return `<table cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;"><tr><td bgcolor="${model.colors.accent}" style="background-color:${model.colors.accent};border-radius:999px;padding:8px 14px;"><a href="${escapeHtml(
    url,
  )}" target="_blank" style="font-family:${model.fontFamily};font-size:11px;line-height:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#ffffff;text-decoration:none;">${escapeHtml(
    text,
  )}</a></td></tr></table>`
}
