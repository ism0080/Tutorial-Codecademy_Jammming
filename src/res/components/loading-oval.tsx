import React from 'react'
import { SvgIconProps } from '../interfaces/icon.interfaces'

const defaultDimensions = {
  height: 18,
  width: 18,
}

// tslint:disable: no-magic-numbers
export const LoadingOval = (props: SvgIconProps) => {
  const width = props.width || defaultDimensions.width
  const height = props.height || defaultDimensions.height
  const fill = props.fill || '#fff'

  return (
    <svg width={width} height={height} stroke={fill} viewBox='0 0 38 38'>
      <g transform='translate(1 1)' strokeWidth={2} fill='none' fillRule='evenodd'>
        <circle strokeOpacity={0.5} cx={18} cy={18} r={18} />
        <path d='M36 18c0-9.94-8.06-18-18-18'>
          <animateTransform
            attributeName='transform'
            type='rotate'
            from='0 18 18'
            to='360 18 18'
            dur='1s'
            repeatCount='indefinite'
          />
        </path>
      </g>
    </svg>
  )
}
