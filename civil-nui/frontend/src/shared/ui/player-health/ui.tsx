import { HealthIcon } from "~/shared/ui/health-icon";

type PlayerHealthProps = {
  health: number;
  maxHealth: number;
};

const healthColor = "#AF0606FF";

export function PlayerHealth({ health, maxHealth }: PlayerHealthProps) {
  return (
    <div className="player-stats-element player-health">
      <HealthIcon width={32} height={32} color={healthColor} />

      <div className="player-stats-element-value">
        <div className="player-stats-element-value-bar">
          <div
            className="player-stats-element-value-bar__fill"
            style={{ width: `${(health / maxHealth) * 100}%`, backgroundColor: healthColor }}
          />
        </div>

        <div className="player-stats-element-value__numeric">{health}</div>
      </div>
    </div>
  );
}
