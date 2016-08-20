const MessageStore = require('./message_store.js');

class Inbox {
  constructor() {
  }

  render() {
    let ul = document.createElement("ul");
    ul.className = "messages";
    let messages = MessageStore.getInboxMessages();
    messages.forEach((message) => {
      ul.appendChild(this.renderMessage(message));
    });
    return ul;
  }
}

module.exports = Inbox;
