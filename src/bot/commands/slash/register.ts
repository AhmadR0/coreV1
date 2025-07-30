// import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

// export const data = new SlashCommandBuilder()
//   .setName('register')
//   .setDescription('Buat karakter RPG-mu');

// export async function execute(interaction: ChatInputCommandInteraction) {
//   await interaction.reply('📜 Registrasi dimulai!');
// }

// import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

// export default {
//   data: new SlashCommandBuilder()
//     .setName('register')
//     .setDescription('Buat karakter RPG-mu'),
//   async execute(interaction: ChatInputCommandInteraction) {
//     await interaction.reply('📜 Registrasi dimulai!');
//   }
// }

// 1. Import builder dan interaction object
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

// 2. Buat struktur slash command
export const data = new SlashCommandBuilder()
  .setName('register')
  .setDescription('Buat karakter RPG-mu');

// 3. Buat handler saat command dipanggil
export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply('📜 Registrasi dimulai!');
}
