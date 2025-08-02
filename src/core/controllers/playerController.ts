import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { Players } from "../../types/plyers";
import Player from "../models/playerModals";

export default async function registerPlayer(interaction: ChatInputCommandInteraction, playerRegister: Players) {
  const { discordId, username } = playerRegister;

  const userId = discordId.toString();
  const userName = username.toString();
  try {
    const cekingPlayers = await Player.findOne({
      where: { user_id: discordId }
    });
    console.log("ini data: ", cekingPlayers);

    if (cekingPlayers) {
      return await interaction.reply({
        content: "❌ Kamu sudah terdaftar!",
        ephemeral: true
      })

    }

    const newPlayerData = await Player.create({
      user_id: userId,
      username: userName
    });

    const avatarUrl = interaction.user.displayAvatarURL({ size: 512 });

    console.log(`ID: ${discordId} ${username} baru saja mendaftar`);
    console.log(newPlayerData)
    const embed = new EmbedBuilder()
      .setTitle('⚔️ Petualang Baru Telah Muncul!')
      .setDescription(`Selamat datang kepada ${username}, yang telah bangkit untuk menantang takdir di dunia Aetherra.`)
      .setThumbnail(avatarUrl)
      .setFooter({ text: 'Semoga petualanganmu penuh kejayaan!' })
      .setColor("Green");

    await interaction.reply({ embeds: [embed] });

  } catch (error) {
    console.error("Error saat registrasi:", error);
    return await interaction.reply({
      content: "❌ Terjadi error saat pendaftaran. Coba lagi nanti!",
      ephemeral: true
    });
  }

  // const newPlayerData: Players={
  //   discordId:discordId,
  //   username:username,
  //   hp: 100,
  //   mp:100,
  //   level:1

  // }
  // const avatarUrl = interaction.user.displayAvatarURL({ size: 512 });

  // console.log(`ID: ${discordId} ${username} baru saja mendaftar`);
  // console.log(newPlayerData)
  // const embed = new EmbedBuilder()
  //     .setTitle('⚔️ Petualang Baru Telah Muncul!')
  //     .setDescription(`Selamat datang kepada ${username}, yang telah bangkit untuk menantang takdir di dunia Aetherra.`)
  //     .setThumbnail(avatarUrl)
  //     .setFooter({ text: 'Semoga petualanganmu penuh kejayaan!' })
  //     .setColor("Green");

  // await interaction.reply({ embeds: [embed] });
}