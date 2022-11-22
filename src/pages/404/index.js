import Link from "../../components/link/Link";
import renderDOM from '../../core/renderDOM.js';
import ErrorPage from "../../components/errorPage/ErrorPage";

const linkBackChats = new Link({
    href: '#',
    className: '',
    label: 'Назад к чатам'
});

const pageNotFound = new ErrorPage({
    title: '404',
    typeBody: 'default',
    caption: 'Не туда попали',
    link: linkBackChats
});

renderDOM("#app", pageNotFound);
