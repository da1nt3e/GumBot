import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("undungeon")
        .setDescription("Free a user from the Dungeon")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("The user to free from the Dungeon")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

    category: "moderation",

    async execute(interaction) {
        const member = interaction.options.getMember("user");

        const dungeonRole = interaction.guild.roles.cache.find(
            role => role.name === "Dungeon"
        );

        const verifiedRole = interaction.guild.roles.cache.find(
            role => role.name === "Verified"
        );

        if (!dungeonRole || !verifiedRole) {
            return interaction.reply({
                content: "❌ The Dungeon or Verified role does not exist.",
                ephemeral: true
            });
        }

        await member.roles.remove(dungeonRole);
        await member.roles.add(verifiedRole);

        await interaction.reply({
            content: `✅ ${member.user.username} has been freed from the Dungeon.`
        });
    },
};
