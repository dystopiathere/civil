import { useRef } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { CharacterAppearence, InventoryBlock, InventoryItem, type BlockData, type ItemData } from "~/widgets";
import { useInventoryDrag } from "~/shared/hooks";
import "./styles.scss";

const pockets: BlockData = {
  title: "Карманы",
  size: {
    x: 6,
    y: 2,
  },
};

const bag: BlockData = {
  title: "Сумка",
  size: {
    x: 6,
    y: 6,
  },
};

const trunk: BlockData = {
  title: "Багажник",
  size: {
    x: 6,
    y: 9,
  },
};

const TEST_ITEMS: ItemData[] = [
  {
    id: 1,
    hash: "test",
    name: "Test item",
    place: "trunk",
    count: 13,
    maxCount: 15,
    position: {
      x: 1,
      y: 1,
    },
    size: {
      x: 4,
      y: 2,
    },
  },
  {
    id: 2,
    hash: "test",
    name: "Test item",
    place: "trunk",
    count: 6,
    maxCount: 15,
    position: {
      x: 2,
      y: 4,
    },
    size: {
      x: 4,
      y: 2,
    },
  },
];

const inventory = { pockets, bag };

export function Inventory() {
  const { items, highlightCells, onStart, onStop, onCollision } = useInventoryDrag(TEST_ITEMS);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <DragDropProvider onDragStart={onStart} onDragEnd={onStop} onCollision={onCollision}>
      <div className="inventory" id="inventory" ref={ref}>
        <CharacterAppearence />

        <div className="inventory__group horizontal">
          <InventoryBlock place="trunk" block={trunk} highlightCells={highlightCells} />

          <div className="inventory__group">
            {Object.entries(inventory).map(([place, block]) => (
              <InventoryBlock key={place} place={place} block={block} highlightCells={highlightCells} />
            ))}
          </div>
        </div>

        {items.map((item) => (
          <InventoryItem key={item.id} item={item} inventoryRef={ref} />
        ))}
      </div>
    </DragDropProvider>
  );
}
