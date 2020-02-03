import { debounce as debounceHandler } from 'lodash'
import React, { useMemo } from 'react'

import './DefaultButton.css'
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
  const onPressDebounced = useMemo(() => debounceHandler(onPress, debounce ? debounce : 0), [onPress])

  const styles = {
    container: {
      backgroundColor: getBackgroundColor({
        containerStyle,
        disabled,
        disabledBackgroundColor,
        error,
      } as DefaultButtonProps),
      borderRadius: 8,
      cursor: disabled ? 'no-drop' : 'pointer',
      outline: disabled && !allowDisabledPress ? 'none' : undefined,
      ...containerStyle,
    },
    text: {
      color: getTextColor({ textStyle, disabled, disabledTextColor, error } as DefaultButtonProps),
      fontSize: 14,
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
    <button data-testid={testID} onClick={onButtonPress} className={'container'} style={styles.container}>
      {loading ? (
        <span data-testid={`${testID}.loading`}>
          <p>Loading...</p>>
        </span>
      ) : (
        children || (
          <div data-testid={`${testID}.text`} style={styles.text} className={'text'}>
            {buttonLabel}
          </div>
        )
      )}
    </button>
  )
}
