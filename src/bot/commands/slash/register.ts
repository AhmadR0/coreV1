import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";
// import { Players } from "../../../types/plyers"

export const playerData = new Map<string, Player>();

interface Player {
  discordId: string;
  username: string;
}

export const data = new SlashCommandBuilder()
    .setName('register')
    .setDescription('Gunakan ini untuk membuat karakter')
    // .addStringOption(option =>
    //     option.setName('nama')
    //         .setDescription('Nama Karater mu')
    //         .setRequired(true)
    // )
    // .addStringOption(option =>
    //     option.setName('kelas')
    //         .setDescription('Pilih kelas karakter')
    //         .setRequired(true)
    //         .addChoices(
    //             { name: 'Ksatria', value: 'warrior' },
    //             { name: 'Penyihir', value: 'mage' },
    //             { name: 'Pemanah', value: 'archer' }
    //         )
    // );

export async function execute(interaction: ChatInputCommandInteraction) {
    // const nama = interaction.options.getString('nama')!;
    // const kelas = interaction.options.getString('kelas')!;
    const discordId = interaction.user.id;
    const discordUsername = interaction.user.username;
    const iamgeUser = interaction.user.displayAvatarURL();


    // if (playerData.has(discordId)) {
    //     return interaction.reply({
    //         content: '❌ Kamu sudah terdaftar!',
    //         ephemeral: true
    //     })
    // }

   

    // const newPlayer: Player = {
    //     discordId,
    //     username: interaction.user.username
    // };

    // playerData.set(discordId,newPlayer);

    const embed = new EmbedBuilder()
        .setTitle('🎉 Pendaftaran Berhasil!')
        .setDescription(`Player yang baru mendaftar:`)
        .addFields(
            { name: 'dicordId', value: `${discordId}`, inline: true },
            { name: 'Name', value: `${discordUsername}`, inline: true },
            { name: 'Attack', value: `${iamgeUser}`, inline: true },
        )
        .setFooter({text:'ini foternya cok'})
        .setColor("Green");

    await interaction.reply({ embeds: [embed] });

}