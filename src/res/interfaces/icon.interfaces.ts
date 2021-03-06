import { svgIconsName } from '../icons'

export interface SvgIconProps {
  fill?: string
  width?: number
  height?: number
  direction?: string
  scale?: number
  selected?: boolean
}

export interface SvgIconsProps extends SvgIconProps {
  name: svgIconsName
}
