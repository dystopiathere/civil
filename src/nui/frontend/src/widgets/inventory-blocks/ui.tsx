import { useContext } from "react";
import { InventoryBlock } from "~/widgets";
import { InventoryContext } from "~/shared/contexts";

export function InventoryBlocks() {
  const { blocks } = useContext(InventoryContext);

  return (
    <div className="inventory__group">
      {Object.values(blocks).map((block) => (
        <InventoryBlock key={block.id} block={block} />
      ))}
    </div>
  );
}
