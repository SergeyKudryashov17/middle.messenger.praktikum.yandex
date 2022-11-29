import Block from '../../core/Block.js';

export default class ErrorPage extends Block {
    constructor(props) {
        super("div", {...props});
    }

    render() {
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