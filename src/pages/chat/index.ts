import DialogPage from "./DialogPage";

import imageUrl from '../../static/img/image.png';

export const listDialogsPage = new DialogPage({
    emptyChatBody: true,
    messagesGroups: [
        {
            "date": "19 июня",
            "messages": [
                {
                    "isText": true,
                    "text": [
                        "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.",
                        "Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро."
                    ],
                    "date": "11:26",
                    "fromMe": false
                },
                {
                    "isImage": true,
                    "src": imageUrl,
                    "date": "11:56",
                    "fromMe": false
                },
                {
                    "isText": true,
                    "text": ["Круто!"],
                    "date": "12:00",
                    "fromMe": true,
                    "isRead": true
                }
            ]
        }
    ]
});
