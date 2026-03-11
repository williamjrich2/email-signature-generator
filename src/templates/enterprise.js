import {
  renderAddressLine,
  renderBanner,
  renderContactRows,
  renderDivider,
  renderDualLogos,
  renderIdentity,
  renderSocialRow,
  row,
  spacer,
  wrapTable,
} from './shared'

export default function enterprise(model) {
  return wrapTable(
    model.width,
    [
      row(`${spacer(10)}${renderDualLogos(model, 36)}${spacer(14)}`),
      renderDivider('#cbd5e1'),
      row(
        `${spacer(10)}${renderIdentity(model, {
          nameSize: 15,
          nameColor: model.colors.primary,
          titleColor: '#475569',
          companyColor: '#0f172a',
          compact: true,
        })}${spacer(12)}${renderContactRows(model, {
          color: '#0f172a',
          labelColor: '#475569',
          fontSize: 11,
          lineHeight: 15,
        })}${renderAddressLine(model, {
          color: '#64748b',
          fontSize: 10,
          lineHeight: 14,
        })}${
          model.socialItems.length
            ? `${spacer(12)}${renderSocialRow(model, { iconSize: 18, gap: 8 })}`
            : ''
        }${
          model.assets.banner.enabled ? `${spacer(16)}${renderBanner(model)}` : ''
        }`,
      ),
    ].join(''),
  )
}
