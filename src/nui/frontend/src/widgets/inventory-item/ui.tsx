import { useContext, useEffect } from "react";
import { CELL_SIZE, CELL_SPACING } from "~/shared/constants";
import { InventoryContext } from "~/shared/contexts";
import "./styles.scss";

export type ItemData = {
  id: number;
  hash: string;
  name: string;
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
  const { blocks, onMoveStart, initItemPosition } = useContext(InventoryContext);

  useEffect(() => {
    initItemPosition(blocks, item.id);
  }, [item.id]);

  return (
    <div
      data-item-id={item.id}
      className="inventory-item"
      style={{
        width: CELL_SIZE * item.size.x + CELL_SPACING * (item.size.x - 1) + "rem",
        height: CELL_SIZE * item.size.y + CELL_SPACING * (item.size.y - 1) + "rem",
      }}
      onMouseDown={(event) => onMoveStart(event, item.id)}
    >
      <div className="inventory-item__content">
        {item.name} ({item.count}/{item.maxCount})
      </div>
    </div>
  );
}
