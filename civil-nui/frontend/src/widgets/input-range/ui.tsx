import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import "./styles.scss";

type InputRangeProps = {
  label: string;
  value: number;
  min: number;
  max: (number | number[]) | Promise<number | number[]>;
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
  const [maxValue, setMaxValue] = useState<number | number[]>(1);

  const changeTimeout = useRef<number>(null);

  useEffect(() => {
    if (max instanceof Promise) {
      max.then((value) => {
        setMaxValue(value);
      });
    } else {
      setMaxValue(max);
    }
  }, [max]);

  return (
    <div
      className={cn(
        "input-range",
        (Array.isArray(maxValue) ? maxValue.length : maxValue) === disabledOnMaxValue && "disabled",
      )}
    >
      <div className="input-range__header">
        {label && <div className="input-range__label">{label}</div>}
        <div className="input-range__value">{value}</div>
      </div>

      <input
        tabIndex={tabIndex}
        title={undefined}
        placeholder={undefined}
        className="input-range__control"
        type="range"
        min={min}
        max={Array.isArray(maxValue) ? maxValue.length - 1 : maxValue}
        step={step}
        value={Array.isArray(maxValue) ? maxValue.findIndex((val) => val === value) : value}
        onChange={(event) => {
          let newValue = Number(event.currentTarget.value);

          if (Array.isArray(maxValue)) {
            newValue = maxValue[newValue];
          }

          if (changeTimeout.current) {
            clearTimeout(changeTimeout.current);
          }

          changeTimeout.current = setTimeout(() => {
            onChange(newValue);
            changeTimeout.current = null;
          }, 15);
        }}
        onFocus={onFocus}
      />
    </div>
  );
}
