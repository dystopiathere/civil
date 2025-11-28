type ArrowIconProps = {
  width: number;
  height: number;
  color: string;
  rightDirection?: boolean;
}

export function ArrowIcon ({ width, height, color, rightDirection }: ArrowIconProps) {
  return <svg style={{ transform: rightDirection ? 'scale(-1, 1)' : 'unset' }} xmlns="http://www.w3.org/2000/svg"
              width={width} height={height} viewBox="0 0 24 24">
    <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="m11 9l-3 3m0 0l3 3m-3-3h8m5 0a9 9 0 1 0-18 0a9 9 0 0 0 18 0"/>
  </svg>
}