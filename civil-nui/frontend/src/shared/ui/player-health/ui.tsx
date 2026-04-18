import { HealthIcon } from "~/shared/ui/health-icon";

type PlayerHealthProps = {
  health: number;
  maxHealth: number;
};

const healthColor = "#AF0606FF";

export function PlayerHealth({ health, maxHealth }: PlayerHealthProps) {
  const clipPercentage = 100 - (health / maxHealth) * 100;

  return (
    <div className="player-stats-element player-health">
      <HealthIcon width={32} height={32} color="#333333" />

      <div className="player-stats-element__icon" style={{ clipPath: `inset(${clipPercentage}% 0 0 0)` }}>
        <HealthIcon width={32} height={32} color={healthColor} />
      </div>

      <div className="player-stats-element__value">{health}</div>
    </div>
  );
}
