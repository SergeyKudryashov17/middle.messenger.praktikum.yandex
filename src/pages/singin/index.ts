import Field from "../../components/field/Field";
import Link from "../../components/link/Link";
import renderDOM from '../../core/renderDOM';
import { handleValidateField, resetValidateField, validateForm, checkPasswordMatch } from '../../utils/validation.js';
import SinginPage from "./SinginPage";
import Block from "../../core/Block";


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
    inputName: 'FName',
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
    inputName: 'SName',
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
    inputValidateRule: 'password',
    errorText: '',
    eventsInput: {
        input: () => resetValidateField(fieldPasswordRepeat),
        blur: () => {
            if (!handleValidateField(fieldPasswordRepeat)) return;
            let error: string = (!checkPasswordMatch(fieldPassword, fieldPasswordRepeat))
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

const linkLogIn = new Link({
    href: '/src/pages/chatStart/index.html',
    className: 'button button_main button_full-width button_centered',
    label: 'Авторизоваться',
    events: {
        click: (event: Event) => {
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
const linkToCome: Link = new Link({
    href: '/src/pages/login/index.html',
    className: 'link_centered',
    label: 'Войти'
});

const singInPage: SinginPage = new SinginPage({
    title: 'Регистрация',
    typeBody: 'default',
    fieldEmail: fieldEmail,
    fieldLogin: fieldLogin,
    fieldFName: fieldFName,
    fieldSName: fieldSName,
    fieldPhone: fieldPhone,
    fieldPassword: fieldPassword,
    fieldPasswordRepeat: fieldPasswordRepeat,
    linkToCome: linkToCome,
    linkLogin: linkLogIn
});

renderDOM("#app", singInPage);