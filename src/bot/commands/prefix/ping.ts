// src/bot/commands/prefix/ping.ts
import { Message } from 'discord.js';

export const name = 'ping';
export const description = 'Cek latency bot (prefix)';

export async function execute(message: Message) {
  const start = Date.now();
  const reply = await message.reply('Pinging...');
  const latency = Date.now() - start;

  reply.edit(`🏓 Pong!
    - Latency: ${latency}ms
    - WebSocket: ${message.client.ws.ping}ms`);
}