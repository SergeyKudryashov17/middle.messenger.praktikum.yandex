import Block from '../../core/Block.js';

export default class LoginPage extends Block {
    constructor(props) {
        super("div", { ...props});
    }

    render() {
        const typeBody = (this.props.typeBody) ? `messenger-body_${this.props.typeBody}` : '';

        return `
            <main class="messenger-container">
                <div class="messenger-body ${typeBody}">
                    <div class="form">
                        <div class="form__title">${this.props.title}</div>
                        <div class="form__fields">
                            {{{ fieldLogin }}}
                            {{{ fieldPassword }}}
                        </div>
                        <div class="form__footer">
                            {{{ linkLogin }}}
                            {{{ linkRegistration }}}
                        </div>
                    </div>
                </div>
            </main>
        `;
    }
}