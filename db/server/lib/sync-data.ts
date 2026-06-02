import { CharacterEntity } from "@civil/types";
import { CivilDataSource } from "~/data-source";
import { Character } from "~/entities/Character";

export async function syncData(data: Partial<CharacterEntity>) {
  try {
    if (!data.id) {
      throw new Error("Character ID not provided");
    }

    const characterRepository = CivilDataSource.getRepository(Character);
    await characterRepository.update(data.id, data);
  } catch (err) {
    console.error(err);
  }
}
