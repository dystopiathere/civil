import { CELL_SIZE, CELL_SPACING } from "~/shared/constants";
import "./styles.scss";

export type ItemData = {
  id: number;
  hash: string;
  name: string;
  place: string;
  count: number;
  maxCount: number;
  size: {
    x: number;
    y: number;
  };
  position: {
    x: number;
    y: number;
  };
};

type InventoryItemProps = {
  item: ItemData;
};

export function InventoryItem({ item }: InventoryItemProps) {
  return (
    <div
      className="inventory-item"
      style={{
        width: CELL_SIZE * item.size.x + CELL_SPACING * (item.size.x - 1) + "rem",
        height: CELL_SIZE * item.size.y + CELL_SPACING * (item.size.y - 1) + "rem",
      }}
      data-hash={item.hash}
      data-place={item.place}
      data-count={item.count}
      data-max-count={item.maxCount}
      data-size-x={item.size.x}
      data-size-y={item.size.y}
      data-position-x={item.position.x}
      data-position-y={item.position.y}
    >
      <div className="inventory-item__content">
        {item.name} ({item.count}/{item.maxCount})
      </div>
    </div>
  );
}
