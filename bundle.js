/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Router = __webpack_require__(1);
	const Inbox = __webpack_require__(2);
	const Sent = __webpack_require__(4);
	const Compose = __webpack_require__(5);

	const routes = {};
	routes.inbox = new Inbox();
	routes.sent = new Sent();
	routes.compose = new Compose();

	document.addEventListener("DOMContentLoaded", function () {

	  Array.from(document.querySelectorAll(".sidebar-nav li")).forEach((li) => {
	    li.addEventListener("click", function (event) {
	      event.preventDefault();
	      let location = li.innerText.toLowerCase();
	      window.location.hash = location;
	    });
	  });

	  let content = document.querySelector(".content");
	  let router = new Router(content, routes);
	  router.start();
	  location.hash = "inbox";
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Router {
	  constructor(node, routes) {
	    this.node = node;
	    this.routes = routes;
	  }

	  start() {
	    window.addEventListener("hashchange", (e) => this.render());
	  }

	  render() {
	    let component = this.activeRoute();
	    this.node.innerHTML = "";
	    if (component) {
	      this.node.appendChild(component.render());
	    }
	  }

	  activeRoute() {
	    let fragment = window.location.hash.slice(1);
	    console.log(this.routes);
	    return this.routes[fragment];
	  }
	}

	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	class Inbox {

	  render() {
	    let ul = document.createElement("ul");
	    ul.className = "messages";
	    let messages = MessageStore.getInboxMessages();
	    messages.forEach((message) => {
	      ul.appendChild(this.renderMessage(message));
	    });
	    return ul;
	  }

	  renderMessage(message) {
	    let li = document.createElement("li");
	    li.className = "message";
	    li.innerHTML = `<span class="from">${message.from}</span>
	    <span class="subject">${message.subject}</span>
	     -
	    <span class="body">${message.body}</span>`
	    return li;
	  }
	}

	module.exports = Inbox;


/***/ },
/* 3 */
/***/ function(module, exports) {

	
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);


	class Sent {

	  render() {
	    let ul = document.createElement("ul");
	    ul.className = "messages";
	    let messages = MessageStore.getSentMessages();
	    messages.forEach((message) => {
	      ul.appendChild(this.renderMessage(message));
	    });
	    return ul;
	  }

	  renderMessage(message) {
	    let li = document.createElement("li");
	    li.className = "message";
	    li.innerHTML = `<span class="to">To : ${message.to}</span>
	    <span class="subject">${message.subject}</span>
	     -
	    <span class="body">${message.body}</span>`
	    return li;
	  }
	}

	module.exports = Sent;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);


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


/***/ }
/******/ ]);