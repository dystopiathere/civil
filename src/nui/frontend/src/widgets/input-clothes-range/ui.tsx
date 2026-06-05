import type { CollectionData } from "@civil/types";
import { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import "./styles.scss";

type InputClothesRangeProps = {
  label: string;
  collection: string;
  drawable: number;
  min: number;
  data: CollectionData;
  tabIndex?: number;
  onChange: (collection: string, drawable: number) => void;
  onFocus?: () => void;
};

type TimelineStep = {
  collection: string;
  drawable: number;
};

export function InputClothesRange({
  label,
  collection,
  drawable,
  min,
  data,
  tabIndex,
  onChange,
  onFocus,
}: InputClothesRangeProps) {
  const [currentCollection, setCurrentCollection] = useState<string>(collection);
  const [currentDrawable, setCurrentDrawable] = useState<number>(drawable);
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeTimeout = useRef<number>(null);

  const steps = useMemo<TimelineStep[]>(() => {
    const flatList: TimelineStep[] = [];

    Object.keys(data).forEach((collection) => {
      const drawableData = data[collection];
      const drawableKeys = Object.keys(drawableData)
        .map(Number)
        .sort((a, b) => a - b);

      drawableKeys.forEach((drawable) => {
        flatList.push({ collection, drawable });
      });
    });

    return flatList;
  }, [data]);

  useEffect(() => {
    return () => {
      if (changeTimeout.current) clearTimeout(changeTimeout.current);
    };
  }, []);

  useEffect(() => {
    setCurrentCollection(collection);
    setCurrentDrawable(drawable);
  }, [collection, drawable]);

  useEffect(() => {
    const index = steps.findIndex((step) => step.collection === currentCollection && step.drawable === currentDrawable);
    if (index >= 0 && index !== currentIndex) {
      setCurrentIndex(index);
    }
  }, [currentCollection, currentDrawable, steps, currentIndex]);

  const currentStep = steps[currentIndex];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value, 10);
    if (isNaN(index) || index === currentIndex) return;

    setCurrentIndex(index);

    if (changeTimeout.current) {
      clearTimeout(changeTimeout.current);
    }

    const nextStep = steps[index];
    if (!nextStep) return;

    setCurrentCollection(nextStep.collection);
    setCurrentDrawable(nextStep.drawable);

    changeTimeout.current = setTimeout(() => {
      onChange(nextStep.collection, nextStep.drawable);
    }, 30);
  };

  return (
    <div className={classNames("input-range", !steps.length && "disabled")}>
      <div className="input-range__header">
        {label && <div className="input-range__label">{label}</div>}
        <div className="input-range__value">
          {currentStep?.drawable} ({currentStep?.collection || 'base'})
        </div>
      </div>

      <input
        tabIndex={tabIndex}
        title={undefined}
        placeholder={undefined}
        className="input-range__control"
        type="range"
        min={min}
        max={Math.max(0, steps.length - 1)}
        value={currentIndex}
        onChange={handleChange}
        onFocus={onFocus}
      />
    </div>
  );
}
