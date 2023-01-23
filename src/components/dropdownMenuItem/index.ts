import Block from "../../core/Block";

type dropdownMenuItemProps = {
  icon: string,
  label: string,
  className: string,
  events?: Record<string, Function>
}

export default class dropdownMenuItem extends Block {
  constructor(props: dropdownMenuItemProps) {
    super('div', { ...props });
  }

  render(): string {
    return `<div class="dropdownMenu__item">
                <img class="dropdownMenu__icon-item ${this.props.className}" src="${this.props.icon}" alt="icon">
                ${this.props.label}
            </div>`
  }
}
