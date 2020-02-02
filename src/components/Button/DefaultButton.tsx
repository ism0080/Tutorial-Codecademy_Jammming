import { debounce as Debounce } from 'lodash'
import React, { useMemo } from 'react'

import './DefaultButton.css'

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
  textFontWeight,
}: DefaultButtonProps) => {
  const onPressDebounced = useMemo(() => Debounce(onPress, debounce ? debounce : 0), [onPress])

  const styles = {
    container: {
      borderRadius: 8,
      outline: disabled && !allowDisabledPress ? 'none' : undefined,
      ...containerStyle,
      backgroundColor: 'green',
      cursor: disabled ? 'no-drop' : 'pointer',
    },
    text: {
      color: 'white',
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
