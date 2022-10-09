export default class Modal {
    node = null;

    constructor(modalID) {
        this.node = document.querySelector(`#${modalID}`);
        this.node.addEventListener('click', (event) => this.handlerClickBackdrop(event));
    }

    open() {
        this.node.classList.remove('modal_hide');
    }

    close() {
        this.node.classList.add('modal_hide');
    }

    emit(handlersList) {
        handlersList.forEach(handler => {
            let target = this.node.querySelector(handler.elemSelector);
            target.addEventListener(handler.type, handler.func);
        });
    }

    handlerClickBackdrop(event) {
        if (event.target.closest('.modal__window')) return;
        this.close();
    }
}