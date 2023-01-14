import Block from '../../core/Block';
import Form from "../../components/form/Form";

interface ILoginPageProps {
    typeBody?: string,
    title: string,
    form: Form,
    propDisplay: string;
}

export default class LoginPage extends Block {
    private typeBody: string = '';

    constructor(props: ILoginPageProps) {
        super("div", { ...props});
    }

    render() {
        this.typeBody = (this.props.typeBody) ? `messenger-body_${this.props.typeBody}` : '';

        return `
            <main class="messenger-container">
                <div class="messenger-body ${this.typeBody}">
                    {{{ form }}}
                </div>
            </main>
        `;
    }
}
