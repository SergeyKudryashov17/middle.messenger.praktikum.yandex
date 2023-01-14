import EditProfilePage from "./EditProfilePage";

import imageUrl from '../../static/icon/Union.png';

export const editProfilePage: EditProfilePage = new EditProfilePage({
    propDisplay: 'flex',
    typeBody: 'profile',
    userName: 'Иван',
    imageUrl: imageUrl
});
