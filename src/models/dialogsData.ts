type Dialog = {
    name: string,
    time: string,
    isMyMessage: boolean,
    preview: string,
    unread: number
};

export function getListDialogs(): Dialog[] {
    const listDialogs = [
        {
            name: "Андрей",
            time: "10:49",
            isMyMessage: false,
            preview: "Изображение",
            unread: 2
        },
        {
            name: "Киноклуб",
            time: "12:00",
            isMyMessage: true,
            preview: "стикер",
            unread: 0
        },
        {
            name: "Илья",
            time: "15:12",
            isMyMessage: false,
            preview: "Друзья, у меня для вас особенный выпуск новостей!...",
            unread: 2
        },
        {
            name: "Вадим",
            time: "15:12",
            isMyMessage: true,
            preview: "круто",
            unread: 0
        },
        {
            name: "тет-а-теты",
            time: "15:12",
            isMyMessage: false,
            preview: "И Human Interface Guidelines и Material Design рекомендуют...",
            unread: 0
        },
        {
            name: "1, 2, 3",
            time: "Пт",
            isMyMessage: false,
            preview: "Миллионы россиян ежедневно проводят десятки часов свое...",
            unread: 0
        },
        {
            name: "Design Destroyer",
            time: "Пн",
            isMyMessage: false,
            preview: "В 2008 году художник Jon Rafman начал собирать...",
            unread: 0
        },
        {
            name: "Day.",
            time: "Пн",
            isMyMessage: false,
            preview: "круто",
            unread: 0
        },
        {
            name: "Стас Рогозин",
            time: "12 Апр 2020",
            isMyMessage: false,
            preview: "Можно или сегодня или завтра вечером.",
            unread: 0
        }
    ];

    return listDialogs;
}
