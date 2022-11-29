import renderDOM from '../../core/renderDOM.js';
import EditPasswordPage from "./editPasswordPage";

const editProfilePage = new EditPasswordPage({
    typeBody: 'profile',
    userName: 'Иван',
    imageUrl: '/static/icon/Union.png'
});

renderDOM("#app", editProfilePage);

