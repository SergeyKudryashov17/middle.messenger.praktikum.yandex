import Block from "../../core/Block";

import './dropdownMenu.css';

export default class DropdownMenu extends Block {
    classShow = 'dropdownMenu_show';

    constructor(props) {
        super("button", {...props});
    }

    render() {
        let items = this.props.items.reduce((itemsHTML, item) =>
            itemsHTML + `<div class="dropdownMenu__item ${item.className}">
                <img class="dropdownMenu__icon-item" src="${item.icon}" alt="">
                ${item.label}
            </div>`
            , '');

        document.addEventListener('click', (event) =>this.clickOutsideDropdownMenu(event));

        return `
            <div class="dropdownMenu" id="${this.props.id}">
                ${items}
            </div>
        `;
    }

    open(event) {
        console.log(event);
        event.stopPropagation();

        let position = this.getPosition(event);

        this.element.style.top = `${position.top}px`;
        this.element.style.left = `${position.left}px`;
        this.element.classList.add(this.classShow);

        // document.addEventListener('click', this.handlerClickOutside);
    }

    close() {
        this.element.classList.remove(this.classShow);
        // document.removeEventListener('click', this.handlerClickOutside);
    }

    clickOutsideDropdownMenu(event) {
        if (event.target.closest(`.${this.getContent().className}`)) return;
        this.close();
    }

    getPosition(event) {
        let targetCoordsWindow = event.target.getBoundingClientRect();

        const marginTop = 5;

        let horizontalDiff = document.documentElement.clientWidth - targetCoordsWindow.left;
        let verticalDiff = document.documentElement.clientHeight - targetCoordsWindow.top;

        let leftPosition = (horizontalDiff > targetCoordsWindow.left)
            ? event.target.offsetLeft
            : event.target.offsetLeft - this.getContent().offsetWidth + event.target.offsetWidth;

        let topPosition = (verticalDiff > targetCoordsWindow.top)
            ? event.target.offsetTop + event.target.offsetHeight + marginTop
            : event.target.offsetTop - this.getContent().offsetHeight - marginTop;

        return {
            top: topPosition,
            left: leftPosition
        }
    }
}