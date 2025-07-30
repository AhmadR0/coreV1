// src/bot/events/messageCreate.ts
import { Message } from 'discord.js';
import { execute as pingExecute, name as pingName } from '../commands/prefix/ping';

const prefixCommands = new Map<string, { execute: Function }>();
prefixCommands.set(pingName, { execute: pingExecute });

export async function messageCreate(message: Message) {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const args = message.content.slice(1).split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName || !prefixCommands.has(commandName)) return;

  try {
    await prefixCommands.get(commandName)?.execute(message, args);
  } catch (error) {
    console.error(error);
    await message.reply('Error executing command!');
  }
}