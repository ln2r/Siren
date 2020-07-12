const inquirer = require("inquirer");
const Enmap = require("enmap");
const fs = require("fs");

let baseConfig = fs.readFileSync("./config_base.txt", "utf8");

const defaultSettings = {
  "prefix": "~",
  "modLogChannel": "mod-logs",
  "modRole": "Moderator",
  "adminRole": "Administrator",
  "systemNotice": "true",
  "welcomeChannel": "announcements",
  "welcomeMessage": "<a:raibow:731805416622653460> Say hello to {{user}}, everyone! We all need a warm welcome sometimes <a:raibow:731805416622653460>",
  "welcomeEnabled": "true"
};

const settings = new Enmap({
  name: "settings",
  cloneLevel: 'deep',
  ensureProps: true
});


let prompts = [
  {
    type: "list",
    name: "resetDefaults",
    message: "Do you want to reset default settings?",
    choices: ["Yes", "No"]
  },
  {
    type: "input",
    name: "token",
    message: "Please enter the bot token from the application page."
  },
  {
    type: "input",
    name: "ownerID",
    message: "Please enter the bot owner's User ID"
  },
  {
    type: "input",
    name: "adminRole",
    message: "Please type the name of your guild Administrator Role"
  },
  {
    type: "input",
    name: "modRole",
    message: "Please enter the name of your guild Moderator Role"
  },
  {
    type: "input",
    name: "modLogChannel channel",
    message: "Please type the name of your guild mod-log channel"
  },
];

(async function () {
  console.log("Setting Up Siren Configuration...");
  await settings.defer;
  if (!settings.has("default")) {
    prompts = prompts.slice(1);
    console.log("First Start! Inserting default guild settings in the database...");
    await settings.set("default", defaultSettings);
  }

  const answers = await inquirer.prompt(prompts);

  if (answers.resetDefaults && answers.resetDefaults === "Yes") {
    console.log("Resetting default guild settings...");
    await settings.set("default", defaultSettings);
  }

  baseConfig = baseConfig
    .replace("{{ownerID}}", answers.ownerID)
    .replace("{{token}}", `"${answers.token}"`)
    .replace("{{modRole}}", answers.modRole)
    .replace("{{adminRole}}", answers.adminRole)
    .replace("{{modLogChannel}}", answers.modLogChannel);

  fs.writeFileSync("./config.js", baseConfig);
  console.log("REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!");
  console.log("Configuration has been written, enjoy!");
  await settings.close();
}());