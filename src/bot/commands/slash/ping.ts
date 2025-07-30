import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommand } from '../../../types/command';

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  async execute(interaction: ChatInputCommandInteraction) {
    const ping = Date.now() - interaction.createdTimestamp;
    await interaction.reply(`🏓 Pong! Latency: ${ping}ms`);
  },
};

export default command;
