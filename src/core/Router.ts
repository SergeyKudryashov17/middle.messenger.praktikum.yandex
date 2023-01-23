import Block from "./Block";
import Route from "./Route";

class Router {
  public routes:Route[] = [];
  public history:History = window.history;
  private currentRoute: null = null;
  private static instance: Router;
  private rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.instance) {
      return Router.instance;
    }
    this.rootQuery = rootQuery;
    Router.instance = this;
  }

  use(pathname: string, block: Block): Router {
    const route: Route = new Route(pathname, block, {rootQuery: this.rootQuery});
    this.routes.push(route);
    return this;
  }

  start(pathname: string = '') {
    window.onpopstate = (event: Event) => {
      this.onRoute(event.currentTarget.location.pathname);
    }

    const path: string = pathname === '' ? window.location.pathname : pathname;
    this.onRoute(path);
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) return;

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}

export default new Router('#app');
