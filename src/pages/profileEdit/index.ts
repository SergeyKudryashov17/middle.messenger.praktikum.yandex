import renderDOM from '../../core/renderDOM';
import EditProfilePage from "./EditProfilePage";

const editProfilePage = new EditProfilePage({
    typeBody: 'profile',
    userName: 'Иван',
    imageUrl: '/static/icon/Union.png'
});

renderDOM("#app", editProfilePage);

