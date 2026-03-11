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

export default function socialForward(model) {
  const websiteHref = model.contactRows.find((item) => item.label === 'W')?.href || ''

  return wrapTable(
    model.width,
    [
      row(
        `<table cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;width:${model.width}px;"><tr><td valign="middle" style="vertical-align:middle;width:56px;">${renderImageOrBadge(
          model.assets.logo,
          {
            initials: model.initials,
            backgroundColor: model.colors.accent,
            size: 48,
            radius: 14,
            href: websiteHref,
          },
        )}</td><td valign="middle" style="vertical-align:middle;">${renderIdentity(
          model,
          {
            nameSize: 16,
            nameColor: model.colors.primary,
            titleColor: '#6b7280',
            companyColor: '#111827',
          },
        )}</td></tr></table>${spacer(14)}${
          model.socialItems.length
            ? renderSocialRow(model, { iconSize: 22, gap: 10 })
            : ''
        }${spacer(12)}${renderContactRows(model, {
          color: '#111827',
          labelColor: '#6b7280',
          fontSize: 11,
          lineHeight: 15,
        })}${renderAddressLine(model, {
          color: '#6b7280',
          fontSize: 10,
          lineHeight: 14,
        })}${
          model.assets.banner.enabled ? `${spacer(16)}${renderBanner(model)}` : ''
        }`,
      ),
    ].join(''),
  )
}
