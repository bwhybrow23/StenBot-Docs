---
id: commands
sidebar_position: 2
title: Commands
description: List of StenBot's Commands
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info
**Usage Key!**<br></br>
The `<` and `>` around the argument mean it's **required**.<br></br>
The `[` and `]` around the argument mean it's **optional**.
:::

<Tabs className="commands-tabs">
  <TabItem value="administrator" label="Administrator" default>
    | Command | Description | Usage |
    |---|---|---|
    | /delchannel | Deletes a mentioned channel | `/delchannel <#CHANNEL>` |
    | /delrole | Deletes a mentioned role | `/delrole <@ROLE>` |
    | /say | Get StenBot to say whatever you want | `/say <MESSAGE>` |
    | /txtcreate | Creates a text channel | `/txtcreate <NAME> [CATEGORY]` |
    | /vccreate | Creates a voice channel | `/vccreate <NAME>` |
  </TabItem>
  
  <TabItem value="bot" label="Bot">
    | Command | Description | Usage |
    |---|---|---|
    | /about | Gives some information about StenBot | `/about` |
    | /info | Find out information about the bot's connection to Discord | `/info` |
    | /ping | Find out information about the bot's connection to Discord | `/ping` |
    | /server | Gather information about a server | `/server [SERVER_ID]` |
  </TabItem>
  
  <TabItem value="economy" label="Economy">
    | Command | Description | Usage |
    |---|---|---|
    | /balance | Check the balance of yourself or another user | `/balance` |
    | /daily | Redeem your daily amount of money every 24 hours | `/daily` |
    | /pay | Pay another user some money | `/pay <@USER>` |
    | /rob | Attempt to rob another user of some of their money | `/rob <@USER>` |
  </TabItem>
  
  <TabItem value="fun" label="Fun">
    | Command | Description | Usage |
    |---|---|---|
    | /8ball | Ask a question to the magic ball | `/8ball <QUESTION>` |
    | /achievement | Create your own Minecraft achievement | `/achievement` |
    | /action | Do various things such as hug or kiss | `/action <ACTION> <@USER>` |
    | /animal | Get a random image of an animal from a list | `/animal <ANIMAL>` |
    | /binary | Convert text to binary | `/binary <TEXT>` |
    | /fact | Get a random cool fact | `/fact` |
    | /gif | Get a GIF from a specified search query | `/gif <QUERY>` |
    | /image | View/Manage your image storage. (15s cooldown) | `/image <SUBCOMMAND> [OPTIONS]` |
    | /lewd | A randomly generated image of *you know what* | `lewd` |
    | /mcping | Ping a Minecraft Server | `/mcping <IP>[:PORT]` |
    | /me | Get some information about yourself or another user | `/me [@USER]` |
    | /meme | Generate a random Reddit meme | `/meme` |
    | /neko | See a randomly generated picture of a Neko, also known as a Catgirl. | `/neko` |
    | /ship | Calculate the love between two people | `/ship <USER1> <USER2>` |
    | /stealpic | Steal a Discord user's profile picture | `/stealpic <@USER>` |
  </TabItem>
  
  <TabItem value="general" label="General">
    | Command | Description | Usage |
    |---|---|---|
    | /config | View and edit StenBot for your server | `/config <SUBCOMMAND> <OPTIONS>` |
    | /help | View information about a command or category | `/help [CATEGORY OR COMMAND]` |
    | /invite | Invite StenBot to your own Discord server | `/invite` |
    | /invitelist | Get a list of all the logged invites on the Discord server | `/invitelist` |
    | /reminder | Manage StenBot reminders | `/reminder <SUBCOMMAND> [ARGS]` |
    | /report | Report a user/bug/server to the StenBot Team for investigation | `/report` |
  </TabItem>
  
  <TabItem value="moderation" label="Moderation">
    | Command | Description | Usage |
    |---|---|---|
    | /ban | Permanently ban a user from the server | `/ban <@USER> [REASON]` |
    | /clear | Clear a certain amount of messages from chat | `/clear <AMOUNT>` |
    | /clearuser | Clear a certain number of messages from a specific user | `/clearuser <@USER> <AMOUNT>` |
    | /clearwarn | Clear all warnings from a user | `/clearwarn <@USER>` |
    | /delwarn | Clear a specific warning from a user | `/delwarn <@USER> <ID>` |
    | /kick | Kick a user from the server | `/kick <@USER> [REASON]` |
    | /mute | Mute a user to block them from sending messages | `/mute <@USER> [REASON]` |
    | /tempmute | Temporarily mute a user for a period of time | `/tempmute <@USER> [REASON]` |
    | /unban | Unban a user from the server | `/unban [REASON]` |
    | /unmute | Unmute a user that has previously been muted by StenBot | `/unmute <@USER> [REASON]` |
    | /warn | Warn a user | `/warn <@USER>` |
    | /warnings | View all warnings on a user | `/warnings <@USER>` |
  </TabItem>
  
  <TabItem value="ticketing" label="Ticketing">
    | Command | Description | Usage |
    |---|---|---|
    | /tadd | Add a user to an ongoing ticket | `/tadd <@USER>` |
    | /ticket | Create a new ticket | `/ticket <REASON>` |
    | /ticketclose | Close an existing ticket | `/ticketclose` |
  </TabItem>

</Tabs>