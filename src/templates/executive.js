import {
  renderAddressLine,
  renderBanner,
  renderContactRows,
  renderDivider,
  renderIdentity,
  renderSocialRow,
  row,
  spacer,
  wrapTable,
} from './shared'

export default function executive(model) {
  return wrapTable(
    model.width,
    [
      row(
        `${spacer(6)}${renderIdentity(model, {
          nameSize: 20,
          nameColor: '#111111',
          titleColor: '#5f5b56',
          companyColor: '#111111',
          nameFontFamily: "Georgia, 'Times New Roman', serif",
          copyFontFamily: model.fontFamily,
        })}`,
      ),
      renderDivider('#b7a480'),
      row(
        `${spacer(10)}${renderContactRows(model, {
          color: '#111111',
          labelColor: '#8b7355',
        })}${renderAddressLine(model, {
          color: '#6b7280',
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
