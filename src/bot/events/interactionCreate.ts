import { Events, Interaction } from 'discord.js';
import { getSlashCommands } from '../../core/loader';

let commandMap = new Map(); // default kosong

// Kita inisialisasi di dalam fungsi saat pertama kali event jalan
async function initCommands() {
  const commands = await getSlashCommands();
  commandMap = new Map(commands.map(cmd => [cmd.data.name, cmd]));
}

export default {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    // Lazy-load saat command belum ada
    if (commandMap.size === 0) await initCommands();

    const command = commandMap.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error('❌ Error executing command:', err);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: '⚠️ Error.', ephemeral: true });
      } else {
        await interaction.reply({ content: '⚠️ Error.', ephemeral: true });
      }
    }
  },
};
