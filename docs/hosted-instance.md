---
id: hosted-instance
title: Setting Up a Hosted Instance
description: This guide will help instruct you on how to setup your own hosted instance of StenBot.
---

# Setting Up a Hosted Instance
This guide will help instruct you on how to setup your own hosted instance of StenBot (or whatever you'd like to call the bot). 

## Requirements
- A local machine or server that can run the bot 24/7
- Small background in Node.JS and Docker

## Prerequisites
This guide is going to be built around setting StenBot up on an Ubuntu 22.04 machine, please find instructions on how to setup the prerequisites if using a different OS.

### NPM
Thankfully, the APT package manager in Ubuntu allows us to easily install NPM. An in-depth guide can be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04)
``` bash
# Make sure the repo is up-to-date
sudo apt-get update

# Install Node and NPM
sudo apt-get install nodejs npm -y
```
You can check it is installed by running `node -v`. If you get no output, or it says the command is wrong, NodeJS hasn't been installed properly. 

### Docker
This installation process is a little more complicated, but it only requires copying and pasting commands like before. An in-depth guide can be found [here](https://docs.docker.com/engine/install/ubuntu/)
``` bash
# Make sure the repo is up-to-date and install prerequisites
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release -y

# Make a directory and add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  
# Get the latest updates for the repository
sudo apt-get update

# Install Docker and it's components
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### MongoDB
StenBot uses MongoDB for its database in order to store all the required information to work. An in-depth guide can be found [here](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

```
# Add Mongo's GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Make the repo work
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Get the latest updates for the repository
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org
```

We now need to set up a database and user for StenBot to run on. An in-depth tutorial for setting up a user and database can be found below. 
- User - [https://www.mongodb.com/docs/manual/tutorial/create-users/](https://www.mongodb.com/docs/manual/tutorial/create-users/)
- Database - [https://www.tutorialspoint.com/mongodb/mongodb_create_database.htm](https://www.tutorialspoint.com/mongodb/mongodb_create_database.htm)

You can also find an article on how to secure your MongoDB database [here](https://www.digitalocean.com/community/tutorials/how-to-secure-mongodb-on-ubuntu-20-04)

To set-up the required user and database for StenBot, follow the below steps:
1. Log into the MongoDB instance by running `mongo -p` and pressing enter when it prompts for a password.
2. In order to create the needed database for StenBot, run the following command (replacing StenBot with whatever you prefer, but be sure to note everything down as we'll need it later on), `use stenbot`
3. Now that the database has been created, we can create a user that only has access to that database. To do this, we need to switch back to the **admin** database, as this is our authentication database. To do this, run `use admin`. 
4. We can now create a user. Create a database user login before running the below command and store these details securely as we will use them later on in the guide. To create a user, run the below code. **Please do not copy and paste this as it will not work!!**
``` bash
db.createUser(
	{
  	user: "stenbot", 
    pwd: "PASSWORD",
    roles: [ { role: "dbOwner", db: "stenbot" } ]
  }
)
```

### Discord Application
In order for the bot to communicate with Discord, we need to setup a bot application using Discord's website. Please refer to [this guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html) for further instructions. Be sure to make a note of your token as we will need this later.

Whilst you're at it, invite the bot to a test server (or your own server) so that it's ready to use once we set things up! Follow [this guide](https://discordjs.guide/preparations/adding-your-bot-to-servers.html) for further instructions. 

## Setting up the Bot
### Getting the Code from GitHub
The first thing we need to do is to get the code for StenBot from GitHub. We can do this using a piece of software called Git. Git usually comes pre-installed on most Linux machines, but if that's not the case, you can install it using the software package manager for the system. On an Ubuntu machine, that's just running `sudo apt install git -y`. 

Once Git is set up, we can clone the StenBot repository to the machine. 
1. Firstly, navigate to the folder that will contain StenBot. Git will automatically create the **StenBot** folder, we just need to pick a location. My preference for the current deployment is the /srv folder. To navigate to this, we can run `cd /srv`. 
2. Once a folder is chosen, you can clone StenBot by running `git clone https://github.com/bwhybrow23/StenBot`. 
3. You can now navigate into the directory by running `cd StenBot`.

### Installing the relevant packages
This stage is quite simple. Make sure you're in the folder where the StenBot files are and run `npm install`. This process may take a while, so get a cuppa whilst you're waiting. 

### Editing the config 
Here, we are going to be utilising everything I said to note down during the prerequisites section.

1. Firstly, we're going to need to make a settings file. To do that, run `cp Main/template-settings.json Main/settings.json`
2. Next, open the file to edit. This can either be done via a text editor like Notepad++ or via the command line by running `nano Main/settings.json`
3. Here, we can put in bot token into the area where it says **token**. 
4. Under the **ids** section, we can put any relevant IDs that help the bot determine who the owner is. Follow [this guide](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) for further help on getting IDs within Discord.
5. Under the area that says **Mongo**, we can put the login details for the database. The host would be the public IP address of the place where the MongoDB server is running. 