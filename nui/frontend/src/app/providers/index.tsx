import { BrowserRouter } from "./RouterProvider";
import { withSuspense } from "~/shared/lib/react";

function Providers() {
  return <BrowserRouter />;
}

export const Provider = withSuspense(Providers, {
  fallback: <div>Fallback</div>,
});
