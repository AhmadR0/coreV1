import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";
import registerPlayer from "../../../core/controllers/playerController";
import { Players } from "../../../types/plyers";


export const data = new SlashCommandBuilder()
    .setName('register')
    .setDescription('Gunakan ini untuk membuat karakter')
    


export const execute = async (interaction: ChatInputCommandInteraction) => {
    const newPlayerData: Players = {
        discordId: interaction.user.id,
        username: interaction.user.username
    };

    await registerPlayer(interaction,newPlayerData);
}

// export async function execute(interaction: ChatInputCommandInteraction) {
    
//     const discordId = interaction.user.id;
//     const discordUsername = interaction.user.username;
//     const iamgeUser = interaction.user.displayAvatarURL({size:512});

//     const newPlayer: Player ={
//         discordId: discordId,
//         username: discordUsername,
//     }

    
//     console.log('Id:',discordId,'baru saja mendaftar');
//     const embed = new EmbedBuilder()
//         .setTitle('⚔️ Petualang Baru Telah Muncul!')
//         .setDescription(`Selamat datang kepada ${discordUsername}, yang telah bangkit untuk menantang takdir di dunia Aetherra.`)
//         .setThumbnail(iamgeUser)
//         .setFooter({text:'Semoga petualanganmu penuh kejayaan!'})
//         .setColor("Green");

//     await interaction.reply({ embeds: [embed] });

// }