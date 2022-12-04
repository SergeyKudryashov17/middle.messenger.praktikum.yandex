import renderDOM from '../../core/renderDOM';
import ListDialogsPage from "./ListDialogsPage";

const listDialogsPage: ListDialogsPage = new ListDialogsPage({
    emptyChatBody: true
});

renderDOM("#app", listDialogsPage);

