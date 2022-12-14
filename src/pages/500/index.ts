import Link from "../../components/link/Link";
import ErrorPage from "../../components/errorPage/ErrorPage";

const linkBackChats: Link = new Link({
    href: '#',
    className: '',
    label: 'Назад к чатам',
    dataset: {
        page: 'chatStart'
    }
});

export const pageServerError: ErrorPage = new ErrorPage({
    title: '500',
    typeBody: 'default',
    caption: 'Мы уже фиксим',
    link: linkBackChats
});
