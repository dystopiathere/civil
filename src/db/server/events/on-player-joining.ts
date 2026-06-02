import { CharacterEntity } from "@civil/types";
import { TypedPlayer } from "@civil/typed-helpers/server";
import { CivilDataSource } from "~/data-source";
import {
  Character,
  ComponentVariations,
  FaceFeatures,
  HeadBlends,
  HeadOverlays,
  Player as PlayerEntity,
  Skills,
} from "~/entities";
import { tempIdsMapping } from "../mappings";

export async function onPlayerJoining(oldId: string) {
  const playerSource = global.source;

  const playerRepository = CivilDataSource.getRepository(PlayerEntity);
  const playerId = tempIdsMapping[oldId];
  const player = await playerRepository.findOneBy({ id: playerId });

  if (!player) {
    console.error("Player not found, id: ", playerId);
    return;
  }

  if (!player.characters.length) {
    try {
      const character = new Character();
      character.headBlends = new HeadBlends();
      character.faceFeatures = new FaceFeatures();
      character.headOverlays = new HeadOverlays();
      character.componentVariations = new ComponentVariations();
      character.skills = new Skills();

      player.characters = [character];
      await playerRepository.save(player);
    } catch (err) {
      console.error("Failed to create character", err);
      return;
    }
  }

  const character = player.characters[0];

  const p = TypedPlayer(playerSource);
  p.state.set("playerId", playerId, true);
  Object.entries(character).forEach(([key, value]) => {
    p.state.set(key as keyof CharacterEntity, value, true);
  });
}
