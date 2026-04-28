import dayjs from "dayjs";
import { ConnectionModel, PlayerModel } from "../entities";
import { tempIdsMapping } from "../mappings";
import { Deferrals, Identifiers } from "../types";

export function onPlayerConnecting(name: string, setKickReason: (reason: string) => void, deferrals: Deferrals) {
  deferrals.defer();

  const playerTempId = global.source.toString();

  setTimeout(() => {
    deferrals.update(`Hello ${name}. We are validating your credentials now.`);

    const identifiers: Identifiers = {
      steam: "",
      license: "",
      discord: "",
    };

    const allIdentifiers: Record<string, string> = {};

    for (let i = 0; i < GetNumPlayerIdentifiers(playerTempId); i++) {
      const identifier = GetPlayerIdentifier(playerTempId, i);

      const [key, value] = identifier.split(":") as [keyof Identifiers, string];

      allIdentifiers[key] = value;

      if (Object.keys(identifiers).includes(key)) {
        identifiers[key] = value;
      }
    }

    setTimeout(async () => {
      if (!identifiers.steam) {
        deferrals.done("You are not connected to Steam.");
        return;
      }

      if (!identifiers.license) {
        deferrals.done("Failed to get your GTA5 license.");
        return;
      }

      if (!identifiers.discord) {
        deferrals.done("You are not connected to Discord.");
        return;
      }

      const playerModel = new PlayerModel();

      let p = await playerModel.getByIdentifiers(identifiers);

      if (!p) {
        const newPlayer = await playerModel.create(identifiers);

        if (!newPlayer) {
          deferrals.done("Failed to create database record");
          return;
        }

        p = newPlayer;
      }

      if (p.banned) {
        deferrals.done(`You are banned with reason: ${p.ban_reason}.`);
        return;
      }

      if (!p.whitelisted) {
        deferrals.done(`You are not whitelisted. Request whitelist using your ID: ${p.id}.`);
        return;
      }

      const connectionModel = new ConnectionModel();

      await connectionModel.create({
        player_id: p.id,
        identifiers: allIdentifiers,
      });
      await playerModel.update(p.id, {
        last_connection_at: dayjs().toISOString(),
      });

      Object.assign(tempIdsMapping, { [playerTempId]: p.id });

      deferrals.done();
    }, 0);
  }, 0);
}
