import classNames from "classnames";
import "./styles.scss";

export type CellData = {
  place: string;
  position: { x: number; y: number };
};

type InventoryCellProps = CellData & {
  highlight?: boolean;
};

export function InventoryCell({ place, position, highlight }: InventoryCellProps) {
  return (
    <div
      data-place={place}
      data-position-x={position.x}
      data-position-y={position.y}
      className={classNames("inventory-cell", highlight && "highlight")}
    />
  );
}
