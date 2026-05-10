import { Svg, Path } from '@react-pdf/renderer'

type IconProps = {
    viewBox: string
    path: string
    size?: number
    color?: string
}

export default function Icon({ viewBox, path, size = 9, color = '#475569' }: IconProps) {
    return (
        <Svg viewBox={viewBox} style={{ width: size, height: size }}>
            <Path d={path} fill={color} />
        </Svg>
    )
}
