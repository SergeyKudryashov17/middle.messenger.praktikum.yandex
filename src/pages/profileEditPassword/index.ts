import EditPasswordPage from "./editPasswordPage";

import imageUrl from "../../static/icon/Union.png";

export const editProfilePasswordPage: EditPasswordPage = new EditPasswordPage({
    propDisplay: 'flex',
    typeBody: 'profile',
    userName: 'Иван',
    imageUrl: imageUrl
});
