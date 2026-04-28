import { useDroppable } from "@dnd-kit/react";
import { InventoryCell } from "../inventory-cell";
import "./styles.scss";

export type BlockData = {
  title: string;
  size: {
    x: number;
    y: number;
  };
};

type InventoryBlockProps = {
  place: string;
  block: BlockData;
  highlightCells: { place: string; id: number; row: number }[];
};

export function InventoryBlock({ place, block, highlightCells }: InventoryBlockProps) {
  const { ref } = useDroppable({ id: `block:${place}` });

  return (
    <div className="inventory-block" data-block={place}>
      <div className="inventory-block__title">{block.title}</div>
      <div className="inventory-block__container" ref={ref}>
        {Array.from({ length: block.size.y }).map((_, rowKey) => (
          <div key={rowKey} className="inventory-block__row">
            {Array.from({ length: block.size.x }).map((_, cellKey) => {
              const highlight =
                highlightCells.findIndex(
                  (highlightCell) =>
                    highlightCell.id === cellKey && highlightCell.place === place && highlightCell.row === rowKey,
                ) >= 0;

              return (
                <InventoryCell
                  key={`${place}${rowKey}${cellKey}`}
                  place={place}
                  id={cellKey}
                  row={rowKey}
                  highlight={highlight}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
