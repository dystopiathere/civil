import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { CELL_SIZE, CELL_SPACING } from "../constants";

type BlockData = {
  element: HTMLElement;
  size: {
    x: number;
    y: number;
  };
};

type CellData = {
  element: HTMLElement;
  position: {
    x: number;
    y: number;
  };
};

type ItemData = {
  element: HTMLElement;
  hash: string;
  count: number;
  maxCount: number;
  size: {
    x: number;
    y: number;
  };
  position: {
    x: number;
    y: number;
  };
};

type CollisionGroup = "blocks" | "cells" | "items";

type CollisionData = Record<string, Partial<Record<CollisionGroup, (ItemData | CellData | BlockData)[]>>>;

const MARKERS_GAP = 20;

const BLOCK_CLASSNAME = "inventory-block__container";
const CELL_CLASSNAME = "inventory-cell";
const ITEM_CLASSNAME = "inventory-item";

export function useInventoryDrag(inventoryRef: RefObject<HTMLElement | null>) {
  const [highlightCells, setHighlightCells] = useState<(CellData & { place: string })[]>([]);

  const blocksRef = useRef<Record<string, BlockData>>({});
  const cellsRef = useRef<Record<string, CellData[]>>({});
  const itemsRef = useRef<Record<string, ItemData[]>>({});

  const movingItemRef = useRef<ItemData>(null);

  const askTimeoutRef = useRef<number>(null);

  const getBlockDataFromElement = useCallback((element: HTMLElement): [string, BlockData | null] => {
    const { place, sizeX, sizeY } = element.dataset;
    if (!place) return ["", null];

    return [place, { element, size: { x: Number(sizeX), y: Number(sizeY) } }];
  }, []);

  const getItemDataFromElement = useCallback((element: HTMLElement): [string, ItemData | null] => {
    const { hash, place, count, maxCount, sizeX, sizeY, positionX, positionY } = element.dataset;
    if (!place) return ["", null];

    return [
      place,
      {
        element,
        hash: hash ?? "",
        count: Number(count),
        maxCount: Number(maxCount),
        size: { x: Number(sizeX), y: Number(sizeY) },
        position: { x: Number(positionX), y: Number(positionY) },
      },
    ];
  }, []);

  const getCellDataFromElement = useCallback((element: HTMLElement): [string, CellData | null] => {
    const { place, positionX, positionY } = element.dataset;
    if (!place) return ["", null];

    return [place, { element, position: { x: Number(positionX), y: Number(positionY) } }];
  }, []);

  const getCollisionDataFromElement = useCallback(
    (element: HTMLElement): [CollisionGroup | null, string, (BlockData | ItemData | CellData) | null] => {
      if (element.classList.contains(BLOCK_CLASSNAME)) return ["blocks", ...getBlockDataFromElement(element)];
      if (element.classList.contains(CELL_CLASSNAME)) return ["cells", ...getCellDataFromElement(element)];
      if (element.classList.contains(ITEM_CLASSNAME)) return ["items", ...getItemDataFromElement(element)];

      return [null, "", null];
    },
    [],
  );

  const getCollisions = useCallback((item: ItemData): CollisionData => {
    const rect = item.element.getBoundingClientRect();

    const markersCountX = rect.width / MARKERS_GAP;
    const markersCountY = rect.height / MARKERS_GAP;

    const markersCoords = [];

    for (let i = 0; i < markersCountY; i++) {
      const y = rect.top + MARKERS_GAP * i;

      for (let j = 0; j < markersCountX; j++) {
        const x = rect.left + MARKERS_GAP * j;

        markersCoords.push({ x, y });
      }
    }

    const collisions: CollisionData = {};

    markersCoords.forEach(({ x, y }) => {
      const collideElements = document.elementsFromPoint(x, y) as HTMLElement[];

      collideElements.forEach((collideElement) => {
        const [name, place, data] = getCollisionDataFromElement(collideElement);
        if (!name || !place || !data) return;

        if (!collisions[place]) collisions[place] = {};
        if (!collisions[place][name]) collisions[place][name] = [];
        collisions[place][name].push(data);
      });
    });

    return collisions;
  }, []);

  useEffect(() => {
    if (!inventoryRef.current) return;

    const inventoryRect = inventoryRef.current.getBoundingClientRect();

    inventoryRef.current.onmouseup = () => (movingItemRef.current = null);
    inventoryRef.current.onmouseleave = () => (movingItemRef.current = null);
    inventoryRef.current.onmousemove = (event) => {
      if (!movingItemRef.current) return;

      if (!askTimeoutRef.current) {
        askTimeoutRef.current = setTimeout(() => {
          askTimeoutRef.current = null;

          const collisions = getCollisions(movingItemRef.current!);

          const cells: (CellData & { place: string })[] = [];
          Object.values(collisions).forEach((collisionData) => {
            if (!collisionData.cells) return;
            cells.push(
              ...collisionData.cells.map((cell) => {
                const place = cell.element.dataset.place;

                return { place, ...cell } as CellData & { place: string };
              }),
            );
          });

          setHighlightCells(cells);
        }, 50);
      }

      movingItemRef.current.element.style.left = `${event.screenX - inventoryRect.left}px`;
      movingItemRef.current.element.style.top = `${event.screenY - inventoryRect.top}px`;
    };

    const blocks = inventoryRef.current.querySelectorAll<HTMLElement>(`.${BLOCK_CLASSNAME}`);
    const cells = inventoryRef.current.querySelectorAll<HTMLElement>(`.${CELL_CLASSNAME}`);
    const items = inventoryRef.current.querySelectorAll<HTMLElement>(`.${ITEM_CLASSNAME}`);

    blocks.forEach((element) => {
      const [place, block] = getBlockDataFromElement(element);
      if (!place || !block) return;

      blocksRef.current[place] = block;
    });

    cells.forEach((element) => {
      const [place, cell] = getCellDataFromElement(element);
      if (!place || !cell) return;

      if (!cellsRef.current[place]) cellsRef.current[place] = [];
      cellsRef.current[place].push(cell);
    });

    items.forEach((element) => {
      const [place, item] = getItemDataFromElement(element);
      if (!place || !item) return;

      if (!itemsRef.current[place]) itemsRef.current[place] = [];
      itemsRef.current[place].push(item);

      const block = blocksRef.current[place];
      if (!block) return;

      const blockRect = block.element.getBoundingClientRect();

      const itemStartPointOffsetLeft = blockRect.left - inventoryRect.left;
      const itemStartPointOffsetTop = blockRect.top - inventoryRect.top;

      const offsetLeft = item.position.x * CELL_SIZE + item.position.x * CELL_SPACING;
      const offsetTop = item.position.y * CELL_SIZE + item.position.y * CELL_SPACING;

      element.style.left = `calc(${itemStartPointOffsetLeft}px + ${offsetLeft}rem)`;
      element.style.top = `calc(${itemStartPointOffsetTop}px + ${offsetTop}rem)`;

      element.onmousedown = () => (movingItemRef.current = item);
    });

    return () => {
      if (!inventoryRef.current || !itemsRef.current) return;

      if (askTimeoutRef.current) {
        clearTimeout(askTimeoutRef.current);
      }

      inventoryRef.current.onmouseup = null;
      inventoryRef.current.onmouseleave = null;
      inventoryRef.current.onmousemove = null;

      Object.entries(itemsRef.current).forEach(([_, items]) => {
        items.forEach((item) => {
          item.element.onmousedown = null;
        });
      });
    };
  }, []);

  return { highlightCells };
}
