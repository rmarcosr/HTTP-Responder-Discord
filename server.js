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

    const petitionType = interaction.commandName.toUpperCase();

    const hasBody = ["POST", "PUT"].includes(petitionType);

    await discordFetch(interaction, petitionType, hasBody);

});

client.login(process.env.DISCORD_TOKEN)

async function discordFetch(interaction, petitionType, hasBody) {
    const url = interaction.options.getString('url');
    const token = interaction.options.getString('token');


    // Only POST/PUT Petition includes a body
    let body = null;
    if (hasBody) {
        const bodyInput = interaction.options.getString('body');

        body = {};
        if (bodyInput) {
            try {
                body = JSON.parse(bodyInput);
            } catch (error) {
                return await interaction.reply(`Error: ${error.message}`);
            }
        }
    }

    // Validate the header of petition
    const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            method: petitionType,
            headers,
            ...(hasBody && body ? { body: JSON.stringify(body) } : {}),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`STATUS: ${response.status} **${response.statusText} ** \n\`\`\`json\n${errorText || response.statusText}\n\`\`\``);
        }

        // Preparing the response
        const data = await response.json();

        const jsonString = JSON.stringify(data, null, 2);

        // The max lengt of Discord is 2000, if response is more, create a temporal file to insert
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

            //Delete the file
            fs.unlinkSync(filePath);
            return;
        }
    } catch (error) {
        return await interaction.reply(`${error.message}`);
    }
}

function reply(response, data) {
    return `STATUS: ${response.status} ** ${response.statusText} ** \n\`\`\`json\n${data}\n\`\`\``
}
