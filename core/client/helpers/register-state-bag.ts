export function registerStateBag<T extends keyof LocalPlayerStateBagInterface>(
  keyFilter: string,
  bagFilter: string,
  keys: T[],
  handlers: Record<T, CallableFunction>,
) {
  AddStateBagChangeHandler(keyFilter, bagFilter, (bagName: string, key: T, value: LocalPlayerStateBagInterface[T]) => {
    if (!keys.includes(key)) {
      return;
    }

    handlers[key](value);
  });
}
