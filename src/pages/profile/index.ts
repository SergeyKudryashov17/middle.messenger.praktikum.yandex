import renderDOM from '../../core/renderDOM';
import ProfilePage from "./ProfilePage";

import imageUrl from '../../static/icon/Union.png';

export const profilePage: ProfilePage = new ProfilePage({
    typeBody: 'profile',
    userName: 'Иван',
    imageUrl: imageUrl
});

renderDOM("#app", profilePage);

