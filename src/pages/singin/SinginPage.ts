import Block from '../../core/Block';
import Form from "../../components/form/Form";

interface ISinginPageProps {
    typeBody?: string,
    title: string,
    form: Form,
    propDisplay: string;
}

export default class SinginPage extends Block {
    typeBody: string;

    constructor(props: ISinginPageProps) {
        super("div", {...props});
    }

    render(): string {
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
