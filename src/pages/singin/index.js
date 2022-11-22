import Field from "../../components/field/Field";
import Link from "../../components/link/Link";
import renderDOM from '../../core/renderDOM.js';
import { handleValidateField, resetValidateField, validateForm, checkPasswordMatch } from '../../utils/validation.js';
import SinginPage from "./SinginPage.js";


const fieldEmail  = new Field({
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
const fieldLogin = new Field({
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
const fieldFName  = new Field({
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
const fieldSName  = new Field({
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
const fieldPhone = new Field({
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
const fieldPassword = new Field({
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
const fieldPasswordRepeat = new Field({
    labelText: 'Пароль (ещё раз)',
    inputType: 'password',
    inputValidateRule: 'password',
    errorText: '',
    eventsInput: {
        input: () => resetValidateField(fieldPasswordRepeat),
        blur: () => {
            if (!handleValidateField(fieldPasswordRepeat)) return;
            let error = (!checkPasswordMatch(fieldPassword, fieldPasswordRepeat))
                ? 'Пароли не совпадают'
                : '';
            const errorComponent = fieldPasswordRepeat.children.errorTextComponent;
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
        click: (event) => {
            event.preventDefault();

            let status = validateForm(fields);
            if (status) {
                let formData = {};
                fields.map(fieldComponent => {
                    let fieldName = fieldComponent.children.inputComponent.getContent().name;
                    let fieldValue = fieldComponent.children.inputComponent.getContent().value;
                    formData[fieldName] = fieldValue;
                });

                console.log(formData);
            }
        }
    }
});
const linkToCome = new Link({
    href: '/src/pages/login/index.html',
    className: 'link_centered',
    label: 'Войти'
});

const singInPage = new SinginPage({
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
