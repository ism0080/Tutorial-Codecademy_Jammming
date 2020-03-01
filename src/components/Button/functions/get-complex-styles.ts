import { Theme } from 'hooks'

export const getBackgroundColor = (
  { containerStyle, disabled, disabledBackgroundColor, error }: DefaultButtonProps,
  theme: Theme,
) => {
  let backgroundColor = theme.colors.defaultButton
  if (containerStyle && containerStyle.backgroundColor) {
    backgroundColor = containerStyle.backgroundColor
  }
  if (disabled) {
    backgroundColor = disabledBackgroundColor || theme.colors.defaultDisabled
  }
  if (error) {
    backgroundColor = theme.colors.defaultError
  }

  return backgroundColor
}

export const getTextColor = ({ textStyle, disabled, disabledTextColor, error }: DefaultButtonProps, theme: Theme) => {
  let color = theme.colors.defaultColor
  if (textStyle && textStyle.color) {
    color = textStyle.color
  }
  if (disabled) {
    color = disabledTextColor || theme.colors.defaultColor
  }
  if (error) {
    color = theme.colors.defaultColor
  }

  return color
}
