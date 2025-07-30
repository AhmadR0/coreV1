// src/bot/events/interactionCreate.ts
import { Interaction } from 'discord.js';
import { execute as pingExecute } from '../commands/slash/ping';

export async function interactionCreate(interaction: Interaction) {
  // Hanya handle chat input commands
  if (!interaction.isChatInputCommand()) return;

  try {
    if (interaction.commandName === 'ping') {
      await pingExecute(interaction);
    }
    // Tambahkan command lain di sini
  } catch (error) {
    console.error(error);
    if (interaction.isRepliable()) {
      await interaction.reply('Error executing command!');
    }
  }
}