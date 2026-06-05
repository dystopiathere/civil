import { useRef } from "react";
import { CharacterAppearence, type BlockData } from "~/widgets";
import { InventoryBlocks } from "~/widgets/inventory-blocks";
import { InventoryProvider } from "~/shared/contexts";
import "./styles.scss";

const pockets: BlockData = {
  id: 1,
  title: "Карманы",
  size: {
    x: 6,
    y: 2,
  },
  items: [],
};

const bag: BlockData = {
  id: 2,
  title: "Сумка",
  size: {
    x: 6,
    y: 6,
  },
  items: [],
};

const trunk: BlockData = {
  id: 3,
  title: "Багажник",
  size: {
    x: 6,
    y: 9,
  },
  items: [
    {
      id: 1,
      hash: "test",
      name: "Test item",
      count: 7,
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
    {
      id: 3,
      hash: "test",
      name: "Test item",
      count: 2,
      maxCount: 15,
      position: {
        x: 2,
        y: 7,
      },
      size: {
        x: 4,
        y: 2,
      },
    },
  ],
};

const inventory = { trunk, pockets };

export function Inventory() {
  const inventoryRef = useRef<HTMLDivElement>(null);

  return (
    <InventoryProvider inventoryRef={inventoryRef} inventory={inventory}>
      <div className="inventory" ref={inventoryRef}>
        <CharacterAppearence />

        <InventoryBlocks />
      </div>
    </InventoryProvider>
  );
}
