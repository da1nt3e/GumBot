import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("undungeon")
        .setDescription("Remove the Dungeon role from a user")
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

        const role = interaction.guild.roles.cache.find(
            role => role.name === "Dungeon"
        );

        if (!role) {
            return interaction.reply({
                content: "❌ The Dungeon role does not exist.",
                ephemeral: true
            });
        }

        await member.roles.remove(role);

        await interaction.reply({
            content: `✅ ${member.user.username} has been freed from the Dungeon.`
        });
    },
};
