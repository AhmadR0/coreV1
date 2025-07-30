// src/utils/deploy-commands.ts
import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import { data as pingData } from '../bot/commands/slash/ping';


config();


const commands = [pingData.toJSON()];


const rest = new REST({ version: '10' }).setToken(process.env.TOKEN_ID!);

rest.put(
  Routes.applicationGuildCommands(
    process.env.CLIENT_ID!,
    process.env.GUILD_ID!
  ),
  { body: commands }
)
  .then(() => console.log('✅ Slash commands registered!'))
  .catch(console.error);