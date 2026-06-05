import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { BlockData, ItemData } from "~/widgets";
import { CELL_SIZE, CELL_SPACING } from "../constants";

type CollisionType = "block" | "item";
type CellCollisionData = { blockId: number; x: number; y: number };
type CollisionData<T extends CollisionType> = { type: T; id: number };
export type Collisions<T extends CollisionType = CollisionType> = (CollisionData<T> | CellCollisionData)[];

export function isCellCollision(value: any): value is CellCollisionData {
  return value && value.blockId;
}
export function isCollisionType<T extends CollisionType>(value: any): value is CollisionData<T> {
  return value && value.type;
}

const MARKERS_GAP = 40;
const DEV = false;

export function useInventoryDrag(inventoryRef: RefObject<HTMLElement | null>, inventory: Record<string, BlockData>) {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [collisions, setCollisions] = useState<Collisions>([]);

  const movingItemRef = useRef<number>(null);
  const movingItemOffsetRef = useRef<{ x: number; y: number }>(null);

  const askTimeout = useRef<number>(null);

  const devMarkers = useRef<HTMLElement[]>([]);

  const getCollisionDataFromElement = useCallback(
    (element: HTMLElement): CollisionData<CollisionType> | CellCollisionData | null => {
      const { blockId, itemId, cellBlockId, x, y } = element.dataset;

      if (itemId) {
        return { type: "item", id: Number(itemId) };
      }

      if (blockId) {
        return { type: "block", id: Number(blockId) };
      }

      if (cellBlockId && x && y) {
        return { blockId: Number(cellBlockId), x: Number(x), y: Number(y) };
      }

      return null;
    },
    [],
  );

  const getCollisions = useCallback(() => {
    setCollisions([]);

    if (!inventoryRef.current || !movingItemRef.current) return [];

    const item = inventoryRef.current.querySelector(`[data-item-id="${movingItemRef.current}"]`);
    if (!item) return [];

    const rect = item.getBoundingClientRect();

    const markersCountY = rect.height / MARKERS_GAP;
    const markersCountX = rect.width / MARKERS_GAP;

    const markersCoords = [];

    if (devMarkers.current.length) {
      devMarkers.current.forEach((marker) => marker.remove());
      devMarkers.current = [];
    }

    for (let i = 0; i < markersCountY; i++) {
      let y = rect.top + MARKERS_GAP * i;

      for (let j = 0; j < markersCountX; j++) {
        const x = rect.left + MARKERS_GAP * j;

        if (DEV) {
          const marker = document.createElement("div");
          marker.style.position = "absolute";
          marker.style.top = `${y}px`;
          marker.style.left = `${x}px`;
          marker.style.width = ".5rem";
          marker.style.height = ".5rem";
          marker.style.borderRadius = "100%";
          marker.style.backgroundColor = "red";
          document.documentElement.appendChild(marker);
          devMarkers.current.push(marker);
        }

        markersCoords.push({ x, y });
      }
    }

    const collideElements: HTMLElement[] = [];
    markersCoords.forEach(({ x, y }) => {
      collideElements.push(...(document.elementsFromPoint(x, y) as HTMLElement[]));
    });

    const collisions: Collisions = [];
    const uniqueCollideElements = [...new Set(collideElements)];
    uniqueCollideElements.forEach((collideElement) => {
      const data = getCollisionDataFromElement(collideElement);
      if (!data) return;

      collisions.push(data);
    });

    setCollisions(collisions);
  }, [getCollisionDataFromElement]);

  const searchItem = useCallback((blocks: BlockData[], id: number): Partial<{ block: BlockData; item: ItemData }> => {
    const block = blocks.find((block) => block.items.findIndex((item) => item.id === id) >= 0);
    if (!block) return {};

    return { block, item: block.items.find((item) => item.id === id) };
  }, []);

  const updateItem = useCallback(
    (blocks: BlockData[], targetItem: Partial<ItemData>) => {
      const { id } = targetItem;
      if (!id) return;

      const { item } = searchItem(blocks, id);
      if (!item) return;

      Object.assign(item, targetItem);
    },
    [searchItem],
  );

  const deleteItem = useCallback(
    (blocks: BlockData[], id: number) => {
      const { block } = searchItem(blocks, id);
      if (!block) return;

      const itemIdx = block.items.findIndex((item) => item.id === id);
      if (itemIdx < 0) return;

      block.items.splice(itemIdx, 1);
      return blocks;
    },
    [searchItem],
  );

  const addItem = useCallback((blocks: BlockData[], blockId: number, item: ItemData) => {
    const block = blocks.find((block) => block.id === blockId);
    if (!block) return;

    block.items.push(item);
  }, []);

  const initItemPosition = useCallback(
    (blocks: BlockData[], id: number) => {
      if (!inventoryRef.current) return;

      const { block, item } = searchItem(blocks, id);
      if (!block || !item) return;

      const blockElement = inventoryRef.current.querySelector<HTMLElement>(`[data-block-id="${block.id}"]`);
      const itemElement = inventoryRef.current.querySelector<HTMLElement>(`[data-item-id="${item.id}"]`);
      if (!blockElement || !itemElement) return;

      const inventoryRect = inventoryRef.current.getBoundingClientRect();
      const blockRect = blockElement.getBoundingClientRect();

      const itemStartPointOffsetLeft = blockRect.left - inventoryRect.left;
      const itemStartPointOffsetTop = blockRect.top - inventoryRect.top;

      const offsetLeft = item.position.x * CELL_SIZE + item.position.x * CELL_SPACING;
      const offsetTop = item.position.y * CELL_SIZE + item.position.y * CELL_SPACING;

      itemElement.style.left = `calc(${itemStartPointOffsetLeft}px + ${offsetLeft}rem)`;
      itemElement.style.top = `calc(${itemStartPointOffsetTop}px + ${offsetTop}rem)`;
    },
    [searchItem],
  );

  const updateItemPosition = useCallback((id: number, x: number, y: number) => {
    if (!inventoryRef.current || !movingItemOffsetRef.current) return;

    const inventoryRect = inventoryRef.current.getBoundingClientRect();

    const item = inventoryRef.current.querySelector(`[data-item-id="${id}"]`) as HTMLElement | null;
    if (!item) return;

    item.style.left = `${x - movingItemOffsetRef.current.x - inventoryRect.left}px`;
    item.style.top = `${y - movingItemOffsetRef.current.y - inventoryRect.top}px`;
    item.style.zIndex = "999";
  }, []);

  const placeItem = useCallback(() => {
    setBlocks((prevBlocks) => {
      if (!movingItemRef.current) return prevBlocks;

      const sourceItemId = movingItemRef.current;

      movingItemRef.current = null;
      movingItemOffsetRef.current = null;

      const blocks = [...prevBlocks];

      const { block: sourceBlock, item: sourceItem } = searchItem(blocks, sourceItemId);
      if (!sourceBlock || !sourceItem) return prevBlocks;

      const itemCollisions: ItemData[] = [];
      const blockCollisions: CollisionData<"block">[] = [];
      const cellCollisions: CellCollisionData[] = [];

      collisions.forEach((collision) => {
        if (isCellCollision(collision)) cellCollisions.push(collision);
        if (isCollisionType<"block">(collision) && collision.type === "block") blockCollisions.push(collision);

        if (isCollisionType<"item">(collision) && collision.type === "item") {
          const { block, item } = searchItem(blocks, collision.id);
          if (!block || !item || item.id === sourceItem.id) return;
          itemCollisions.push(item);
        }
      });

      if (itemCollisions.length) {
        const targetItems = itemCollisions.filter(
          (item) => item.hash === sourceItem.hash && item.count !== item.maxCount,
        );

        if (targetItems.length) {
          const targetItem = targetItems[0];
          if (targetItem.count + sourceItem.count > targetItem.maxCount) {
            updateItem(blocks, {
              id: sourceItem.id,
              count: sourceItem.count - (targetItem.maxCount - targetItem.count),
            });
            updateItem(blocks, { id: targetItem.id, count: targetItem.maxCount });
            initItemPosition(blocks, sourceItem.id);
            return blocks;
          } else {
            updateItem(blocks, { id: targetItem.id, count: targetItem.count + sourceItem.count });
            deleteItem(blocks, sourceItem.id);
            return blocks;
          }
        } else {
          initItemPosition(blocks, sourceItem.id);
          return blocks;
        }
      }

      if (!cellCollisions.length) {
        initItemPosition(blocks, sourceItem.id);
        return blocks;
      }

      const blockCells = cellCollisions.reduce(
        (acc, { blockId, x, y }) => {
          if (!acc[blockId]) acc[blockId] = [];
          acc[blockId].push({ x, y });
          return acc;
        },
        {} as Record<number, { x: number; y: number }[]>,
      );

      const sortedBlockCells = Object.entries(blockCells).sort(
        ([_aBlock, aCells], [_bBlock, bCells]) => bCells.length - aCells.length,
      );
      const [closestBlock, cells] = sortedBlockCells[0];
      const { x, y } = cells[0];

      if (sourceBlock.id === Number(closestBlock)) {
        updateItem(blocks, { id: sourceItem.id, position: { x, y } });
      } else {
        const itemCopy: ItemData = { ...sourceItem, position: { x, y } };
        deleteItem(blocks, sourceItem.id);
        addItem(blocks, Number(closestBlock), itemCopy);
      }

      initItemPosition(blocks, sourceItem.id);

      return blocks;
    });

    setCollisions([]);
  }, [collisions, searchItem, updateItem, deleteItem, addItem, initItemPosition]);

  const onMoveStart = useCallback((event: React.MouseEvent<HTMLElement>, id: number) => {
    const rect = event.currentTarget.getBoundingClientRect();

    movingItemRef.current = id;
    movingItemOffsetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }, []);

  const onMove = useCallback(
    (event: MouseEvent) => {
      if (!movingItemRef.current) return;

      updateItemPosition(movingItemRef.current, event.screenX, event.screenY);

      if (!askTimeout.current) {
        getCollisions();
        askTimeout.current = setTimeout(() => (askTimeout.current = null), 50);
      }
    },
    [updateItemPosition, getCollisions],
  );

  const onMoveEnd = useCallback(() => {
    placeItem();

    if (inventoryRef.current && movingItemRef.current) {
      const item = inventoryRef.current.querySelector(
        `[data-item-id="${movingItemRef.current}"]`,
      ) as HTMLElement | null;

      if (item) {
        item.style.zIndex = "1";
      }
    }

    if (askTimeout.current) {
      clearTimeout(askTimeout.current);
      askTimeout.current = null;
    }
  }, [placeItem]);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onMoveEnd);

    setBlocks(Object.values(inventory));

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onMoveEnd);
    };
  }, [onMove, onMoveEnd]);

  return { collisions, blocks, onMoveStart, initItemPosition };
}
