import renderDOM from '../../core/renderDOM';
import ProfilePage from "./ProfilePage";

const profilePage: ProfilePage = new ProfilePage({
    typeBody: 'profile',
    userName: 'Иван',
    imageUrl: '/static/icon/Union.png'
});

renderDOM("#app", profilePage);

