import ProfilePage from "./ProfilePage";

import imageUrl from '../../static/icon/Union.png';

export const profilePage: ProfilePage = new ProfilePage({
    propDisplay: 'flex',
    typeBody: 'profile',
    userName: 'Иван',
    imageUrl: imageUrl
});
