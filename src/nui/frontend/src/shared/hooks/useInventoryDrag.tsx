import type { CollisionEvent, DragDropEventHandlers, DragEndEvent } from "@dnd-kit/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BlockData, CellData, ItemData } from "~/widgets";

export function useInventoryDrag(data: ItemData[]) {
  const [items, setItems] = useState<ItemData[]>(data);
  const [highlightCells, setHighlightCells] = useState<{ place: string; id: number; row: number }[]>([]);

  const hightlightTimeout = useRef<number>(null);
  const draggingItem = useRef<Partial<ItemData>>(null);
  const lastCollisions = useRef<CollisionEvent["collisions"]>(null);

  useEffect(() => {
    return () => {
      if (hightlightTimeout.current) {
        clearTimeout(hightlightTimeout.current);
      }
    };
  }, []);

  // NORMALIZERS
  const normalizeCell = useCallback((data: string) => {
    const [place, cellId, row] = data.split("|");

    return {
      place,
      id: Number(cellId),
      row: Number(row),
    };
  }, []);

  const normalizeItem = useCallback((data: string) => {
    const [id, hash, count, maxCount, sizeX, sizeY] = data.split("|");

    return {
      id: Number(id),
      hash,
      count: Number(count),
      maxCount: Number(maxCount),
      size: { x: Number(sizeX), y: Number(sizeY) },
    };
  }, []);

  const normalizeBlock = useCallback((data: string) => {
    const [place, sizeX, sizeY] = data.split("|");

    return {
      place,
      size: { x: Number(sizeX), y: Number(sizeY) },
    };
  }, []);

  // HELPERS
  const getNamedCollisions = useCallback((name: string) => {
    if (!lastCollisions.current) {
      return [];
    }

    return lastCollisions.current.filter(({ id }) => id.toString().startsWith(name)).sort((a, b) => b.value - a.value);
  }, []);

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

  const mapCollisions = useCallback((collisions: CollisionEvent["collisions"], normalizer: (data: string) => any) => {
    return collisions.map(({ id }) => {
      const [_, data] = id.toString().split(":");

      return normalizer(data);
    });
  }, []);

  const getClosestCellWithOffset = useCallback(({ operation }: DragEndEvent) => {
    const { activatorEvent, shape } = operation;

    if (!draggingItem.current || !activatorEvent || !shape) {
      return;
    }

    const item = draggingItem.current as ItemData;

    const { clientX, clientY } = activatorEvent as MouseEvent;
    const { left, top, width, height } = shape.initial.boundingRectangle;

    const point = {
      x: (clientX - left) / width,
      y: (clientY - top) / height,
    };

    const offset = {
      x: Math.floor(item.size.x * point.x),
      y: Math.floor(item.size.y * point.y),
    };

    const collisionCells = getNamedCollisions("cell");
    const cells = mapCollisions(collisionCells, normalizeCell);
    const { place, id: closestCellId, row: closestCellRow } = cells[0];

    return {
      place,
      position: { x: closestCellId - offset.x, y: closestCellRow - offset.y },
    };
  }, []);

  // HIGHLIGHT HANDLER
  const handleHighlightCells = useCallback(() => {
    if (!draggingItem.current) {
      return;
    }

    if (hightlightTimeout.current) {
      clearTimeout(hightlightTimeout.current);
      setHighlightCells([]);
    }

    const { x, y } = draggingItem.current.size!;
    const volume = x * y;
    const highlightVolume = volume;

    const cellCollisions = getNamedCollisions("cell");
    const cells = mapCollisions(cellCollisions, normalizeCell);

    setHighlightCells(cells.slice(0, highlightVolume));

    hightlightTimeout.current = setTimeout(() => {
      setHighlightCells([]);
      hightlightTimeout.current = null;
    }, 500);
  }, []);

  // RESTRICTIONS
  const hasItemsCollision = useCallback(() => {
    if (!draggingItem.current) {
      return false;
    }

    const item = draggingItem.current as ItemData;

    const collisionItems = getNamedCollisions("item");
    const items = mapCollisions(collisionItems, normalizeItem);

    const hasAnotherItem = items.some((el) => el.id !== item.id && el.hash === item.hash);

    return items.length > 0 && hasAnotherItem;
  }, []);

  const isCellFitsBlock = useCallback((cell: CellData) => {
    if (cell.position.x < 0 || cell.position.y < 0) {
      return false;
    }

    if (!draggingItem.current) {
      return false;
    }

    const item = draggingItem.current as ItemData;

    const collisionBlocks = getNamedCollisions("block");
    const blocks = mapCollisions(collisionBlocks, normalizeBlock);
    const closestBlock = blocks.find((block) => block.place === cell.place) as BlockData;
    if (!closestBlock) {
      return false;
    }

    const fitsX = cell.position.x + item.size.x <= closestBlock.size.x;
    const fitsY = cell.position.y + item.size.y <= closestBlock.size.y;

    return fitsX && fitsY;
  }, []);

  // DROP HANDLERS
  const handleItemsCollision = useCallback(() => {
    if (!draggingItem.current) {
      return;
    }

    const item = draggingItem.current as ItemData;

    const collisionItems = getNamedCollisions("item");
    const items = mapCollisions(collisionItems, normalizeItem);

    const closestItem = items[0];

    if (!closestItem) {
      return;
    }

    if (closestItem.count + item.count > closestItem.maxCount) {
      const deltaCount = closestItem.maxCount - closestItem.count;

      changeItem(closestItem.id, { count: closestItem.count + deltaCount });
      changeItem(item.id, { count: item.count - deltaCount });
    } else {
      changeItem(closestItem.id, { count: closestItem.count + item.count });
      changeItem(item.id, null);
    }
  }, []);

  // DRAG EVENTS HANDLERS
  const onStart = useCallback<DragDropEventHandlers["onDragStart"]>(({ operation }) => {
    const { source } = operation;
    if (!source) {
      return;
    }

    draggingItem.current = normalizeItem(source.id.toString());
  }, []);

  const onCollision = useCallback<DragDropEventHandlers["onCollision"]>(({ collisions }) => {
    if (collisions.length === 0) {
      return;
    }

    lastCollisions.current = collisions;

    handleHighlightCells();
  }, []);

  const onStop = useCallback<DragDropEventHandlers["onDragEnd"]>((event) => {
    if (!draggingItem.current) {
      return;
    }

    const item = draggingItem.current as ItemData;

    if (hasItemsCollision()) {
      handleItemsCollision();
    } else {
      const closestCell = getClosestCellWithOffset(event);

      if (closestCell && isCellFitsBlock(closestCell)) {
        changeItem(item.id, closestCell);
      }
    }

    draggingItem.current = null;
    lastCollisions.current = null;
  }, []);

  return { items, highlightCells, onStart, onStop, onCollision };
}
