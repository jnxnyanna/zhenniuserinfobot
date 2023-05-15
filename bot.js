bot.on("message", (ctx) => {
  let lastFrom;
  let lastId;
  let text = "";

  try {
    const message = ctx.message;
    if (message == null) {
      return;
    }
    let user = message.forward_from;
    if (user == null) {
      if (!message.forward_from_chat) {
        user = ctx.from;
      }
    }

    if (user != null) {
      if (lastFrom == message.from.id && lastId == user.id) {
        return;
      }
      if (user.username != null) {
        text += `@${user.username}\n`;
      }
      text += `Id: ${user.id}\n`;
      text += `First: ${user.first_name}\n`;
      if (user.last_name != null) {
        text += `Last: ${user.last_name}\n`;
      }
      if (user.language_code != null) {
        text += `Lang: ${user.language_code}\n`;
      }
      lastFrom = ctx.from.id;
      lastId = user.id;
    } else if (message.forward_from_chat) {
      let channel = message.forward_from_chat;
      if (channel.username != null) {
        text += `@${channel.username}\n`;
      }
      text += `Id: ${channel.id}\n`;
      text += `Title: ${channel.title}\n`;

      if (message.forward_from_message_id != 0 && message.forward_from_chat.username != null) {
        text += `https://t.me/${message.forward_from_chat.username}/${message.forward_from_message_id}`;
      }
    }
    client.sendMessage(ctx.from.id, text, { disable_web_page_preview: true });
  } catch (e) {
    client.sendMessage(data.log_id || "", "New error: " + e.message);
  }
});
