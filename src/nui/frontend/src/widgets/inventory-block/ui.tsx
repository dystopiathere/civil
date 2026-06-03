import { InventoryCell, type CellData } from "../inventory-cell";
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
  highlightCells: Partial<CellData>[];
};

export function InventoryBlock({ place, block, highlightCells }: InventoryBlockProps) {
  return (
    <div className="inventory-block">
      <div className="inventory-block__title">{block.title}</div>
      <div
        className="inventory-block__container"
        data-place={place}
        data-size-x={block.size.x}
        data-size-y={block.size.y}
      >
        {Array.from({ length: block.size.y }).map((_, y) => (
          <div key={y} className="inventory-block__row">
            {Array.from({ length: block.size.x }).map((_, x) => {
              const highlight =
                highlightCells.findIndex(
                  (highlightCell) =>
                    highlightCell?.position?.x === x &&
                    highlightCell?.place === place &&
                    highlightCell?.position?.y === y,
                ) >= 0;

              return <InventoryCell key={`${place}${y}${x}`} place={place} position={{ x, y }} highlight={highlight} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
