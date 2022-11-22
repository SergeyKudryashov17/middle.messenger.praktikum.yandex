import Field from "../../components/field/Field";
import Link from "../../components/link/Link";
import renderDOM from '../../core/renderDOM.js';
import LoginPage from "./LoginPage.js";

const fieldLogin = new Field({
    labelText: 'Логин',
    inputType: 'text',
    errorText: 'Неверный логин'
});
const fieldPassword = new Field({
    labelText: 'Пароль',
    inputType: 'password'
});

const linkLogIn = new Link({
    href: '/src/pages/chatStart/index.html',
    className: 'button button_main button_full-width button_centered',
    label: 'Авторизоваться'
});
const linkRegistration = new Link({
    href: '/src/pages/singin/index.html',
    className: 'link_centered',
    label: 'Нет аккаунта'
});

const loginPage = new LoginPage({
    title: 'Вход',
    typeBody: 'default',
    fieldLogin: fieldLogin,
    fieldPassword: fieldPassword,
    linkLogin: linkLogIn,
    linkRegistration: linkRegistration
});

// app — это class дива в корне DOM
renderDOM("#app", loginPage);