import { CivilDataSource } from "~/data-source";
import { tempIdsMapping } from "../mappings";
import { Player as PlayerEntity } from "~/entities/Player";
import { Character } from "~/entities/Character";
import { HeadBlends } from "~/entities/HeadBlends";
import { FaceFeatures } from "~/entities/FaceFeatures";
import { HeadOverlays } from "~/entities/HeadOverlays";
import { ComponentVariations } from "~/entities/ComponentVariations";
import { Skills } from "~/entities/Skills";

export async function onPlayerJoining(oldId: string) {
  const playerSource = global.source;

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

      character.head_blends = new HeadBlends();
      character.face_features = new FaceFeatures();
      character.head_overlays = new HeadOverlays();
      character.component_variations = new ComponentVariations();
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
