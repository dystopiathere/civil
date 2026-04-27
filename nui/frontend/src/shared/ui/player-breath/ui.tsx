import { useEffect, useState } from "react";
import { LungIcon } from "~/shared/ui/lung-icon";

type PlayerBreathProps = {
  breath: number;
};

const breathColor = "#0BB88DFF";

export function PlayerBreath({ breath }: PlayerBreathProps) {
  const [maxBreath, setMaxBreath] = useState(0);

  useEffect(() => {
    setMaxBreath((prev) => (breath > prev ? breath : prev));
  }, [breath]);

  const clipPercentage = 100 - (breath / maxBreath) * 100;

  return (
    <div className="player-stats-element player-breath">
      <LungIcon width={32} height={32} color="#333333" />

      <div className="player-stats-element__icon" style={{ clipPath: `inset(${clipPercentage}% 0 0 0)` }}>
        <LungIcon width={32} height={32} color={breathColor} />
      </div>
    </div>
  );
}
