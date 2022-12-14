import Link from "../../components/link/Link";
import ErrorPage from "../../components/errorPage/ErrorPage";

const linkBackChats: Link = new Link({
    href: "#",
    className: "",
    label: "Назад к чатам",
    dataset: {
        page: 'chatStart'
    }
});

export const pageNotFound: ErrorPage = new ErrorPage({
    title: "404",
    typeBody: "default",
    caption: "Не туда попали",
    link: linkBackChats,
});
