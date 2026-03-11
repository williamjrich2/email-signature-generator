import {
  renderAddressLine,
  renderBanner,
  renderButtonishLink,
  renderContactRows,
  renderIdentity,
  renderSocialRow,
  row,
  spacer,
  wrapTable,
} from './shared'

export default function boldBrand(model) {
  return wrapTable(
    model.width,
    row(
      `<table cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;width:${model.width}px;"><tr><td valign="top" style="width:8px;background-color:${model.colors.accent};font-size:0;line-height:0;">&nbsp;</td><td valign="top" style="width:18px;">${spacer(
        1,
      )}</td><td valign="top" style="vertical-align:top;">${spacer(6)}${renderIdentity(
        model,
        {
          nameSize: 19,
          nameColor: model.colors.primary,
          titleColor: '#4b5563',
          companyColor: model.colors.primary,
        },
      )}${spacer(12)}${renderContactRows(model, {
        color: '#111827',
        labelColor: model.colors.accent,
      })}${renderAddressLine(model, { color: '#6b7280' })}${
        model.socialItems.length
          ? `${spacer(12)}${renderSocialRow(model, { iconSize: 19, gap: 8 })}`
          : ''
      }${
        model.assets.banner.enabled
          ? `${spacer(16)}${renderButtonishLink(model, 'Book a Call')}${spacer(12)}${renderBanner(
              model,
            )}`
          : ''
      }</td></tr></table>`,
    ),
  )
}
