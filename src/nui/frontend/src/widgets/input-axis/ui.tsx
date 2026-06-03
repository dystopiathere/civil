import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
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
    value: number;
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
  const [moving, setMoving] = useState<boolean>(false);

  const constraintsRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragStateTimeout = useRef<number>(null);

  const valuesToPoints = useCallback(
    (valueX: number, valueY: number) => {
      if (!constraintsRef.current) return;

      const rect = constraintsRef.current.getBoundingClientRect();

      const ratioX = (valueX - x.min.value) / (x.max.value - x.min.value);
      const ratioY = (valueY - y.min.value) / (y.max.value - y.min.value);

      let posX = rect.width * ratioX;
      let posY = rect.height * ratioY;

      if (x.reverse) posX = rect.width - posX;
      if (!y.reverse) posY = rect.height - posY;

      return { x: posX, y: posY };
    },
    [x.min.value, x.max.value, y.min.value, y.max.value],
  );

  const pointsToValues = useCallback(
    (pointX: number, pointY: number) => {
      if (!constraintsRef.current) return;

      const rect = constraintsRef.current.getBoundingClientRect();

      if (x.reverse) pointX = rect.width - pointX;
      if (!y.reverse) pointY = rect.height - pointY;

      const ratioX = pointX / rect.width;
      const ratioY = pointY / rect.height;

      const valueX = x.min.value + (x.max.value - x.min.value) * ratioX;
      const valueY = y.min.value + (y.max.value - y.min.value) * ratioY;

      return {
        x: Number(valueX.toFixed(2)),
        y: Number(valueY.toFixed(2)),
      };
    },
    [x.min.value, x.max.value, y.min.value, y.max.value],
  );

  const updateThumbPosition = useCallback((x: number, y: number) => {
    if (!thumbRef.current) return;
    thumbRef.current.style.left = `${x}px`;
    thumbRef.current.style.top = `${y}px`;
  }, []);

  const move = useCallback(
    (clientX: number, clientY: number) => {
      if (!constraintsRef.current) return;

      const rect = constraintsRef.current.getBoundingClientRect();

      let posX = clientX - rect.left;
      let posY = clientY - rect.top;

      if (posX < 0) posX = 0;
      if (posX > rect.width) posX = rect.width;
      if (posY < 0) posY = 0;
      if (posY > rect.height) posY = rect.height;

      updateThumbPosition(posX, posY);

      const values = pointsToValues(posX, posY);
      if (!values) return;

      if (dragStateTimeout.current) return;
      dragStateTimeout.current = setTimeout(() => (dragStateTimeout.current = null), 10);

      onChange(values.x, values.y);
    },
    [pointsToValues, updateThumbPosition, onChange],
  );

  useEffect(() => {
    const points = valuesToPoints(x.value, y.value);
    if (!points) return;

    updateThumbPosition(points.x, points.y);
  }, [x.value, y.value, valuesToPoints, updateThumbPosition]);

  useEffect(() => {
    if (!constraintsRef.current) return;

    constraintsRef.current.onmousemove = (event) => {
      if (!moving) return;
      move(event.screenX, event.screenY);
    };
    constraintsRef.current.onmouseup = () => setMoving(false);
    constraintsRef.current.onmouseleave = () => setMoving(false);

    return () => {
      if (!constraintsRef.current) return;

      constraintsRef.current.onmousemove = null;
      constraintsRef.current.onmouseup = null;
      constraintsRef.current.onmouseleave = null;
    };
  }, [moving, move]);

  return (
    <div className="input-axis">
      <div className="input-axis__label">{label}</div>

      <div
        ref={constraintsRef}
        className={classNames("input-axis__container", moving && "active")}
        onFocus={onFocus}
        onMouseDown={(event) => {
          if (moving) return;
          setMoving(true);
          move(event.screenX, event.screenY);
        }}
      >
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
