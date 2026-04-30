import { FullCharacterEntity } from "types/civil";
import { CharacterModel } from "../entities";

export async function syncData(_: FullCharacterEntity) {
  const characterModel = new CharacterModel();
  const promises = [];
  for (const relation of characterModel.relations) {
    promises.push(async () => {
      const relationData = data[relation.tableName as keyof FullCharacterEntity] as Record<string, any>;
      const relationModel = await characterModel.belongsToRelation(relation, relationData.id);
      if (!relationModel || !relationModel.length) {
        return;
      }
      await relation.update(relationModel[0].id, relationData);
    });
  }
  await Promise.all(promises);
  await characterModel.update(data.id, data);
}
