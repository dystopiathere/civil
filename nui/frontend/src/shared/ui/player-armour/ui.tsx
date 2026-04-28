import { ArmourIcon } from "~/shared/ui";

type PlayerArmourProps = {
  armour: number;
  maxArmour: number;
};

const armourColor = "#0041B3FF";

export function PlayerArmour({ armour, maxArmour }: PlayerArmourProps) {
  const clipPercentage = 100 - (armour / maxArmour) * 100;

  return (
    <div className="player-stats-element player-armour">
      <ArmourIcon width={32} height={32} color="#333333" />

      <div className="player-stats-element__icon" style={{ clipPath: `inset(${clipPercentage}% 0 0 0)` }}>
        <ArmourIcon width={32} height={32} color={armourColor} />
      </div>

      <div className="player-stats-element__value">{armour}</div>
    </div>
  );
}
