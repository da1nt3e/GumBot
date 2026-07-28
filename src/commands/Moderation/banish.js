import { SlashCommandBuilder,PermissionFlagsBits } from "discord.js";
export default {
  data: new SlashCommandBuilder( )
  .setName("banish")
  .setDescription("Give someone the banished role")
  .addUserOption(option => 
                 option
                 .setName("user")
                 .setDescription("User to give the role to")
                 .setRequired(true)
                 )
  .SetDefaultMemberPermissions(PermissionsFlagsBits.ManageRoles),
  async execute(interaction) {
const user = intercation.options.getMember("user");
    const role = interaction.guild.roles.cache.find(
      role=> role.name === "Banished"
      );
    await user.roles.add(role);
    await interaction.reply(
      '✅${user.user.username} has been banished'
      );
  }
};
