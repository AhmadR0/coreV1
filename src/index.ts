// src/index.ts
import { Client, GatewayIntentBits } from 'discord.js';
import { messageCreate } from './bot/events/messageCreate';
import { interactionCreate } from './bot/events/interactionCreate';
import { config } from 'dotenv';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => console.log(`Logged in as ${client.user?.tag}!`));
client.on('messageCreate', messageCreate);
client.on('interactionCreate', interactionCreate);

client.login(process.env.TOKEN_ID); // Jika di env memang TOKEN_ID