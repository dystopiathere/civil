import { useEffect } from "react";
import { useCharacterStore } from "~/entities/character";
import { getComponentVariation, renavigate } from "~/shared/lib/event-manager";
import { clothes } from "./config";
import { ClothesInputGroup } from "~/widgets/clothes-input-group";

export function CharacterCreatorClothes() {
  const { componentVariations, setComponentVariations: stateSetComponentVariations } = useCharacterStore();

  useEffect(() => {
    renavigate({ page: "characterCreatorClothes" });

    getComponentVariation().then((data) => {
      if (!data) {
        return;
      }

      const [result, error] = data;

      if (error) {
        console.error(error);
        return;
      }

      if (result) {
        stateSetComponentVariations(result);
      }
    });
  }, [stateSetComponentVariations]);

  return (
    componentVariations && (
      <div className="character-creator-page">
        {clothes.map((data, key) => {
          return <ClothesInputGroup key={key} id={key} data={data} />;
        })}
      </div>
    )
  );
}
