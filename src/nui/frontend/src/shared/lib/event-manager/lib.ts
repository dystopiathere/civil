import type { Event, NUIResponse } from "./types";

export async function invoke<T extends object, R extends object>(
  event: Event,
  data?: T,
): Promise<NUIResponse<R> | false> {
  const response = await fetch(`https://nui/${event}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return false;
  }

  return (await response.json()) as NUIResponse<R>;
}
