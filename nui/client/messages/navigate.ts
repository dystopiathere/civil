export function navigate(page: string) {
  SendNuiMessage(
    JSON.stringify({
      name: "navigate",
      data: {
        page,
      },
    }),
  );
}
