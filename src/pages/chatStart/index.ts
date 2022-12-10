import renderDOM from '../../core/renderDOM';
import ListDialogsPage from "./ListDialogsPage";

export const listDialogsPageStart: ListDialogsPage = new ListDialogsPage({
    emptyChatBody: true
});

renderDOM("#app", listDialogsPageStart);

