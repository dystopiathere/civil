import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import "./styles.scss";

type InputRangeProps = {
  label: string;
  value: number;
  min: number;
  max: number | number[];
  step: number;
  tabIndex?: number;
  disabledOnMaxValue?: number;
  onChange: (newValue: number) => void;
  onFocus?: () => void;
};

export function InputRange({
  label,
  value,
  min,
  max,
  step,
  tabIndex,
  disabledOnMaxValue = 0,
  onChange,
  onFocus,
}: InputRangeProps) {
  const [localValue, setLocalValue] = useState<number>(value);

  const changeTimeout = useRef<number>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const computedValue = Array.isArray(max)
    ? max.findIndex((val) => Math.abs(val - localValue) < Number.EPSILON)
    : localValue;

  const rangeValue = Array.isArray(max) ? (computedValue === -1 ? 0 : computedValue) : computedValue;

  return (
    <div className={cn("input-range", (Array.isArray(max) ? max.length : max) === disabledOnMaxValue && "disabled")}>
      <div className="input-range__header">
        {label && <div className="input-range__label">{label}</div>}
        <div className="input-range__value">{localValue}</div>
      </div>

      <input
        tabIndex={tabIndex}
        title={undefined}
        placeholder={undefined}
        className="input-range__control"
        type="range"
        min={min}
        max={Array.isArray(max) ? max.length - 1 : max}
        step={step}
        value={rangeValue}
        onChange={(event) => {
          let newValue = Number(event.currentTarget.value);

          if (Array.isArray(max)) {
            newValue = max[newValue] ?? newValue;
          }

          setLocalValue(newValue);

          if (changeTimeout.current) {
            clearTimeout(changeTimeout.current);
          }

          changeTimeout.current = setTimeout(() => {
            onChange(newValue);
          }, 30);
        }}
        onFocus={onFocus}
      />
    </div>
  );
}
