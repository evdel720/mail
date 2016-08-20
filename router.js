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
