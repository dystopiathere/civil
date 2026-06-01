import { CivilDataSource } from "~/data-source";
import { Connection, Player } from "~/entities";
import { tempIdsMapping } from "~/mappings";
import { Deferrals, Identifiers } from "~/types";

export function onPlayerConnecting(name: string, setKickReason: (reason: string) => void, deferrals: Deferrals) {
  deferrals.defer();

  const playerTempId = globalThis.source.toString();

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

      const playerRepository = CivilDataSource.getRepository(Player);

      let player: Player | null = await playerRepository.findOneBy(identifiers);

      if (!player) {
        try {
          player = new Player();
          Object.assign(player, identifiers);
          player = await playerRepository.save(player);
        } catch {
          deferrals.done("Failed to create database record");
          return;
        }
      }

      if (player.banned) {
        deferrals.done(`You are banned with reason: ${player.banReason}.`);
        return;
      }

      if (!player.whitelisted) {
        deferrals.done(`You are not whitelisted. Request whitelist using your ID: ${player.id}.`);
        return;
      }

      try {
        const connectionRepository = CivilDataSource.getRepository(Connection);
        const connection = new Connection();
        connection.identifiers = allIdentifiers;
        connection.player = Promise.resolve(player);
        connectionRepository.save(connection);
      } catch (err) {
        console.error(err);
      }

      Object.assign(tempIdsMapping, { [playerTempId]: player.id });

      deferrals.done();
    }, 0);
  }, 0);
}
