export const getBackgroundColor = ({
  containerStyle,
  disabled,
  disabledBackgroundColor,
  error,
}: DefaultButtonProps) => {
  let backgroundColor = 'green'
  if (containerStyle && containerStyle.backgroundColor) {
    backgroundColor = containerStyle.backgroundColor
  }
  if (disabled) {
    backgroundColor = disabledBackgroundColor || 'grey'
  }
  if (error) {
    backgroundColor = 'red'
  }

  return backgroundColor
}

export const getTextColor = ({ textStyle, disabled, disabledTextColor, error }: DefaultButtonProps) => {
  let color = 'white'
  if (textStyle && textStyle.color) {
    color = textStyle.color
  }
  if (disabled) {
    color = disabledTextColor || 'white'
  }
  if (error) {
    color = 'white'
  }

  return color
}
