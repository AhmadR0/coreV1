import { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const name = 'pve';
export const description = 'Memulai pertarungan PvE';

export async function execute(message: Message) {
    const embed = new EmbedBuilder()
        .setTitle('⚔️ Pertarungan PvE Dimulai!')
        .setDescription('**Player HP:** 100\n**Enemy HP:** 75')
        .setColor('#FF0000');

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
            .setCustomId('pve_attack')
            .setLabel('Serang (-15 HP)')
            .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
            .setCustomId('pve_heal')
            .setLabel('Heal (+20 HP)')
            .setStyle(ButtonStyle.Success)
    );

    await message.reply({ 
        embeds: [embed], 
        components: [row] 
    });
}