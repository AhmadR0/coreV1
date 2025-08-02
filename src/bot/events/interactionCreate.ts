// // src/bot/events/interactionCreate.ts
// import { Interaction } from 'discord.js';
// import { execute as pingExecute } from '../commands/slash/ping';
// import { execute as RegisterPlayers } from '../commands/slash/register';

// export async function interactionCreate(interaction: Interaction) {
//   // Hanya handle chat input commands
//   if (!interaction.isChatInputCommand()) return;

//   try {
//     if (interaction.commandName === 'ping') {
//       await pingExecute(interaction);
//     }
//     if (interaction.commandName === 'register'){
//         await RegisterPlayers(interaction)
//     }
//     // Tambahkan command lain di sini
//   } catch (error) {
//     console.error(error);
//     if (interaction.isRepliable()) {
//       await interaction.reply('Error executing command!');
//     }
//   }
// }

// src/bot/events/interactionCreate.ts
import { Interaction } from 'discord.js';
import { execute as pingExecute } from '../commands/slash/ping';
import { execute as RegisterPlayers } from '../commands/slash/register';
import { handlePveButtons } from '../commands/prefix/components/pve/buttons';

export async function interactionCreate(interaction: Interaction) {
    try {
        // Handle Slash Commands
        if (interaction.isChatInputCommand()) {
            switch (interaction.commandName) {
                case 'ping':
                    await pingExecute(interaction);
                    break;
                case 'register':
                    await RegisterPlayers(interaction);
                    break;
            }
            return;
        }

        // Handle Buttons
        if (interaction.isButton()) {
            // Filter hanya button PvE
            if (interaction.customId.startsWith('pve_')) {
                await handlePveButtons(interaction);
            }
            return;
        }

    } catch (error) {
        console.error('Interaction Error:', error);
        if (interaction.isRepliable() && !interaction.replied) {
            await interaction.reply({ 
                content: '❌ Terjadi kesalahan sistem', 
                ephemeral: true 
            });
        }
    }
}