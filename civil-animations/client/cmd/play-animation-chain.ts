import { AnimationChainName } from "types/civil";
import { playAnimationChain } from "../lib";

RegisterCommand(
  "play-animation-chain",
  async (source: number, args: string[], raw: string) => {
    const ped = GetPlayerPed(-1);

    playAnimationChain(ped, args[0] as AnimationChainName);
  },
  false,
);
