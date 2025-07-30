//ini tuh kayak routes di backend WEB cok

import fs from 'fs';
import path from 'path';
import { SlashCommand } from '../types/command';

export async function getSlashCommands(): Promise<SlashCommand[]> {
  const slashDir = path.join(__dirname, '../bot/commands/slash');
  const files = fs.readdirSync(slashDir).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  const commands: SlashCommand[] = [];

  for (const file of files) {
    const module = await import(path.join(slashDir, file));
    if (module.default) commands.push(module.default);
  }

  return commands;
}
