import { ArmourIcon } from "~/shared/ui/armour-icon";

type PlayerArmourProps = {
  armour: number;
  maxArmour: number;
};

const armourColor = "#0041B3FF";

export function PlayerArmour({ armour, maxArmour }: PlayerArmourProps) {
  return (
    <div className="player-stats-element player-armour">
      <ArmourIcon width={32} height={32} color={armourColor} />

      <div className="player-stats-element-value">
        <div className="player-stats-element-value-bar">
          <div
            className="player-stats-element-value-bar__fill"
            style={{ width: `${(armour / maxArmour) * 100}%`, backgroundColor: armourColor }}
          />
        </div>

        <div className="player-stats-element-value__numeric">{armour}</div>
      </div>
    </div>
  );
}
