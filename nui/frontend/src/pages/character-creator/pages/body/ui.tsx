import { useEffect } from "react";
import { renavigate } from "~/shared/lib";

export function CharacterCreatorBody() {
  useEffect(() => {
    renavigate({ page: "characterCreatorBody" });
  }, []);

  return <div className="character-creator-page">Body</div>;
}
