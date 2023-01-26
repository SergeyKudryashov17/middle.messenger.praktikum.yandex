import Route, { BlockConstructable } from "./Route";

class Router {
  public routes:Route[] = [];
  public history:History = window.history;
  private currentRoute: Route | null = null;
  private static instance: Router;
  private rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.instance) {
      return Router.instance;
    }
    this.rootQuery = rootQuery;
    Router.instance = this;
  }

  public use(pathname: string, block: BlockConstructable): Router {
    const route: Route = new Route(pathname, block, {rootQuery: this.rootQuery});
    this.routes.push(route);
    return this;
  }

  public start(pathname: string = '') {
    window.onpopstate = (event: Event) => {
      const target = event.currentTarget as Window;
      this.onRoute(target.location.pathname);
    }

    const path: string = pathname === '' ? window.location.pathname : pathname;
    this.onRoute(path);
  }

  public reset() {
    this.routes = [];
    this.currentRoute = null;
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    console.log(route);

    if (!route) return;

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}

export default new Router('#app');
