import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";
// import { Players } from "../../../types/plyers"

export const playerData = new Map<string, Player>();

interface Player {
  discordId: string;
  username: string;
  charName: string;
  class: string;
  level: number;
  hp: number;
  attack: number;
}

export const data = new SlashCommandBuilder()
    .setName('register')
    .setDescription('Gunakan ini untuk membuat karakter')
    .addStringOption(option =>
        option.setName('nama')
            .setDescription('Nama Karater mu')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('kelas')
            .setDescription('Pilih kelas karakter')
            .setRequired(true)
            .addChoices(
                { name: 'Ksatria', value: 'warrior' },
                { name: 'Penyihir', value: 'mage' },
                { name: 'Pemanah', value: 'archer' }
            )
    );

export async function execute(interaction: ChatInputCommandInteraction) {
    const nama = interaction.options.getString('nama')!;
    const kelas = interaction.options.getString('kelas')!;
    const discordId = interaction.user.id;


    if (playerData.has(discordId)) {
        return interaction.reply({
            content: '❌ Kamu sudah terdaftar!',
            ephemeral: true
        })
    }

    const baseStats = {
        warrior: { hp: 120, attack: 15 },
        mage: { hp: 80, attack: 25 },
        archer: { hp: 100, attack: 20 }
    }

    const newPlayer: Player = {
        discordId,
        username: interaction.user.username,
        charName: nama,
        class: kelas,
        level: 1,
        hp: baseStats[kelas as keyof typeof baseStats].hp,
        attack: baseStats[kelas as keyof typeof baseStats].attack
    };

    playerData.set(discordId,newPlayer);

    const embed = new EmbedBuilder()
        .setTitle('🎉 Pendaftaran Berhasil!')
        .setDescription(`**${newPlayer.charName}** (${kelas}) siap bertualang!`)
        .addFields(
            { name: 'Level', value: '1', inline: true },
            { name: 'HP', value: newPlayer.hp.toString(), inline: true },
            { name: 'Attack', value: newPlayer.attack.toString(), inline: true }
        )
        .setColor(0x00ff00);

    await interaction.reply({ embeds: [embed] });

}