import Link from "../../components/link/Link";
import renderDOM from '../../core/renderDOM.js';
import ErrorPage from "../../components/errorPage/ErrorPage";

const linkBackChats = new Link({
    href: '#',
    className: '',
    label: 'Назад к чатам'
});

const pageServerError = new ErrorPage({
    title: '500',
    typeBody: 'default',
    caption: 'Мы уже фиксим',
    link: linkBackChats
});

renderDOM("#app", pageServerError);
