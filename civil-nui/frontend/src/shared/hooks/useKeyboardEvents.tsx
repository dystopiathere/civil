import { useEffect } from "react";
import { closeComponent } from "~/shared/lib/event-manager";

export function useKeyboardEvents() {
  useEffect(() => {
    window.onkeydown = (event) => {
      if (event.code === "Escape") {
        closeComponent();
      }
    };

    return () => {
      window.onkeydown = null;
    };
  }, []);
}
