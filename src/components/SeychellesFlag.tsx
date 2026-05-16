interface SeychellesFlagProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function SeychellesFlag({
  className = "",
  width = 60,
  height = 40,
}: SeychellesFlagProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 600"
      width={width}
      height={height}
      className={className}
      aria-label="Flag of Seychelles"
      role="img"
    >
      {/* 5 rays radiating from bottom-left corner */}
      <polygon points="0,600 900,0 900,120 0,600" fill="#003F87" />
      <polygon points="0,600 900,120 900,240 0,600" fill="#FCD856" />
      <polygon points="0,600 900,240 900,360 0,600" fill="#D62828" />
      <polygon points="0,600 900,360 900,480 0,600" fill="#FFFFFF" />
      <polygon points="0,600 900,480 900,600 0,600" fill="#007A5E" />
    </svg>
  );
}
