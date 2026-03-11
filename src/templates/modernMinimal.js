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

export default function modernMinimal(model) {
  return wrapTable(
    model.width,
    [
      row(
        `${spacer(8)}${renderIdentity(model, {
          nameSize: 18,
          nameColor: model.colors.primary,
          titleColor: '#6b7280',
          companyColor: model.colors.primary,
          compact: true,
        })}`,
      ),
      renderDivider('#d4d4d8'),
      row(
        `${spacer(10)}${renderContactRows(model, {
          color: '#111827',
          labelColor: '#6b7280',
          fontSize: 11,
          lineHeight: 15,
        })}${renderAddressLine(model, {
          color: '#6b7280',
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
