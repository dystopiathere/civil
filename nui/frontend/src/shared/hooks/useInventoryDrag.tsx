import type { CollisionEvent, DragDropEventHandlers } from "@dnd-kit/react";
import { useCallback, useRef, useState } from "react";
import type { ItemData } from "~/widgets";

export function useInventoryDrag(data: ItemData[]) {
  const [items, setItems] = useState<ItemData[]>(data);
  const [highlightCells, setHighlightCells] = useState<{ place: string; id: number; row: number }[]>([]);

  const hightlightTimeout = useRef<number>(null);
  const draggingItem = useRef<Partial<ItemData>>(null);
  const lastCollisions = useRef<CollisionEvent["collisions"]>(null);

  const changeItem = useCallback((id: number, data: Partial<ItemData> | null) => {
    setItems((prev) => {
      const index = prev.findIndex(({ id: prevId }) => prevId === id);
      if (index < 0) {
        return prev;
      }

      if (!data) {
        prev.splice(index, 1);
        return [...prev];
      }

      const item = prev[index];

      Object.assign(item, data);

      return [...prev];
    });
  }, []);

  const hasItemsCollision = useCallback((item: ItemData, collisions: CollisionEvent["collisions"]) => {
    const collisionItems = collisions
      .filter(({ id }) => id.toString().startsWith("item"))
      .sort((a, b) => b.value - a.value)
      .map(({ id }) => {
        const [_, itemData] = id.toString().split(":");
        const [itemId, hash, count, maxCount, sizeX, sizeY] = itemData.split("|");

        return {
          id: Number(itemId),
          hash,
          count: Number(count),
          maxCount: Number(maxCount),
          size: { x: Number(sizeX), y: Number(sizeY) },
        };
      });

    if (
      collisionItems.length === 0 ||
      !collisionItems.some((collisionItem) => collisionItem.id !== item.id && collisionItem.hash === item.hash)
    ) {
      return;
    }

    return collisionItems;
  }, []);

  const handleItemsCollision = useCallback((item: ItemData, collisionItems: Partial<ItemData>[]) => {
    const closestCollisionItem = collisionItems[0] as ItemData;

    if (!closestCollisionItem) {
      return;
    }

    if (closestCollisionItem.count + item.count > closestCollisionItem.maxCount) {
      const deltaCount = closestCollisionItem.maxCount - closestCollisionItem.count;

      changeItem(closestCollisionItem.id, { count: closestCollisionItem.count + deltaCount });
      changeItem(item.id, { count: item.count - deltaCount });
    } else {
      changeItem(closestCollisionItem.id, { count: closestCollisionItem.count + item.count });
      changeItem(item.id, null);
    }
  }, []);

  const onStart = useCallback<DragDropEventHandlers["onDragStart"]>(({ operation }) => {
    const { source } = operation;
    if (!source) {
      return;
    }

    const [id, hash, count, maxCount, sizeX, sizeY] = source.id.toString().split("|");
    draggingItem.current = {
      id: Number(id),
      hash,
      count: Number(count),
      maxCount: Number(maxCount),
      size: { x: Number(sizeX), y: Number(sizeY) },
    };
  }, []);

  const onCollision = useCallback<DragDropEventHandlers["onCollision"]>(({ collisions }) => {
    if (!draggingItem.current) {
      return;
    }

    lastCollisions.current = collisions;

    if (hightlightTimeout.current) {
      clearTimeout(hightlightTimeout.current);
      setHighlightCells([]);
    }

    const cells = collisions
      .filter(({ id }) => id.toString().startsWith("cell"))
      .sort((a, b) => b.value - a.value)
      .slice(0, draggingItem.current.size!.x * draggingItem.current.size!.y * 0.8)
      .map(({ id }) => {
        const [_, cellData] = id.toString().split(":");
        const [place, cellId, row] = cellData.split("|");

        return {
          place,
          id: Number(cellId),
          row: Number(row),
        };
      });

    setHighlightCells(cells);

    hightlightTimeout.current = setTimeout(() => {
      setHighlightCells([]);
      hightlightTimeout.current = null;
    }, 500);
  }, []);

  const onStop = useCallback<DragDropEventHandlers["onDragEnd"]>(() => {
    if (!lastCollisions.current || !draggingItem.current) {
      return;
    }

    const collisions = lastCollisions.current;
    const item = draggingItem.current as ItemData;

    const itemsCollision = hasItemsCollision(item, collisions);

    if (itemsCollision) {
      return handleItemsCollision(item, itemsCollision);
    }
  }, []);

  return { items, highlightCells, onStart, onStop, onCollision };
}
