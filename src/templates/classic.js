import {
  renderAddressLine,
  renderBanner,
  renderContactRows,
  renderDivider,
  renderIdentity,
  renderImageOrBadge,
  renderSocialRow,
  row,
  spacer,
  wrapTable,
} from './shared'

export default function classic(model) {
  const websiteHref = model.contactRows.find((item) => item.label === 'W')?.href || ''

  return wrapTable(
    model.width,
    [
      row(
        `${spacer(18)}${renderImageOrBadge(model.assets.logo, {
          initials: model.initials,
          backgroundColor: model.colors.primary,
          size: 42,
          radius: 12,
          href: websiteHref,
        })}${spacer(18)}`,
      ),
      renderDivider(model.colors.primary),
      row(
        `${spacer(10)}${renderIdentity(model, {
          nameSize: 15,
          titleColor: '#4b5563',
          companyColor: '#111827',
          nameColor: model.colors.primary,
          italicTitle: true,
        })}${spacer(14)}${renderContactRows(model, {
          color: '#111827',
          labelColor: model.colors.accent,
        })}${renderAddressLine(model)}${
          model.socialItems.length
            ? `${spacer(14)}${renderSocialRow(model, { iconSize: 20, gap: 8 })}`
            : ''
        }${
          model.assets.banner.enabled ? `${spacer(16)}${renderBanner(model)}` : ''
        }`,
      ),
    ].join(''),
  )
}
