import renderDOM from '../../core/renderDOM.js';
import ListDialogsPage from "./ListDialogsPage";

const listDialogsPage = new ListDialogsPage({
    emptyChatBody: true
});

renderDOM("#app", listDialogsPage);

