type HealthIconProps = {
  width: number;
  height: number;
  color: string;
}

export function HealthIcon ({ width, height, color }: HealthIconProps) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
    <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M16 3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v5H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h5v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-5h5a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5z"/>
  </svg>
}