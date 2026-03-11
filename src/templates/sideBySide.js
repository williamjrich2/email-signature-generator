import {
  renderAddressLine,
  renderBanner,
  renderContactRows,
  renderIdentity,
  renderImageOrBadge,
  renderSocialRow,
  row,
  spacer,
  wrapTable,
} from './shared'

export default function sideBySide(model) {
  const websiteHref = model.contactRows.find((item) => item.label === 'W')?.href || ''

  const leftVisual = renderImageOrBadge(
    model.assets.profile.src ? model.assets.profile : model.assets.logo,
    {
      initials: model.initials,
      backgroundColor: model.colors.primary,
      size: 68,
      radius: model.assets.profile.src ? 999 : 16,
      href: websiteHref,
    },
  )

  return wrapTable(
    model.width,
    [
      row(
        `<table cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;width:${model.width}px;"><tr><td valign="top" style="width:84px;vertical-align:top;">${spacer(
          6,
        )}${leftVisual}</td><td valign="top" style="vertical-align:top;">${renderIdentity(
          model,
          {
            nameSize: 16,
            nameColor: model.colors.primary,
            titleColor: '#4b5563',
            companyColor: '#111827',
          },
        )}${spacer(10)}${renderContactRows(model, {
          color: '#111827',
          labelColor: model.colors.accent,
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
        }</td></tr></table>${
          model.assets.banner.enabled ? `${spacer(16)}${renderBanner(model)}` : ''
        }`,
      ),
    ].join(''),
  )
}
