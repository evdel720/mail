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

	const routes = {};
	routes.inbox = new Inbox();

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


	class MessageStore {
	  constructor() {
	    this.messages = messages;
	  }

	  getInboxMessages() {
	    return this.messages.inbox;
	  }

	  getSentMessages() {
	    return this.messages.sent;
	  }
	}

	module.exports = MessageStore;


/***/ }
/******/ ]);