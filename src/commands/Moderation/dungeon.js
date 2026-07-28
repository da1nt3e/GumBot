import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js"; 

export default {
    data: new SlashCommandBuilder()
        .setName("dungeon")
        .setDescription("Give a user the Dungeon role")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("The user to Dungeon")
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

        await member.roles.add(role);

        await interaction.reply({
            content: `✅ ${member.user.username} has been sent to the dungeon.`
        });
    },
};
