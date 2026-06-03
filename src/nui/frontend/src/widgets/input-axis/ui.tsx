import { useRef } from "react";
import classNames from "classnames";
import { useAxisDrag, type AxisData } from "~/shared/hooks";
import "./styles.scss";

type InputRangeProps = {
  label: string;
  x: AxisData;
  y: AxisData;
  onChange: (x: number, y: number) => void;
  onFocus?: () => void;
};

export function InputAxis({ label, x, y, onChange, onFocus }: InputRangeProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const { moving } = useAxisDrag(constraintsRef, thumbRef, x, y, onChange);

  return (
    <div className="input-axis">
      <div className="input-axis__label">{label}</div>

      <div ref={constraintsRef} className={classNames("input-axis__container", moving && "active")} onFocus={onFocus}>
        {Object.entries({ x, y }).map(([axis, { label, min, max }]) => (
          <div key={axis} className={`input-axis__${axis}`}>
            {Array.from({ length: 11 }).map((_, key) => (
              <div key={axis + key} className="input-axis__step" />
            ))}

            {label && (
              <div className="input-axis__block-label">
                <span>{label}</span>
                <span>{label}</span>
              </div>
            )}

            <div className="input-axis__min">{min.label ?? min.value}</div>
            <div className="input-axis__max">{max.label ?? (axis === "x" ? x.max.value : y.max.value)}</div>
          </div>
        ))}

        <div ref={thumbRef} className="input-axis__thumb" />
      </div>
    </div>
  );
}
