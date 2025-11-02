const { Client, GatewayIntentBits, Events, AttachmentBuilder } = require('discord.js');
require('dotenv').config();
const fs = require('fs');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.once(Events.ClientReady, (c) => {
    console.log("\u001b[1;32mBot inicialiced\u001b[0m");
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'get') {
        const url = interaction.options.getString('url');
        const token = interaction.options.getString('token');

        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, { headers });
            if (!response.ok) {
                return await interaction.reply('Error calling the API');
            }

            const data = await response.json();
            const jsonString = JSON.stringify(data, null, 2);

            if (jsonString.length < 1900) {
                return await interaction.reply({
                    content: reply(response, jsonString)
                });
            } else {
                const filePath = './response.json';
                fs.writeFileSync(filePath, jsonString);
                const file = new AttachmentBuilder(filePath);

                await interaction.reply({
                    content: `STATUS: ${response.status} ** ${response.statusText} **`,
                    files: [file],
                });

                fs.unlinkSync(filePath);
                return;
            }
        } catch (error) {
            return await interaction.reply(`Error: ${error.message}`);
        }
    }

    if (interaction.commandName === 'post') {
        const url = interaction.options.getString('url');
        const bodyInput = interaction.options.getString('body');
        const token = interaction.options.getString('token');


        let body = {};
        if (bodyInput) {
            try {
                body = JSON.parse(bodyInput);
            } catch (error) {
                return await interaction.reply(`Error: ${error.message}`);
            }
        }
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers,
            });

            if (!response.ok) {
                return await interaction.reply('Error calling the API');
            }

            const data = await response.json();
            const jsonString = JSON.stringify(data, null, 2);

            return await interaction.reply({
                content: reply(response, jsonString)
            });
        } catch (error) {
            return await interaction.reply(`Error: ${error.message}`);
        }
    }

    if (interaction.commandName === 'put') {
        const url = interaction.options.getString('url');
        const bodyInput = interaction.options.getString('body');
        const token = interaction.options.getString('token');

        let body = {};
        if (bodyInput) {
            try {
                body = JSON.parse(bodyInput);
            } catch (error) {
                return await interaction.reply(`Error: ${error.message}`);
            }
        }

        try {
            const headers = { 'Content-type': 'application/json; charset=UTF-8' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers
            });

            if (!response.ok) {
                return await interaction.reply('Error calling the API');
            }

            const data = await response.json();
            const jsonString = JSON.stringify(data, null, 2);

            return await interaction.reply({
                content: reply(response, jsonString)
            });
        } catch (error) {
            return await interaction.reply(`Error: ${error.message}`);
        }
    }

    if (interaction.commandName === 'delete') {
        const url = interaction.options.getString('url');
        const token = interaction.options.getString('token');

        try {
            const headers = { 'Content-type': 'application/json; charset=UTF-8' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(url, {
                method: 'DELETE',
                headers
            });

            if (!response.ok) {
                return await interaction.reply('Error calling the API');
            }

            const data = await response.json();
            const jsonString = JSON.stringify(data, null, 2);

            return await interaction.reply({
                content: reply(response, jsonString)
            });
        } catch (error) {
            return await interaction.reply(`Error: ${error.message}`);
        }
    }
});

client.login(process.env.DISCORD_TOKEN)


function reply(response, data) {
    return `STATUS: ${response.status} ** ${response.statusText} ** \n\`\`\`json\n${data}\n\`\`\``
}
