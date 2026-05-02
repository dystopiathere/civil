import { CharacterEntity } from "types/civil";
import { QueryBuilder } from "./helpers";
// import { registerEvents } from "./lib";

// registerEvents();

(async () => {
  const query = new QueryBuilder<CharacterEntity>();

  query.action = "insert";
  query.table = { name: "test_table1", alias: "tt1" };
  query.values = {
    firstname: ":firstname",
    lastname: ":lastname",
    age: ":age",
    sex: ":sex",
    health: ":health",
    max_health: ":max_health",
    armour: ":armour",
    max_armour: "max_armour",
    eye_color: ":eye_color",
    hair_first_color: ":hair_first_color",
    last_position: ":last_position",
    model: ":model",
    knockdown: ":knockdown",
  };

  const result = await query.send();

  console.log(result);
})();
