import renderDOM from '../../core/renderDOM';
import EditProfilePage from "./EditProfilePage";

import imageUrl from '../../static/icon/Union.png';

export const editProfilePage = new EditProfilePage({
    typeBody: 'profile',
    userName: 'Иван',
    imageUrl: imageUrl
});

renderDOM("#app", editProfilePage);

