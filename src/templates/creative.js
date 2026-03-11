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

export default function creative(model) {
  const websiteHref = model.contactRows.find((item) => item.label === 'W')?.href || ''
  const heroAsset = model.assets.profile.src ? model.assets.profile : model.assets.logo

  return wrapTable(
    model.width,
    [
      row(
        `<table cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;width:${model.width}px;"><tr><td valign="top" style="width:82px;vertical-align:top;">${renderImageOrBadge(
          heroAsset,
          {
            initials: model.initials,
            backgroundColor: model.colors.accent,
            size: 72,
            radius: 999,
            href: websiteHref,
          },
        )}</td><td valign="top" style="vertical-align:top;padding-top:4px;">${renderIdentity(
          model,
          {
            nameSize: 18,
            nameColor: model.colors.accent,
            titleColor: '#4b5563',
            companyColor: model.colors.primary,
          },
        )}</td></tr></table>`,
      ),
      renderDivider(model.colors.accent),
      row(
        `${spacer(10)}${renderContactRows(model, {
          color: '#111827',
          labelColor: model.colors.accent,
        })}${renderAddressLine(model, {
          color: '#6b7280',
        })}${
          model.socialItems.length
            ? `${spacer(12)}${renderSocialRow(model, { iconSize: 20, gap: 9 })}`
            : ''
        }${
          model.assets.banner.enabled ? `${spacer(16)}${renderBanner(model)}` : ''
        }`,
      ),
    ].join(''),
  )
}
