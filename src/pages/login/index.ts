import Field from "../../components/field/Field";
import Link from "../../components/link/Link";
import LoginPage from "./LoginPage";
import { handleValidateField, resetValidateField, validateForm } from "../../utils/validation";
import Button from "../../components/button/Button";
import Form from "../../components/form/Form";

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

const fields = [fieldLogin, fieldPassword];

const btnLogIn: Button = new Button({
    type: 'submit',
    className: 'button_main button_full-width button_centered',
    label: 'Авторизоваться'
});
const linkRegistration: Link = new Link({
    href: '/singin',
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
                let formData: Record<string, string> = {};
                fields.map(fieldComponent => {
                    const fieldName: string = (fieldComponent.children.inputComponent.getContent() as HTMLInputElement).name;
                    formData[fieldName] = (fieldComponent.children.inputComponent.getContent() as HTMLInputElement).value;
                });

                console.log(formData);
            }
        }
    }
});


export const loginPage: LoginPage = new LoginPage({
    title: 'Вход',
    typeBody: 'default',
    form: form,
    propDisplay: 'flex'
});
