const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, Events } = require('discord.js');
require('dotenv').config()

const commands = [
    new SlashCommandBuilder()
        .setName("get")
        .setDescription("Performs a GET request to a given endpoint")
        .addStringOption(option =>
            option.setName('url')
                .setDescription('URL')
                .setRequired(true)
        )
        .toJSON(),

    new SlashCommandBuilder()
        .setName("post")
        .setDescription("Performs a POST request to a given endpoint")
        .addStringOption(option =>
            option.setName('url')
                .setDescription('URL')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("body")
                .setDescription(`The body to send, must use double quotes : {"title": "foo", "body": "bar", "userId": 1}`)
                .setRequired(true)
        )
        .toJSON(),

    new SlashCommandBuilder()
        .setName("put")
        .setDescription("Performs a PUT request to a given endpoint")
        .addStringOption(option =>
            option.setName('url')
                .setDescription('URL')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("body")
                .setDescription(`The body to send, must use double quotes : {"title": "foo", "body": "bar", "userId": 1}`)
                .setRequired(true)
        )
        .toJSON(),

    new SlashCommandBuilder()
        .setName("delete")
        .setDescription("Performs a DELETE request to a given endpoint")
        .addStringOption(option =>
            option.setName('url')
                .setDescription('URL')
                .setRequired(true)
        )
        .toJSON(),
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('\u001B[33mLoading (/) commands:');

        await rest.put(
            Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('\u001b[1;32mSuccessfully registered application (/) commands.\u001b[0m');
    } catch (error) {
        console.error(error);
    }
})();