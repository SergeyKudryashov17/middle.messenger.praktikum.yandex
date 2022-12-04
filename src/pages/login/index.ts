import Field from "../../components/field/Field";
import Link from "../../components/link/Link";
import renderDOM from '../../core/renderDOM';
import LoginPage from "./LoginPage";

const fieldLogin: Field = new Field({
    labelText: 'Логин',
    inputType: 'text',
    errorText: 'Неверный логин'
});
const fieldPassword: Field = new Field({
    labelText: 'Пароль',
    inputType: 'password'
});

const linkLogIn: Link = new Link({
    href: '/src/pages/chatStart/index.html',
    className: 'button button_main button_full-width button_centered',
    label: 'Авторизоваться'
});
const linkRegistration: Link = new Link({
    href: '/src/pages/singin/index.html',
    className: 'link_centered',
    label: 'Нет аккаунта'
});

const loginPage: LoginPage = new LoginPage({
    title: 'Вход',
    typeBody: 'default',
    fieldLogin: fieldLogin,
    fieldPassword: fieldPassword,
    linkLogin: linkLogIn,
    linkRegistration: linkRegistration
});

renderDOM("#app", loginPage);