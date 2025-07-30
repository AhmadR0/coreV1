// import { Message } from "discord.js";
// export const name = 'attack';

// export async function execute(message: Message, args: string[]) {
//   await message.reply('⚔️ Kamu menyerang slime!');
// }

// attack.ts
import { Message } from 'discord.js';

export default {
  name: 'attack',
  async execute(message: Message, args: string[]) {
    await message.reply('⚔️ Kamu menyerang slime!');
  }
}
