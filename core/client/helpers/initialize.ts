export function initialize(resourceName: string, init: () => CallableFunction | void, dependencies?: string[]): void {
  on("onClientResourceStart", (startedResourceName: string) => {
    if (resourceName !== startedResourceName) {
      return;
    }

    if (dependencies) {
      const interval = setInterval(() => {
        if (!dependencies.every((dependency) => GetResourceState(dependency) === "started")) {
          return;
        }

        init();
        clearInterval(interval);
      }, 500);
    } else {
      init();
    }
  });

  on("onClientResourceStop", (stoppedResourceName: string) => {
    if (resourceName !== stoppedResourceName) {
      return;
    }
  });
}
