import { AnimationChainName } from "types/civil";
import { animationChains, flagsMapping } from "../config";

export async function playAnimationChain(ped: number, chainName: AnimationChainName): Promise<void> {
  const chainData = animationChains[chainName];

  const animDicts = new Set<string>();

  // @ts-ignore
  const sequence = OpenSequenceTask() as number;

  console.log(sequence);

  for (const { dictionary, name, flags, duration } of chainData) {
    if (!animDicts.has(dictionary)) {
      animDicts.add(dictionary);

      RequestAnimDict(dictionary);
      while (!HasAnimDictLoaded(dictionary)) {
        await exports.civil_helpers.delay(500);
      }
    }

    const calculatedFlags = flags.reduce((acc, flag) => acc + flagsMapping[flag], 0);

    console.log(name);

    TaskPlayAnim(ped, dictionary, name, 1.0, 1.0, duration ?? -1, calculatedFlags, 0.0, false, false, false);
  }

  CloseSequenceTask(sequence);

  TaskPerformSequence(ped, sequence);

  ClearSequenceTask(sequence);

  animDicts.forEach((dict) => {
    RemoveAnimDict(dict);
  });
}
