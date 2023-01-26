import Block from "../../core/Block";
import Form from "../../components/form/Form";
import Field from "../../components/field/Field";
import { handleValidateField, resetValidateField, validateForm } from "../../utils/validation";
import Button from "../../components/button/Button";
import Link from "../../components/link/Link";
import { SigninData } from "../../api/types";
import authService from "../../services/authService";

type LoginPageProps = {
    form: Form;
    propDisplay: string;
};

const fieldLogin: Field = new Field({
    labelText: "Логин",
    inputName: "login",
    inputType: "text",
    inputValidateRule: "login",
    errorText: "",
    eventsInput: {
        input: () => resetValidateField(fieldLogin),
        blur: () => handleValidateField(fieldLogin),
    },
});
const fieldPassword: Field = new Field({
    labelText: "Пароль",
    inputName: "password",
    inputType: "password",
    inputValidateRule: "password",
    errorText: "",
    eventsInput: {
        input: () => resetValidateField(fieldPassword),
        blur: () => handleValidateField(fieldPassword),
    },
});
const fields: Field[] = [fieldLogin, fieldPassword];
const btnLogIn: Button = new Button({
    type: "submit",
    className: "button_main button_full-width button_centered",
    label: "Авторизоваться",
});
const linkRegistration: Block = new Link({
    href: "/signin",
    className: "link_centered",
    label: "Нет аккаунта",
});
const form: Form = new Form({
    title: "Вход",
    className: "form",
    fields,
    controls: [btnLogIn, linkRegistration],
    events: {
        submit: (event: Event) => {
            event.preventDefault();

            const status: boolean = validateForm(fields);
            if (status) {
                const formData: SigninData = {
                    login: (fieldLogin.children.inputComponent.getContent() as HTMLInputElement).value,
                    password: (fieldPassword.children.inputComponent.getContent() as HTMLInputElement).value,
                };

                authService.signin(formData);
            }
        },
    },
});

class LoginPage extends Block {
    constructor(props: LoginPageProps) {
        props.propDisplay = "flex";
        props.form = form;

        super("div", { ...props });
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
