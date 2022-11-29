import renderDOM from '../../core/renderDOM.js';
import ProfilePage from "./ProfilePage";

const profilePage = new ProfilePage({
    typeBody: 'profile',
    userName: 'Иван',
    imageUrl: '/static/icon/Union.png'
});

renderDOM("#app", profilePage);

