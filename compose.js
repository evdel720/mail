const MessageStore = require('./message_store.js');


class Compose {
  render() {
    let div = document.createElement("div");
    div.className = "new-message";
    div.innerHTML = this.renderForm();
    div.addEventListener("change", (e) => {
      e.preventDefault();
      MessageStore.updateDraftField(e.target.name, e.target.value);
    })

    div.addEventListener("submit", (e) => {
      e.preventDefault();
      MessageStore.sendDraft();
      window.location.hash = "inbox";
    })
    return div;
  }

  renderForm() {
    let message = MessageStore.getMessageDraft();
    let form = `
    <p class="new-message-header">New Message</p>
    <form class="compose-form">
      <input placeholder="Recipient" name="to", type="text", value="${message.to}"/>
      <input placeholder="Subject" name="subject", type="text", value="${message.subject}"/>
      <textarea name="body" rows="20">${message.body}</textarea>
      <button type="submit" class="btn btn-primary submit-message">Send</button>
    </form>`
    return form;
  }
}

module.exports = Compose;
