import Link from "../../components/link/Link";
import ErrorPage from "../../components/errorPage/ErrorPage";

type PageServerErrorProps = {
    title: string,
    caption: string,
    propDisplay: string,
    link: Link
}

class PageServerError extends ErrorPage {
    constructor(props: PageServerErrorProps) {
        props.title = '500';
        props.caption = 'Мы уже фиксим';
        props.propDisplay = 'flex';
        props.link = new Link({
            href: '/',
            className: '',
            label: 'Назад к чатам',
            dataset: {
                page: 'chatStart'
            }
        });

        super({...props});
    }
}

export default PageServerError;
