import Link from "../../components/link/Link";
import ErrorPage from "../../components/errorPage/ErrorPage";

type PageNotFoundProps = {
    title: string,
    caption: string,
    propDisplay: string,
    link: Link
}

export default class PageNotFound extends ErrorPage {
    constructor(props: PageNotFoundProps) {
        props.title = '404';
        props.caption = 'Не туда попали';
        props.propDisplay = 'flex';
        props.link = new Link({
            href: "/",
            className: "",
            label: "Назад к чатам",
            dataset: {
                page: 'chatStart'
            }
        });

        super({ ...props });
    }
}
