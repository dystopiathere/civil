import { useCallback, useEffect, useState, type RefObject } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import classNames from "classnames";
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
  inventoryRef: RefObject<HTMLDivElement | null>;
};

const CELL_SIZE = 4;
const CELL_SPACING = 0.2;
const PADDING_X = 0.5;
const PADDING_Y = 0.25;

export function InventoryItem({ item, inventoryRef }: InventoryItemProps) {
  const [initPosition, setInitPosition] = useState({ x: 0, y: 0 });

  const hash = `${item.id}|${item.hash}|${item.count}|${item.maxCount}|${item.size.x}|${item.size.y}`;
  const { ref: dragRef, isDragging } = useDraggable({ id: `${hash}` });
  const { ref: dropRef } = useDroppable({ id: `item:${hash}` });

  const getItemPosition = useCallback(() => {
    if (!inventoryRef.current) {
      return initPosition;
    }

    const block = inventoryRef.current.querySelector(`[data-block="${item.place}"]`);
    if (!block) {
      return initPosition;
    }

    const root = document.documentElement;
    const style = window.getComputedStyle(root).getPropertyValue("font-size");
    const rem = parseFloat(style);

    const inventoryRect = inventoryRef.current.getBoundingClientRect();
    const blockRect = block.getBoundingClientRect();

    const topDelta = (blockRect.top - inventoryRect.top) / rem - PADDING_Y;
    const leftDelta = (blockRect.left - inventoryRect.left) / rem + PADDING_X;

    return {
      x: CELL_SIZE * item.position.x + CELL_SPACING * item.position.x + leftDelta,
      y: CELL_SIZE * item.position.y + CELL_SPACING * item.position.y + topDelta + CELL_SIZE,
    };
  }, [initPosition, JSON.stringify(item)]);

  useEffect(() => {
    setInitPosition(getItemPosition());
  }, []);

  return (
    <>
      <div
        ref={dragRef}
        className={classNames("inventory-item", isDragging && "dragging")}
        style={{
          width: CELL_SIZE * item.size.x + CELL_SPACING * (item.size.x - 1) + "rem",
          height: CELL_SIZE * item.size.y + CELL_SPACING * (item.size.y - 1) + "rem",
          translate: `${getItemPosition().x + "rem"} ${getItemPosition().y + "rem"}`,
        }}
      >
        <div ref={dropRef} className="inventory-item__content">
          {item.name} ({item.count}/{item.maxCount})
        </div>
      </div>
    </>
  );
}
