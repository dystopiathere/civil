import { useEffect, useState } from "react";
import { ArrowIcon } from "~/shared/ui";
import "./styles.scss";

type Primitive = string | number;

type InputArrowsProps<T extends Primitive> = {
  label: string;
  value: T;
  range: T[] | Promise<T[]>;
  onChange: (newValue: T) => void;
};

export function InputArrows<T extends Primitive>({ label, value, range: r, onChange }: InputArrowsProps<T>) {
  const [range, setRange] = useState<T[]>([]);

  useEffect(() => {
    if (r instanceof Promise) {
      r.then((data) => {
        setRange(data);
      });
    } else {
      setRange(r);
    }
  }, [r]);

  return (
    <div className="input-arrows">
      {label && <div className="input-arrows__label">{label}</div>}

      <div className="input-arrows__group">
        <div
          className="input-arrows__control"
          onClick={() => {
            let idx = range.indexOf(value);

            if (idx - 1 >= 0) {
              idx -= 1;
            } else {
              idx = range.length - 1;
            }

            onChange(range[idx]);
          }}
        >
          <ArrowIcon width={32} height={32} color={"white"} />
        </div>

        <div className="input-arrows__value">{value}</div>

        <div
          className="input-arrows__control"
          onClick={() => {
            let idx = range.indexOf(value);

            if (idx + 1 < range.length) {
              idx += 1;
            } else {
              idx = 0;
            }

            onChange(range[idx]);
          }}
        >
          <ArrowIcon width={32} height={32} color={"white"} rightDirection />
        </div>
      </div>
    </div>
  );
}
