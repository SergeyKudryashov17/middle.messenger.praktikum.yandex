import Block from '../../core/Block';

export default class ErrorPage extends Block {
    typeBody: string;

    constructor(props: any) {
        super("div", {...props});
    }

    render(): string {
        this.typeBody = (this.props.typeBody) ? `messenger-body_${this.props.typeBody}` : '';

        return `
            <main class="messenger-container">
                <div class="messenger-body ${this.typeBody}">
                    <h1>${this.props.title}</h1>
                    <h2>${this.props.caption}</h2>
                    {{{ link }}}
                </div>
            </main>
        `;
    }
}
