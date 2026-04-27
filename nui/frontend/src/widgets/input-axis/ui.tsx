import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./styles.scss";

type AxisData = {
  label?: string;
  value: number;
  min: {
    label?: string;
    value: number;
  };
  max: {
    label?: string;
    value: number | Promise<number>;
  };
  reverse?: boolean;
};

type InputRangeProps = {
  label: string;
  x: AxisData;
  y: AxisData;
  onChange: (x: number, y: number) => void;
  onFocus?: () => void;
};

export function InputAxis({ label, x, y, onChange, onFocus }: InputRangeProps) {
  const [maxValueX, setMaxValueX] = useState<number>(1);
  const [maxValueY, setMaxValueY] = useState<number>(1);

  const contraintsRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragStateTimeout = useRef<number>(null);

  useEffect(() => {
    [x, y].forEach(({ value, min, max, reverse }, key) => {
      const setMaxValue = key === 0 ? setMaxValueX : setMaxValueY;

      let result = 1;

      if (max.value instanceof Promise) {
        max.value.then((value) => {
          result = value;
          setMaxValue(result);
        });
      } else {
        result = max.value;
        setMaxValue(result);
      }

      if (!thumbRef.current) {
        return;
      }

      let offsetPercentage = ((value - min.value) / (result - min.value)) * 100;

      if (key === 0) {
        if (reverse) {
          offsetPercentage = 100 - offsetPercentage;
        }

        thumbRef.current.style.left = `${offsetPercentage}%`;
      } else {
        if (!reverse) {
          offsetPercentage = 100 - offsetPercentage;
        }

        thumbRef.current.style.top = `${offsetPercentage}%`;
      }
    });
  }, [JSON.stringify(x), JSON.stringify(y)]);

  return (
    <div className="input-axis">
      <div className="input-axis__label">{label}</div>

      <div ref={contraintsRef} className="input-axis__container" onFocus={onFocus}>
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
            <div className="input-axis__max">{max.label ?? (axis === "x" ? maxValueX : maxValueY)}</div>
          </div>
        ))}

        <motion.div
          ref={thumbRef}
          className="input-axis__thumb"
          drag
          dragMomentum={false}
          dragConstraints={contraintsRef}
          dragElastic={0}
          onDrag={(_, info) => {
            if (dragStateTimeout.current) {
              return;
            }

            dragStateTimeout.current = setTimeout(() => (dragStateTimeout.current = null), 10);

            if (contraintsRef.current) {
              const rect = contraintsRef.current.getBoundingClientRect();

              let pointX = info.point.x - rect.left;
              if (pointX < 0) {
                pointX = 0;
              }
              if (pointX > rect.width) {
                pointX = rect.width;
              }
              if (x.reverse) {
                pointX = rect.width - pointX;
              }

              let pointY = info.point.y - rect.top;
              if (pointY < 0) {
                pointY = 0;
              }
              if (pointY > rect.height) {
                pointY = rect.height;
              }
              if (!y.reverse) {
                pointY = rect.height - pointY;
              }

              const xPercentage = pointX / rect.width;
              const yPercentage = pointY / rect.height;

              const deltaX = Math.abs(x.min.value) + maxValueX;
              const deltaY = Math.abs(y.min.value) + maxValueY;

              const offsetX = deltaX * xPercentage;
              const offsetY = deltaY * yPercentage;

              const resX = Number((x.min.value + offsetX).toFixed(2));
              const resY = Number((y.min.value + offsetY).toFixed(2));

              if (resX === x.min.value && resY === y.min.value) {
                return;
              }

              onChange(x.min.value + offsetX, y.min.value + offsetY);
            }
          }}
        />
      </div>
    </div>
  );
}
