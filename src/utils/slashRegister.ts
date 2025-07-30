// src/utils/slashRegister.ts
import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import { getSlashCommands } from '../core/loader';

config();

async function registerSlashCommands() {
  const commands = await getSlashCommands(); // dari core/loader

  const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

  try {
    console.log('🚀 Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), // ganti global jika ready
      { body: commands.map(cmd => cmd.data.toJSON()) }
    );
    console.log('✅ Slash commands registered!');
  } catch (err) {
    console.error('❌ Failed to register slash commands:', err);
  }
}

registerSlashCommands();
