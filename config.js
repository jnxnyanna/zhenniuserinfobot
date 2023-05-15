// Learn more: https://developers.google.com/apps-script/guides/properties
const prop = PropertiesService.getScriptProperties();
const data = prop.getProperties();

// If bot_token is undefined
if (!data.bot_token) throw "Please set first your telegram bot_token.";

const bot = new lumpia.init(data.bot_token, { log_id: data.log_id || "" });
const client = bot.telegram;

function doPost(e) {
  bot.doPost(e);
}

function setWebhook() {
  let url = "<DEPLOYED_APP_URL>";
  let result = client.setWebhook(url);
  console.log(result);
}

function deleteWebhook() {
  let result = client.deleteWebhook();
  console.log(result);
}