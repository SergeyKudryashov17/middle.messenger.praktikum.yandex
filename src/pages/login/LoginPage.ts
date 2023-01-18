import Block from '../../core/Block';
import Form from "../../components/form/Form";
import { withStore } from "../../hocs/withStore";
import { getLoadingState } from "../../utils/getLoadingState";

interface ILoginPageProps {
    typeBody?: string,
    title: string,
    form: Form,
    propDisplay: string;
}

class LoginPage extends Block {
    private typeBody: string = '';

    constructor(props: ILoginPageProps) {
        super("div", { ...props});
    }

    render() {
        this.typeBody = (this.props.typeBody) ? `messenger-body_${this.props.typeBody}` : '';

        if (this.props.isLoading) {
            return `
                <main class="messenger-container">
                    <div class="messenger-body ${this.typeBody}">
                        Loading...
                    </div>
                </main>
            `;
        } else {
            return `
                <main class="messenger-container">
                    <div class="messenger-body ${this.typeBody}">
                        {{{ form }}}
                    </div>
                </main>
            `;
        }
    }
}

export default withStore(getLoadingState)(LoginPage);
