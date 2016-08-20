const Router = require('./router.js');
const Inbox = require('./inbox.js');

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
