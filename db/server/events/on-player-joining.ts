import { tempIdsMapping } from "../mappings";
import { CharacterModel, PlayerModel } from "../entities";

export async function onPlayerJoining(oldId: string) {
  const playerSource = global.source;

  const playerId = tempIdsMapping[oldId];

  const playerModel = new PlayerModel();
  const characterModel = new CharacterModel();

  let character = await playerModel.getActiveCharacter(playerId);

  if (!character) {
    const newCharacter = await characterModel.create();

    if (!newCharacter) {
      console.error("Can't create character");
      return;
    }

    const assigned = await characterModel.assignToPlayer(newCharacter.id, playerId);

    if (!assigned) {
      console.error("Can't assign character to player");
      return;
    }

    character = newCharacter;
  }

  const headBlends = await characterModel.getHeadBlends(character.id);
  const faceFeatures = await characterModel.getFaceFeatures(character.id);
  const skills = await characterModel.getSkills(character.id);
  const componentVariations = await characterModel.getComponentVariations(character.id);
  const headOverlays = await characterModel.getHeadOverlays(character.id);

  const data = {
    player_id: playerId,
    ...character,
    head_blends: headBlends,
    face_features: faceFeatures,
    skills: skills,
    component_variations: componentVariations,
    head_overlays: headOverlays,
  };

  Object.entries(data).forEach(([key, value]) => {
    Player(playerSource).state.set(key, value, true);
  });
}
