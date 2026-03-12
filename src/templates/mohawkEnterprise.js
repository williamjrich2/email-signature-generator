import { escapeHtml } from '../utils/inlineStyles'
import { renderBanner, renderLinkLine, row, spacer, textLine, wrapTable } from './shared'

function renderLogo(model) {
  return `<a href="${escapeHtml(
    model.brand.website,
  )}" target="_blank" style="display:block;text-decoration:none;border:0;"><img src="${escapeHtml(
    model.assets.logo.src,
  )}" alt="${escapeHtml(model.assets.logo.alt)}" width="${model.brand.width}" height="${
    model.brand.height
  }" style="display:block;width:${model.brand.width}px;height:auto;border:0;"></a>`
}

function renderNameLine(model) {
  const nameMarkup = `<span style="margin:0;padding:0;color:${model.colors.primary};font-family:${model.fontFamily};font-size:16px;line-height:20px;font-weight:700;">${escapeHtml(
    model.fallbackName,
  )}</span>`

  if (!model.accreditations) {
    return `${nameMarkup}<br>`
  }

  return `${nameMarkup}<span style="margin:0;padding:0;color:${model.colors.subtle};font-family:${model.fontFamily};font-size:12px;line-height:20px;font-weight:400;">, ${escapeHtml(
    model.accreditations,
  )}</span><br>`
}

function renderAddressLines(model) {
  return model.addressLines
    .map((line) =>
      textLine(line, {
        color: model.colors.subtle,
        fontFamily: model.fontFamily,
        fontSize: 11,
        lineHeight: 15,
      }),
    )
    .join('')
}

export default function mohawkEnterprise(model) {
  const emailRow = model.contactRows[0]
    ? renderLinkLine(model.contactRows[0], {
        fontFamily: model.fontFamily,
        color: model.colors.primary,
        fontSize: 12,
        lineHeight: 16,
        labelColor: model.colors.accent,
      })
    : ''

  return wrapTable(
    model.width,
    [
      row(`${spacer(18)}${renderLogo(model)}${spacer(16)}`),
      row(`${spacer(10)}`, `border-top:1px solid ${model.colors.accent};`),
      row(
        `${spacer(10)}${renderNameLine(model)}${textLine(model.titleLine, {
          color: model.colors.primary,
          fontFamily: model.fontFamily,
          fontSize: 12,
          lineHeight: 16,
          fontWeight: '500',
        })}${textLine(model.brand.companyLine, {
          color: model.colors.subtle,
          fontFamily: model.fontFamily,
          fontSize: 11,
          lineHeight: 15,
          fontWeight: '500',
        })}${
          model.brand.brandLine
            ? textLine(model.brand.brandLine, {
                color: model.colors.subtle,
                fontFamily: model.fontFamily,
                fontSize: 11,
                lineHeight: 15,
              })
            : ''
        }${spacer(12)}${emailRow}${renderAddressLines(model)}${
          model.assets.banner.enabled ? `${spacer(16)}${renderBanner(model)}` : ''
        }`,
      ),
    ].join(''),
  )
}
