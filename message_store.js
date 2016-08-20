
let messages = {
  sent: [
    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
    {to: "person@mail.com", subject: "zzz", body: "so booring"}
  ],
  inbox: [
    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
    "Stay at home mom discovers cure for leg cramps. Doctors hate her"},
    {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
  ]
};

class Message {
  constructor() {
    this.from = "";
    this.to = "";
    this.subject = "";
    this.body = "";
  }
}

let messageDraft = new Message();

const MessageStore = {};
MessageStore.getInboxMessages = function() { return messages.inbox };
MessageStore.getSentMessages = function() { return messages.sent };
MessageStore.getMessageDraft = function() { return messageDraft }
MessageStore.updateDraftField = function(field, value) {
  messageDraft[field] = value;
}
MessageStore.sendDraft = function() {
  messages.sent.push(messageDraft);
  messageDraft = new Message();
}
module.exports = MessageStore;
