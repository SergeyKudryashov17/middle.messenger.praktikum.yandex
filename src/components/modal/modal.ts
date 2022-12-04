export default class Modal {
    public node: HTMLElement | null = null;

    constructor(modalID: string) {
        this.node = document.querySelector(`#${modalID}`);
        this.node.addEventListener('click', (event) => this.handlerClickBackdrop(event));
    }

    open(): void {
        this.node.classList.remove('modal_hide');
    }

    close(): void {
        this.node.classList.add('modal_hide');
    }

    emit(handlersList:
        [{
            elemSelector: string,
            type: 'string',
            func: EventListener
        }]
    ): void {
        handlersList.forEach(handler => {
            let target: HTMLElement = this.node.querySelector(handler.elemSelector);
            target.addEventListener(handler.type, handler.func);
        });
    }

    handlerClickBackdrop(event: Event): void {
        if (!(event.target instanceof HTMLElement) || event.target.closest('.modal__window')) return;
        this.close();
    }
}