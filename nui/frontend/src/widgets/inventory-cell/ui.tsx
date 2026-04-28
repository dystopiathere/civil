import { useDroppable } from "@dnd-kit/react";
import "./styles.scss";
import classNames from "classnames";

type InventoryCellProps = {
  place: string;
  id: number;
  row: number;
  highlight?: boolean;
};

export function InventoryCell({ place, id, row, highlight }: InventoryCellProps) {
  const { ref } = useDroppable({ id: `cell:${place}|${id}|${row}` });

  return (
    <div
      ref={ref}
      data-cell-place={place}
      data-cell-id={id}
      data-row-id={row}
      className={classNames("inventory-cell", highlight && "highlight")}
    />
  );
}
