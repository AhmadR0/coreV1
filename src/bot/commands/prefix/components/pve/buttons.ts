import { ButtonInteraction, EmbedBuilder } from 'discord.js';

// Simpan state battle (sementara)
const battleState = new Map<string, {
  playerHP: number;
  enemyHP: number;
  messageId: string;
}>();

export async function handlePveButtons(interaction: ButtonInteraction) {
    try {
        const { customId, message } = interaction;
        const battle = battleState.get(interaction.user.id);

        // Jika battle belum ada, buat baru
        if (!battle) {
            battleState.set(interaction.user.id, {
                playerHP: 100,
                enemyHP: 75,
                messageId: message.id
            });
        }

        // Dapatkan state terbaru
        const currentBattle = battleState.get(interaction.user.id)!;

        // Proses aksi
        switch (customId) {
            case 'pve_attack':
                currentBattle.enemyHP -= 15; // Damage ke musuh
                currentBattle.playerHP -= 5;  // Musuh balas serang
                break;
            
            case 'pve_heal':
                currentBattle.playerHP = Math.min(100, currentBattle.playerHP + 20);
                currentBattle.playerHP -= 3; // Musuh tetap serang
                break;
        }

        // Update embed
        const updatedEmbed = new EmbedBuilder()
            .setTitle('⚔️ Pertarungan PvE')
            .setDescription(`**Player HP:** ${currentBattle.playerHP}\n**Enemy HP:** ${currentBattle.enemyHP}`)
            .setColor('#FF0000');

        // Cek kondisi battle
        if (currentBattle.enemyHP <= 0) {
            updatedEmbed.setDescription('🎉 Kamu menang!');
            await interaction.update({
                embeds: [updatedEmbed],
                components: [] // Hapus button setelah battle selesai
            });
            battleState.delete(interaction.user.id);
            return;
        }

        if (currentBattle.playerHP <= 0) {
            updatedEmbed.setDescription('💀 Kamu kalah!');
            await interaction.update({
                embeds: [updatedEmbed],
                components: []
            });
            battleState.delete(interaction.user.id);
            return;
        }

        // Update message asli
        await interaction.update({
            embeds: [updatedEmbed],
            components: interaction.message.components // Pertahankan button
        });

    } catch (error) {
        console.error('Battle Error:', error);
        if (!interaction.replied) {
            await interaction.reply({
                content: '❌ Gagal memproses aksi battle',
                ephemeral: true
            });
        }
    }
}