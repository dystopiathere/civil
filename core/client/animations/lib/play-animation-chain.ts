import { delay } from "~/helpers";
import { chains, flagsMapping } from "../configs";

export async function playAnimationChain(ped: number, chainName: string): Promise<void> {
  const chain = chains[chainName];

  if (!chain) {
    return;
  }

  const animDicts = new Set<string>();

  // @ts-ignore
  const sequence = OpenSequenceTask() as number;

  for (const { dictionary, name, flags, duration } of chain) {
    if (!animDicts.has(dictionary)) {
      animDicts.add(dictionary);

      RequestAnimDict(dictionary);
      while (!HasAnimDictLoaded(dictionary)) {
        await delay(500);
      }
    }

    const calculatedFlags = flags.reduce((acc, flag) => acc + flagsMapping[flag], 0);

    TaskPlayAnim(ped, dictionary, name, 1.0, 1.0, duration ?? -1, calculatedFlags, 0.0, false, false, false);
  }

  CloseSequenceTask(sequence);

  TaskPerformSequence(ped, sequence);

  ClearSequenceTask(sequence);

  animDicts.forEach((dict) => {
    RemoveAnimDict(dict);
  });
}
