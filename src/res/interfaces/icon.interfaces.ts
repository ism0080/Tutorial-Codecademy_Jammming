import { svgIconsName } from '../icons'

export interface SvgIconProps {
  fill?: string
  width?: number
  height?: number
  direction?: string
  scale?: number
}

export interface SvgIconsProps {
  name: svgIconsName
  includePadding?: boolean
  selected?: boolean
  isUnstyled?: boolean
  accessibilityIgnoresInvertColors?: boolean
  fill?: string
  width?: number
  height?: number
  direction?: string
}
