import Field from "../../components/field/Field";
import Link from "../../components/link/Link";
import renderDOM from '../../core/renderDOM';
import LoginPage from "./LoginPage";
import { handleValidateField, resetValidateField, validateForm } from "../../utils/validation";
import Button from "../../components/button/Button";

const fieldLogin: Field = new Field({
    labelText: 'Логин',
    inputName: 'login',
    inputType: 'text',
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
    errorText: '',
    eventsInput: {
        input: () => resetValidateField(fieldPassword),
        blur: () => handleValidateField(fieldPassword)
    }
});

const fields = [fieldLogin, fieldPassword];

const btnLogIn: Link = new Button({
    className: 'button_main button_full-width button_centered',
    label: 'Авторизоваться',
    events: {
        click: (event) => {
            event.preventDefault();

            let status: boolean = validateForm(fields);
            if (status) {
                let formData = {};
                fields.map(fieldComponent => {
                    let fieldName: string = (fieldComponent.children.inputComponent.getContent() as HTMLInputElement).name;
                    let fieldValue: string = (fieldComponent.children.inputComponent.getContent() as HTMLInputElement).value;
                    formData[fieldName] = fieldValue;
                });

                console.log(formData);
            }
        }
    }
});
const linkRegistration: Link = new Link({
    href: '#',
    className: 'link_centered',
    label: 'Нет аккаунта',
    dataset: {
        page: 'pageSingin'
    }
});

export const loginPage: LoginPage = new LoginPage({
    title: 'Вход',
    typeBody: 'default',
    fieldLogin: fieldLogin,
    fieldPassword: fieldPassword,
    linkLogin: btnLogIn,
    linkRegistration: linkRegistration
});

renderDOM("#app", loginPage);