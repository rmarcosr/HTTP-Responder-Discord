# Discord HTTP Responder 

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
DISCORD_TOKEN="XXXXX"
APPLICATION_ID="XXXX"
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
