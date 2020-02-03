import React from 'react'
import { svgIcons } from './icons'
import { SvgIconsProps } from './interfaces/icon.interfaces'

export const StaticSvgIcon = ({ selected, fill, width, height, direction, name }: SvgIconsProps) => {
  const Icon = svgIcons[name]

  return <Icon fill={selected ? '#007aff' : fill} width={width} height={height} direction={direction} />
}
