import Block from '../../core/Block';
import Form from "../../components/form/Form";
import { withStore } from "../../hocs/withStore";
import { getLoadingState } from "../../utils/getLoadingState";
import Field from "../../components/field/Field";
import { handleValidateField, resetValidateField, validateForm } from "../../utils/validation";
import Button from "../../components/button/Button";
import Link from "../../components/link/Link";
import { SigninData } from "../../api/types";
import authService from "../../services/authService";

type LoginPageProps = {
    form: Form,
    propDisplay: string;
}

const fieldLogin: Field = new Field({
    labelText: 'Логин',
    inputName: 'login',
    inputType: 'text',
    inputValidateRule: 'login',
    errorText: '',
    eventsInput: {
        input: () => resetValidateField(fieldLogin),
        blur: () => handleValidateField(fieldLogin)
    }
});
const fieldPassword: Field = new Field({
    labelText: 'Пароль',
    inputName: 'password',
    inputType: 'password',
    inputValidateRule: 'password',
    errorText: '',
    eventsInput: {
        input: () => resetValidateField(fieldPassword),
        blur: () => handleValidateField(fieldPassword)
    }
});
const fields: Field[] = [fieldLogin, fieldPassword];
const btnLogIn: Button = new Button({
    type: 'submit',
    className: 'button_main button_full-width button_centered',
    label: 'Авторизоваться'
});
const linkRegistration: Link = new Link({
    href: '/signin',
    className: 'link_centered',
    label: 'Нет аккаунта'
});
const form: Form = new Form({
    title: 'Вход',
    className: 'form',
    fields: fields,
    controls: [
        btnLogIn,
        linkRegistration
    ],
    events: {
        submit: (event: Event) => {
            event.preventDefault();

            const status: boolean = validateForm(fields);
            if (status) {
                let formData: SigninData = {};
                fields.map(fieldComponent => {
                    const fieldName: string = (fieldComponent.children.inputComponent.getContent() as HTMLInputElement).name;
                    formData[fieldName] = (fieldComponent.children.inputComponent.getContent() as HTMLInputElement).value;
                });

                console.log(formData);

                authService.signin(formData);
            }
        }
    }
});


class LoginPage extends Block {
    constructor(props: LoginPageProps) {
        console.log(props);
        props.propDisplay = 'flex';
        props.form = form;

        super("div", { ...props});
    }

    render() {
        return `
            <main class="messenger-container">
                <div class="messenger-body messenger-body_default">
                    {{{ form }}}
                </div>
            </main>
        `;
    }
}

export default LoginPage;
