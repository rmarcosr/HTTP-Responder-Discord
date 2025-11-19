# Discord HTTP Responder 

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/rmarcosr/HTTP-Responder-Discord)
![Discord Badge](https://img.shields.io/badge/Discord-gray?style=flat&logo=discord&logoColor=5865F2)
![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=000)
![Discord.js Badge](https://img.shields.io/badge/Discord.js-white?style=flat&logo=discorddotjs&logoColor=000)


Hey! This is an experiment to create an **HTTP responder using Discord**.  
This project is not serious, it's just for fun.

---

## Steps

1. **Create a new application** on the [Discord Developer Portal](https://discord.com/developers/applications).

2. If you only want to test the bot, active `Message Content Intent`.

3. Copy your **Application ID** and go to the [Discord Permission Calculator](https://discordapi.com/permissions.html#XXXX).
   - Replace `XXXX` with your **Application ID**.
   - Select all options and enter your **Application ID** in the **Client ID** field.
   - Now you can generate the invite link and use it to invite your bot to Discord.


4. You need create a `.env` file:

``` bash
DISCORD_TOKEN=SECRET_DISCORD_TOKEN
APPLICATION_ID=YOUR_APPLICATION_ID
GUILD_ID=OPTIONAL_GUILD_ID
```
5. Finally install dependecies with: 

``` javascript
npm install
```
> Can use other package manager: yarn, pnpm.
---

## New Code

5. Add new slash `/` on [deploy-command.js file](/src/deploy-commands.js)

6. Configurate the actions on [server.js file](server.js)

Finally execute the bot using 
``` javascript
npm run init
```
