import { createContext, type MouseEvent, type RefObject } from "react";
import type { Collisions } from "~/shared/hooks";
import type { BlockData } from "~/widgets";

type InventoryContextData = {
  inventoryRef?: RefObject<HTMLElement | null>;
  blocks: BlockData[];
  collisions: Collisions;
  onMoveStart: (event: MouseEvent<HTMLElement>, id: number) => void;
  initItemPosition: (blocks: BlockData[], number: number) => void;
};

export const InventoryContext = createContext<InventoryContextData>({
  blocks: [],
  collisions: [],
  onMoveStart: () => {},
  initItemPosition: () => {},
});
