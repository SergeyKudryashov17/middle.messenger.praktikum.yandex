import Block from '../../core/Block';

export default class LoginPage extends Block {
    typeBody: string;

    constructor(props: any) {
        super("div", {...props});
    }

    render(): string {
        this.typeBody = (this.props.typeBody) ? `messenger-body_${this.props.typeBody}` : '';

        return `
            <main class="messenger-container">
                <div class="messenger-body ${this.typeBody}">
                    <div class="form">
                        <div class="form__title">${this.props.title}</div>
                        <div class="form__fields">
                            {{{ fieldEmail }}}
                            {{{ fieldLogin }}}
                            {{{ fieldFName }}}
                            {{{ fieldSName }}}
                            {{{ fieldPhone }}}
                            {{{ fieldPassword }}}
                            {{{ fieldPasswordRepeat }}}
                        </div>
                        <div class="form__footer">
                            {{{ linkLogin }}} 
                            {{{ linkToCome }}}                                                    
                        </div>
                    </div>
                </div>
            </main>
        `;
    }
}
