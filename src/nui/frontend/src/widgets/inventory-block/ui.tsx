import { useContext } from "react";
import classNames from "classnames";
import { InventoryContext } from "~/shared/contexts";
import { isCellCollision } from "~/shared/hooks";
import { InventoryItem, type ItemData } from "../inventory-item";
import "./styles.scss";

export type BlockData = {
  id: number;
  title: string;
  size: {
    x: number;
    y: number;
  };
  items: ItemData[];
};

type InventoryBlockProps = {
  block: BlockData;
};

export function InventoryBlock({ block }: InventoryBlockProps) {
  const { collisions } = useContext(InventoryContext);

  return (
    <div className="inventory-block">
      <div className="inventory-block__title">{block.title}</div>
      <div className="inventory-block__container" data-block-id={block.id}>
        {Array.from({ length: block.size.y }).map((_, y) => (
          <div key={y} className="inventory-block__row">
            {Array.from({ length: block.size.x }).map((_, x) => {
              const collidedCells = collisions.filter(
                (collision) => isCellCollision(collision) && collision.blockId === block.id,
              );

              const highlight =
                collidedCells.findIndex((cell) => isCellCollision(cell) && cell.x === x && cell.y === y) >= 0;

              return (
                <div
                  key={`${y}${x}`}
                  data-cell-block-id={block.id}
                  data-x={x}
                  data-y={y}
                  className={classNames("inventory-block__cell", highlight && "highlight")}
                />
              );
            })}
          </div>
        ))}

        {block.items.map((item) => (
          <InventoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
