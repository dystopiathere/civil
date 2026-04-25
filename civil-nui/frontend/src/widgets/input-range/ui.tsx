import { useEffect, useState } from "react";
import "./styles.scss";

type InputRangeProps = {
  label: string;
  value: number;
  min: number;
  max: (number | number[]) | Promise<number | number[]>;
  step: number;
  onChange: (newValue: number) => void;
  onFocus?: () => void;
};

export function InputRange({ label, value, min, max, step, onChange, onFocus }: InputRangeProps) {
  const [maxValue, setMaxValue] = useState<number | number[]>(1);

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
    <div className="input-range">
      <div className="input-range__header">
        {label && <div className="input-range__label">{label}</div>}
        <div className="input-range__value">{value}</div>
      </div>

      <input
        title={undefined}
        placeholder={undefined}
        className="input-range__control"
        type="range"
        min={min}
        max={Array.isArray(maxValue) ? maxValue[maxValue.length - 1] : maxValue}
        step={step}
        value={value}
        onInput={(event) => {
          let newValue = Number(event.currentTarget.value);
          if (Array.isArray(maxValue) && !maxValue.includes(newValue)) {
            while (!maxValue.includes(newValue)) {
              if (newValue > value) {
                newValue++;
              } else {
                newValue--;
              }
            }
          }

          onChange(newValue);
        }}
        onFocus={onFocus}
      />
    </div>
  );
}
