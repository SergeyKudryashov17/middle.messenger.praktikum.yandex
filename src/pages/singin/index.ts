import Block from "../../core/Block";
import { handleValidateField, resetValidateField, validateForm, checkPasswordMatch } from '../../utils/validation';
import Field from "../../components/field/Field";
import Link from "../../components/link/Link";
import Form from "../../components/form/Form";
import Button from "../../components/button/Button";
import SinginPage from "./SinginPage";


const fieldEmail: Field  = new Field({
    labelText: 'Почта',
    inputType: 'text',
    inputName: 'email',
    inputValidateRule: 'email',
    errorText: '',
    eventsInput: {
        input: () => resetValidateField(fieldEmail),
        blur: () => handleValidateField(fieldEmail)
    }
});
const fieldLogin: Field = new Field({
    labelText: 'Логин',
    inputType: 'text',
    inputName: 'login',
    inputValidateRule: 'login',
    errorText: '',
    eventsInput: {
        input: () => resetValidateField(fieldLogin),
        blur: () => handleValidateField(fieldLogin)
    }
});
const fieldFName: Field  = new Field({
    labelText: 'Имя',
    inputType: 'text',
    inputName: 'first_name',
    inputValidateRule: 'name',
    errorText: '',
    eventsInput: {
        input: () => resetValidateField(fieldFName),
        blur: () => handleValidateField(fieldFName)
    }
});
const fieldSName: Field  = new Field({
    labelText: 'Фамилия',
    inputType: 'text',
    inputName: 'second_name',
    inputValidateRule: 'name',
    errorText: '',
    eventsInput: {
        input: () => resetValidateField(fieldSName),
        blur: () => handleValidateField(fieldSName)
    }
});
const fieldPhone: Field = new Field({
    labelText: 'Телефон',
    inputType: 'text',
    inputName: 'phone',
    inputValidateRule: 'phone',
    errorText: '',
    eventsInput: {
        input: () => resetValidateField(fieldPhone),
        blur: () => handleValidateField(fieldPhone)
    }
});
const fieldPassword: Field = new Field({
    labelText: 'Пароль',
    inputType: 'password',
    inputName: 'password',
    inputValidateRule: 'password',
    errorText: '',
    eventsInput: {
        input: () => resetValidateField(fieldPassword),
        blur: () => handleValidateField(fieldPassword)
    }
});
const fieldPasswordRepeat: Field = new Field({
    labelText: 'Пароль (ещё раз)',
    inputType: 'password',
    inputName: 'password-repeat',
    inputValidateRule: 'password',
    errorText: '',
    eventsInput: {
        input: () => resetValidateField(fieldPasswordRepeat),
        blur: () => {
            if (!handleValidateField(fieldPasswordRepeat)) return;
            const error: string = (!checkPasswordMatch(fieldPassword, fieldPasswordRepeat))
                ? 'Пароли не совпадают'
                : '';
            const errorComponent: Block = fieldPasswordRepeat.children.errorTextComponent;
            errorComponent.setProps({
                className: (error !== '') ? 'error-label_show' : '',
                text: error
            });
        }
    }
});

let fields = [
    fieldEmail,
    fieldLogin,
    fieldFName,
    fieldSName,
    fieldPhone,
    fieldPassword,
    fieldPasswordRepeat
];

const btnLogIn: Button = new Button({
    type: 'submit',
    className: 'button_main button_full-width button_centered',
    label: 'Авторизоваться'
});
const linkToCome: Link = new Link({
    href: '#',
    className: 'link_centered',
    label: 'Войти',
    dataset: {
        page: 'pageLogin'
    }
});

const form: Form = new Form({
    title: 'Регистрация',
    className: 'form',
    fields: fields,
    controls: [
        btnLogIn,
        linkToCome
    ],
    events: {
        submit: (event: Event) => {
            event.preventDefault();

            const status: boolean = validateForm(fields);
            if (status) {
                let formData: Record<string, string> = {};
                fields.map(fieldComponent => {
                    const fieldName: string = (fieldComponent.children.inputComponent.getContent() as HTMLInputElement).name;
                    const fieldValue: string = (fieldComponent.children.inputComponent.getContent() as HTMLInputElement).value;
                    formData[fieldName] = fieldValue;
                });

                console.log(formData);
            }
        }
    }
});

export const singInPage: SinginPage = new SinginPage({
    propDisplay: 'flex',
    title: 'Регистрация',
    typeBody: 'default',
    form: form
});
