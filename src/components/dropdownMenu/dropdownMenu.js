export default class DropdownMenu {
    node = null;
    nodeSelector = null;
    classShow = 'dropdownMenu_show';
    // handlerClickOutside = (event) => this.clickOutsideDropdownMenu(event);

    constructor(nodeSelector) {
        this.nodeSelector = nodeSelector;
        this.node = document.querySelector(this.nodeSelector);
    }

    open(event) {
        event.stopPropagation();

        let position = this.getPosition(event);

        this.node.style.top = `${position.top}px`;
        this.node.style.left = `${position.left}px`;
        this.node.classList.add(this.classShow);

        // document.addEventListener('click', this.handlerClickOutside);
    }

    close() {
        this.node.classList.remove(this.classShow);
        // document.removeEventListener('click', this.handlerClickOutside);
    }

    /*
    clickOutsideDropdownMenu(event) {
        if (event.target.closest(this.nodeSelector)) return;
        this.close();
    }
    */

    getPosition(event) {
        let targetCoordsWindow = event.target.getBoundingClientRect();

        const marginTop = 5;

        let horizontalDiff = document.documentElement.clientWidth - targetCoordsWindow.left;
        let verticalDiff = document.documentElement.clientHeight - targetCoordsWindow.top;

        let leftPosition = (horizontalDiff > targetCoordsWindow.left)
            ? event.target.offsetLeft
            : event.target.offsetLeft - this.node.offsetWidth + event.target.offsetWidth;

        let topPosition = (verticalDiff > targetCoordsWindow.top)
            ? event.target.offsetTop + event.target.offsetHeight + marginTop
            : event.target.offsetTop - this.node.offsetHeight - marginTop;

        return {
            top: topPosition,
            left: leftPosition
        }
    }
}