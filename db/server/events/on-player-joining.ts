import { CivilDataSource } from "~/data-source";
import { tempIdsMapping } from "../mappings";
import {
  Character,
  ComponentVariations,
  FaceFeatures,
  HeadBlends,
  HeadOverlays,
  Player as PlayerEntity,
  Skills,
} from "~/entities";

export async function onPlayerJoining(oldId: string) {
  const playerSource = globalThis.source;

  const playerRepository = CivilDataSource.getRepository(PlayerEntity);
  const playerId = tempIdsMapping[oldId];
  const player = await playerRepository.findOneBy({ id: playerId });

  if (!player) {
    console.error("Player not found, id: ", playerId);
    return;
  }

  const characterRepository = CivilDataSource.getRepository(Character);
  const characters = await player.characters;

  let character: Character;

  if (!characters.length) {
    try {
      character = new Character();
      character.player = Promise.resolve(player);

      character.headBlends = new HeadBlends();
      character.faceFeatures = new FaceFeatures();
      character.headOverlays = new HeadOverlays();
      character.componentVariations = new ComponentVariations();
      character.skills = new Skills();

      character = await characterRepository.save(character);
    } catch {
      console.error("Failed to create character");
      return;
    }
  } else {
    character = characters[0];
  }

  Object.entries(character).forEach(([key, value]) => {
    Player(playerSource).state.set(key, value, true);
  });
}
