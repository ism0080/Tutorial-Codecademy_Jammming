interface DefaultButtonProps extends CommonProps {
  onPress: () => void
  containerStyle?: import('react').CSSProperties
  textStyle?: import('react').CSSProperties
  textFontWeight?: 'bold' | 'semibold' | 'light'
  disabled?: boolean
  disabledBackgroundColor?: string
  disabledTextColor?: string
  text?: string
  debounce?: number
  loading?: boolean
  children?: import('react').ReactNode
  allowDisabledPress?: boolean
  error?: boolean
  errorText?: string
  onErrorPress?: () => void
}
