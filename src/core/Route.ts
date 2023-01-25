import renderDOM from "./renderDOM";
import Block from "./Block";

export interface BlockConstructable<P = any> {
  new(props: P): Block<P>;
}

export default class Route {
  private pathname: string;
  private blockClass: BlockConstructable;
  private block: Block | null;
  private props: Record<string, any>;

  constructor(pathname: string, view: BlockConstructable, props: Record<string, any>) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
    this.props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }


  leave(): void {
    this.block = null;
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass({});
      renderDOM(this.props.rootQuery, this.block as Block);
      return;
    }

    renderDOM(this.props.rootQuery, this.block as Block);
  }
}
