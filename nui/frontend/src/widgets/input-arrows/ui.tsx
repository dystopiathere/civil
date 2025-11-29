import { ArrowIcon } from '~/shared/ui/arrow-icon'
import { useState } from 'react'
import './styles.scss'

type Primitive = string | number | boolean;

type InputArrowsProps<T extends Primitive> = {
  label: string;
  value: T;
  range: T[];
  onChange: (newValue: T) => void;
}

export function InputArrows<T extends Primitive> ({ label, value, range, onChange }: InputArrowsProps<T>) {
  const [val, setVal] = useState<T>(value)

  return <div className="input-arrows">
    {label && <div className="input-arrows__label">{label}</div>}

    <div className="input-arrows__group">
      <div
        className="input-arrows__control"
        onClick={() => {
          let idx = range.indexOf(val)

          if (idx - 1 >= 0) {
            idx -= 1
          } else {
            idx = range.length - 1
          }

          setVal(range[idx])
          onChange(range[idx])
        }}
      >
        <ArrowIcon width={32} height={32} color={'white'}/>
      </div>

      <div className="input-arrows__value">{val}</div>

      <div
        className="input-arrows__control"
        onClick={() => {
          let idx = range.indexOf(val)

          if (idx + 1 < range.length) {
            idx += 1
          } else {
            idx = 0
          }

          setVal(range[idx])
          onChange(range[idx])
        }}
      >
        <ArrowIcon width={32} height={32} color={'white'} rightDirection/>
      </div>
    </div>
  </div>
}