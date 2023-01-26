import Block from "../../core/Block";

import './dropdownMenu.css';
import dropdownMenuItem from "../dropdownMenuItem";

type ItemMenu = {
    className: string,
    icon: string,
    label: string,
    events?: Record<string, Function>
}

interface IDropdownMenuProps {
    itemsComponents?: dropdownMenuItem[]
    items: ItemMenu[],
    id: string,
    events?: Record<string, Function>
}

export default class DropdownMenu extends Block {
    public classShow: string = 'dropdownMenu_show';

    constructor(props: IDropdownMenuProps) {
        props.itemsComponents = [];
        props.items.forEach((item) => {
            props.itemsComponents?.push(
                new dropdownMenuItem({
                    icon: item.icon,
                    label: item.label,
                    className: item.className,
                    events: item?.events
                })
            );
        });

        super("button", {...props});
    }

    render(): string {
        document.addEventListener('click', (event) => this.clickOutsideDropdownMenu(event));

        return `
            <div class="dropdownMenu" id="${this.props.id}">
                {{#each itemsComponents}}
                  {{{this}}}
                {{/each}}
            </div>
        `;
    }

    public open(event: Event): void {
        event.stopPropagation();

        if (!(event.target instanceof HTMLElement)) return;
        const element: HTMLElement = event.target;
        let position = this.getPosition(element);

        (this.element as HTMLElement).style.top = `${position.top}px`;
        (this.element as HTMLElement).style.left = `${position.left}px`;
        (this.element as HTMLElement).classList.add(this.classShow);
    }

    public close(): void {
        this.element?.classList.remove(this.classShow);
    }

    clickOutsideDropdownMenu(event: Event): void {
        if (!(event.target instanceof HTMLElement)) return;
        if (event.target.closest(`.${this.getContent()?.className}`)) return;
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
            : element.offsetLeft - (this.getContent() as HTMLElement).offsetWidth + element.offsetWidth;

        let topPosition = (verticalDiff > targetCoordsWindow.top)
            ? element.offsetTop + element.offsetHeight + marginTop
            : element.offsetTop - (this.getContent() as HTMLElement).offsetHeight - marginTop;

        return {
            top: topPosition,
            left: leftPosition
        }
    }
}
