import Block from "../../core/Block";

import './dropdownMenu.css';

export default class DropdownMenu extends Block {
    public classShow: string = 'dropdownMenu_show';

    constructor(props: any) {
        super("button", {...props});
    }

    render(): string {
        let items: string = this.props.items.reduce((itemsHTML, item) =>
            itemsHTML + `<div class="dropdownMenu__item ${item.className}">
                <img class="dropdownMenu__icon-item" src="${item.icon}" alt="">
                ${item.label}
            </div>`
            , '');

        document.addEventListener('click', (event) => this.clickOutsideDropdownMenu(event));

        return `
            <div class="dropdownMenu" id="${this.props.id}">
                ${items}
            </div>
        `;
    }

    public open(event: Event): void {
        event.stopPropagation();

        if (!(event.target instanceof HTMLElement)) return;
        const element: HTMLElement = event.target;
        let position = this.getPosition(element);

        this.element.style.top = `${position.top}px`;
        this.element.style.left = `${position.left}px`;
        this.element.classList.add(this.classShow);
    }

    public close(): void {
        this.element.classList.remove(this.classShow);
    }

    clickOutsideDropdownMenu(event: Event): void {
        if (!(event.target instanceof HTMLElement)) return;
        if (event.target.closest(`.${this.getContent().className}`)) return;
        this.close();
    }

    getPosition(element: HTMLElement): {
        top: number,
        left: number
    } {
        let targetCoordsWindow = element.getBoundingClientRect();

        const marginTop = 5;

        let horizontalDiff = document.documentElement.clientWidth - targetCoordsWindow.left;
        let verticalDiff = document.documentElement.clientHeight - targetCoordsWindow.top;

        let leftPosition = (horizontalDiff > targetCoordsWindow.left)
            ? element.offsetLeft
            : element.offsetLeft - this.getContent().offsetWidth + element.offsetWidth;

        let topPosition = (verticalDiff > targetCoordsWindow.top)
            ? element.offsetTop + element.offsetHeight + marginTop
            : element.offsetTop - this.getContent().offsetHeight - marginTop;

        return {
            top: topPosition,
            left: leftPosition
        }
    }
}