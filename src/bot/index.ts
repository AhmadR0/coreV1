import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';

config(); // load .env

const client = new Client({
  intents: [GatewayIntentBits.Guilds], // cukup untuk slash command
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user?.tag}`);
});

// Load semua event (sekarang kita baru punya interactionCreate)
const eventsPath = path.join(__dirname, '../bot/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

for (const file of eventFiles) {
  import(path.join(eventsPath, file)).then((eventModule) => {
    const event = eventModule.default;
    if (!event || !event.name || !event.execute) return;

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  });
}

client.login(process.env.DISCORD_TOKEN);
