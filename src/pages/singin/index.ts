import Block from "../../core/Block";
import Form from "../../components/form/Form";
import Field from "../../components/field/Field";
import { checkPasswordMatch, handleValidateField, resetValidateField, validateForm } from "../../utils/validation";
import Button from "../../components/button/Button";
import Link from "../../components/link/Link";
import authService from "../../services/authService";
import { IProfileData } from "../../api/types";

type SigninPageProps = {
    form: Form;
    propDisplay: string;
};

const fieldEmail: Field = new Field({
    labelText: "Почта",
    inputType: "text",
    inputName: "email",
    inputValidateRule: "email",
    errorText: "",
    eventsInput: {
        input: () => resetValidateField(fieldEmail),
        blur: () => handleValidateField(fieldEmail),
    },
});
const fieldLogin: Field = new Field({
    labelText: "Логин",
    inputType: "text",
    inputName: "login",
    inputValidateRule: "login",
    errorText: "",
    eventsInput: {
        input: () => resetValidateField(fieldLogin),
        blur: () => handleValidateField(fieldLogin),
    },
});
const fieldFName: Field = new Field({
    labelText: "Имя",
    inputType: "text",
    inputName: "first_name",
    inputValidateRule: "name",
    errorText: "",
    eventsInput: {
        input: () => resetValidateField(fieldFName),
        blur: () => handleValidateField(fieldFName),
    },
});
const fieldSName: Field = new Field({
    labelText: "Фамилия",
    inputType: "text",
    inputName: "second_name",
    inputValidateRule: "name",
    errorText: "",
    eventsInput: {
        input: () => resetValidateField(fieldSName),
        blur: () => handleValidateField(fieldSName),
    },
});
const fieldPhone: Field = new Field({
    labelText: "Телефон",
    inputType: "text",
    inputName: "phone",
    inputValidateRule: "phone",
    errorText: "",
    eventsInput: {
        input: () => resetValidateField(fieldPhone),
        blur: () => handleValidateField(fieldPhone),
    },
});
const fieldPassword: Field = new Field({
    labelText: "Пароль",
    inputType: "password",
    inputName: "password",
    inputValidateRule: "password",
    errorText: "",
    eventsInput: {
        input: () => resetValidateField(fieldPassword),
        blur: () => handleValidateField(fieldPassword),
    },
});
const fieldPasswordRepeat: Field = new Field({
    labelText: "Пароль (ещё раз)",
    inputType: "password",
    inputName: "password-repeat",
    inputValidateRule: "password",
    errorText: "",
    eventsInput: {
        input: () => resetValidateField(fieldPasswordRepeat),
        blur: () => {
            if (!handleValidateField(fieldPasswordRepeat)) return;
            const error: string = !checkPasswordMatch(fieldPassword, fieldPasswordRepeat) ? "Пароли не совпадают" : "";
            const errorComponent: Block = fieldPasswordRepeat.children.errorTextComponent;
            errorComponent.setProps({
                className: error !== "" ? "error-label_show" : "",
                text: error,
            });
        },
    },
});

const fields: Field[] = [
    fieldEmail,
    fieldLogin,
    fieldFName,
    fieldSName,
    fieldPhone,
    fieldPassword,
    fieldPasswordRepeat,
];

const btnLogIn: Button = new Button({
    type: "submit",
    className: "button_main button_full-width button_centered",
    label: "Авторизоваться",
});
const linkToCome: Block = new Link({
    href: "/login",
    className: "link_centered",
    label: "Войти",
    dataset: {
        page: "pageLogin",
    },
});

const form: Form = new Form({
    title: "Регистрация",
    className: "form",
    fields,
    controls: [btnLogIn, linkToCome],
    events: {
        submit: async (event: Event) => {
            event.preventDefault();

            const status: boolean = validateForm(fields);
            if (status) {
                const formData: IProfileData = {
                    first_name: (fieldFName.children.inputComponent.getContent() as HTMLInputElement).value,
                    second_name: (fieldSName.children.inputComponent.getContent() as HTMLInputElement).value,
                    login: (fieldLogin.children.inputComponent.getContent() as HTMLInputElement).value,
                    email: (fieldEmail.children.inputComponent.getContent() as HTMLInputElement).value,
                    password: (fieldPassword.children.inputComponent.getContent() as HTMLInputElement).value,
                    phone: (fieldPhone.children.inputComponent.getContent() as HTMLInputElement).value,
                };

                await authService.signup(formData);
            }
        },
    },
});

class SigninPage extends Block {
    constructor(props: SigninPageProps) {
        props.form = form;
        props.propDisplay = "flex";

        super("div", { ...props });
    }

    render(): string {
        return `
            <main class="messenger-container">
                <div class="messenger-body messenger-body_default">
                    {{{ form }}}
                </div>
            </main>
        `;
    }
}

export default SigninPage;
