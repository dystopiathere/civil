import { CharacterDto } from "@civil/types";
import { CivilDataSource } from "~/data-source";
import { Character } from "~/entities/Character";

export async function syncData(id: number, data: CharacterDto) {
  try {
    if (!id) {
      throw new Error("Character ID not provided");
    }

    const characterRepository = CivilDataSource.getRepository(Character);
    const character = await characterRepository.findOneBy({ id });
    if (!character) {
      throw new Error("Character not found");
    }

    characterRepository.merge(character, data);
    await characterRepository.save(character);
  } catch (err) {
    console.error(err);
  }
}
