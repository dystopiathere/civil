import './styles.scss'

type InputRangeProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (newValue: number) => void;
}

export function InputRange ({ label, value, min, max, step, onChange }: InputRangeProps) {
  return <div className="input-range">
    <div className="input-range__header">
      {label && <div className="input-range__label">{label}</div>}
      <div className="input-range__value">{value}</div>
    </div>

    <input
      className="input-range__control"
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => {
        const value = Number(event.target.value)

        onChange(value)
      }}
    />
  </div>
}