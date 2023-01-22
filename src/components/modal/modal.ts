import Block from "../../core/Block";

export type ModalProps = {
    modalID: string,
    title: string
}

export default class Modal extends Block {
    public template: string = ;

    constructor(props: ModalProps) {
        // this.node = document.querySelector(`#${modalID}`);
        // this.node?.addEventListener('click', (event) => this.handlerClickBackdrop(event));
        super('div', {...props});
    }

    openModal(): void {
        this.getContent()?.classList.remove('modal_hide');
    }

    closeModal(): void {
        this.getContent()?.classList.add('modal_hide');
    }

    emit(handlersList:
        [{
            elemSelector: string,
            type: 'string',
            func: EventListener
        }]
    ): void {
        handlersList.forEach(handler => {
            let target: HTMLElement | null | undefined = this.node?.querySelector(handler.elemSelector);
            target?.addEventListener(handler.type, handler.func);
        });
    }

    handlerClickBackdrop(event: Event): void {
        if (!(event.target instanceof HTMLElement) || event.target.closest('.modal__window')) return;
        this.closeModal();
    }
}
