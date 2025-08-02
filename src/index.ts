// src/index.ts
import { Client, GatewayIntentBits } from 'discord.js';
import { messageCreate } from './bot/events/messageCreate';
import { interactionCreate } from './bot/events/interactionCreate';
import { config } from 'dotenv';
import { testDatabaseConnection } from '../src/core/config/databases'

// Load environment variables
config({ path: '/.env' }); // Pastikan path ini benar

// Fungsi utama async untuk menangani inisialisasi
async function main() {
  // Pertama, test koneksi database
  const dbConnected = await testDatabaseConnection();
  if (!dbConnected) {
    console.error('❌ Bot tidak bisa start karena koneksi database gagal');
    process.exit(1); // Keluar jika database tidak terkoneksi
  }

  // Inisialisasi client Discord
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  // Setup event handlers
  client.on('ready', () => {
    console.log(`✅ Bot logged in as ${client.user?.tag}!`);
    console.log(`📊 Connected to database: ${process.env.DB_NAME}`);
  });

  client.on('messageCreate', messageCreate);
  client.on('interactionCreate', interactionCreate);

  // Login ke Discord
  try {
    await client.login(process.env.TOKEN_ID);
    console.log('🔗 Bot successfully connected to Discord');
  } catch (error) {
    console.error('❌ Failed to login to Discord:', error);
    process.exit(1);
  }
}

// Jalankan aplikasi
main().catch(console.error);