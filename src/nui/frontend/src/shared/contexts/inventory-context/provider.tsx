import type { PropsWithChildren, RefObject } from "react";
import { InventoryContext } from "~/shared/contexts/inventory-context";
import { useInventoryDrag } from "~/shared/hooks";
import type { BlockData } from "~/widgets";

type InventoryProviderProps = {
  inventoryRef: RefObject<HTMLElement | null>;
  inventory: Record<string, BlockData>;
};

export function InventoryProvider({ inventoryRef, inventory, children }: PropsWithChildren<InventoryProviderProps>) {
  const data = useInventoryDrag(inventoryRef, inventory);

  return <InventoryContext value={data}>{children}</InventoryContext>;
}
