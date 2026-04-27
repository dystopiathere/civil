export function setTime(source: number, args: number[], raw: string) {
  NetworkOverrideClockTime(Number(args[0]), 0, 0);

  console.log(GetClockHours());
}
