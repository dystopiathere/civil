import { useDroppable } from "@dnd-kit/react";
import "./styles.scss";
import classNames from "classnames";

export type CellData = {
  place: string;
  position: { x: number; y: number };
};

type InventoryCellProps = CellData & {
  highlight?: boolean;
};

export function InventoryCell({ place, position, highlight }: InventoryCellProps) {
  const { ref } = useDroppable({ id: `cell:${place}|${position.x}|${position.y}` });

  return (
    <div
      ref={ref}
      data-cell-place={place}
      data-cell-id={position.x}
      data-row-id={position.y}
      className={classNames("inventory-cell", highlight && "highlight")}
    />
  );
}
