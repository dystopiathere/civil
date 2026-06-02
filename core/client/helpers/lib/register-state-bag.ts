import { CharacterState } from "@civil/types";

export function registerStateBag<T extends keyof CharacterState>(
  keyFilter: string,
  bagFilter: string,
  keys: T[],
  handlers: Record<T, CallableFunction>,
) {
  AddStateBagChangeHandler(keyFilter, bagFilter, (bagName: string, key: T, value: CharacterState[T]) => {
    if (!keys.includes(key)) {
      return;
    }

    handlers[key](value);
  });
}
