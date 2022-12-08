import Block from '../../core/Block';

export default class LoginPage extends Block {
    private typeBody: string = '';

    constructor(props: any) {
        super("div", { ...props});
    }

    render() {
        this.typeBody = (this.props.typeBody) ? `messenger-body_${this.props.typeBody}` : '';

        return `
            <main class="messenger-container">
                <div class="messenger-body ${this.typeBody}">
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