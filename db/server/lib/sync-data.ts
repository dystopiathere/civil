import { CharacterEntity } from "types/civil";
import { CivilDataSource } from "~/data-source";
import { Character } from "~/entities/Character";

export async function syncData(data: CharacterEntity) {
  try {
    const characterRepository = CivilDataSource.getRepository(Character);
    await characterRepository.update(data.id, data);
  } catch (err) {
    console.error(err);
  }
}
