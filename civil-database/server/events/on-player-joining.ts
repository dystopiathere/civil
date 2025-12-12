import { tempIdsMapping } from "../mappings";
import { CharacterModel, PlayerModel } from "../entities";

on("playerJoining", async (oldId: string) => {
  const playerSource = global.source;

  const playerId = tempIdsMapping[oldId];

  const playerModel = new PlayerModel();
  const characterModel = new CharacterModel();

  let character = await playerModel.getActiveCharacter(playerId);

  if (!character) {
    const newCharacter = await characterModel.create();

    if (!newCharacter) {
      console.log("Can't create character");
      return;
    }

    const assigned = await characterModel.assignToPlayer(newCharacter.id, playerId);

    if (!assigned) {
      console.log("Can't assign character to player");
      return;
    }
  }

  const characterId = character.id;

  delete character.id;
  delete character.created_at;
  delete character.updated_at;

  const headBlends = await characterModel.getHeadBlends(characterId);
  const faceFeatures = await characterModel.getFaceFeatures(characterId);
  const skills = await characterModel.getSkills(characterId);
  const componentVariations = await characterModel.getComponentVariations(characterId);
  const headOverlays = await characterModel.getHeadOverlays(characterId);

  delete headBlends.id;
  delete headBlends.created_at;
  delete headBlends.updated_at;

  delete faceFeatures.id;
  delete faceFeatures.created_at;
  delete faceFeatures.updated_at;

  delete skills.id;

  delete componentVariations.id;
  delete componentVariations.created_at;
  delete componentVariations.updated_at;

  delete headOverlays.id;
  delete headOverlays.created_at;
  delete headOverlays.updated_at;

  const data = {
    player_id: playerId,
    character_id: characterId,
    ...character,
    ...headBlends,
    ...faceFeatures,
    ...skills,
    ...componentVariations,
    ...headOverlays,
  };

  Object.entries(data).forEach(([key, value]) => {
    Player(playerSource).state.set(key, value, true);
  });
});
