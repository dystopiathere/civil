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

  Object.entries({
    ...character,
    ...(await characterModel.getHeadBlends(character.id)),
    ...(await characterModel.getFaceFeatures(character.id)),
    ...(await characterModel.getSkills(character.id)),
    ...(await characterModel.getComponentVariations(character.id)),
    ...(await characterModel.getHeadOverlays(character.id)),
  }).forEach(([key, value]) => {
    Player(playerSource).state.set(key, value, true);
  });
});
