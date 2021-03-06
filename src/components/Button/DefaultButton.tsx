import { debounce as debounceHandler } from 'lodash'
import React, { useMemo } from 'react'

import { useTheme } from 'hooks'
import { StaticSvgIcon } from 'res/svg-icon-renderer'

import css from './DefaultButton.less'
import { getBackgroundColor, getTextColor } from './functions'

export const DefaultButton = ({
  debounce,
  onErrorPress,
  onPress,
  error,
  errorText,
  text,
  testID,
  children,
  disabled,
  allowDisabledPress,
  loading,
  containerStyle,
  textStyle,
  disabledBackgroundColor,
  disabledTextColor,
}: DefaultButtonProps) => {
  const theme = useTheme()
  const onPressDebounced = useMemo(() => debounceHandler(onPress, debounce ? debounce : 0), [onPress])

  const style = {
    container: {
      backgroundColor: getBackgroundColor(
        {
          containerStyle,
          disabled,
          disabledBackgroundColor,
          error,
        } as DefaultButtonProps,
        theme,
      ),
      borderRadius: theme.borderRadius,
      cursor: disabled ? 'no-drop' : 'pointer',
      outline: disabled && !allowDisabledPress ? 'none' : undefined,
      ...containerStyle,
    },
    text: {
      color: getTextColor({ textStyle, disabled, disabledTextColor, error } as DefaultButtonProps, theme),
      fontSize: theme.defaultFontSize,
      ...textStyle,
    },
  }

  const onButtonPress = () => {
    const clickAction = error && onErrorPress ? onErrorPress : debounce ? onPressDebounced : onPress
    if (!disabled || allowDisabledPress) {
      clickAction()
    }
  }

  const buttonLabel = error && errorText ? errorText : text

  return (
    <button data-testid={testID} onClick={onButtonPress} className={css.container} style={style.container}>
      {loading ? (
        <span data-testid={`${testID}.loading`}>
          <StaticSvgIcon name='loadingOval' />
        </span>
      ) : (
        children || (
          <div data-testid={`${testID}.text`} style={style.text} className={css.text}>
            {buttonLabel}
          </div>
        )
      )}
    </button>
  )
}
