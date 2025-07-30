// src/bot/commands/slash/ping.ts  
import { SlashCommandBuilder } from 'discord.js';  

export const data = new SlashCommandBuilder()  
  .setName('ping')  
  .setDescription('Cek latency bot (slash)');  

export async function execute(interaction: any) {  
  const start = Date.now();  
  await interaction.reply('Pinging...');  
  const latency = Date.now() - start;  

  interaction.editReply(`🏓 Pong!  
    - **Latency**: ${latency}ms  
    - **WebSocket**: ${interaction.client.ws.ping}ms`);  
}  