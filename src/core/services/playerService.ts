import { playerData } from "src/bot/commands/slash/register";

export class PlayerService {
  static getPlayer(discordId: string) {
    return playerData.get(discordId);
  }

  static getAllPlayers() {
    return Array.from(playerData.values());
  }
}