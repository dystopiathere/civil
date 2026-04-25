export function initialize(resourceName: string, init: () => CallableFunction | void) {
  on("onClientResourceStart", (startedResourceName: string) => {
    if (resourceName !== startedResourceName) {
      return;
    }

    const stop = init();

    if (stop)
      on("onClientResourceStop", (stoppedResourceName: string) => {
        if (resourceName !== stoppedResourceName) {
          return;
        }

        stop();
      });
  });
}
