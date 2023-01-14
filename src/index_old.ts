import Block from "./core/Block";
import renderDOM from './core/renderDOM';

import { pageNotFound } from './pages/404/';
import { pageServerError } from './pages/500/';
import { listDialogsPage } from './pages/chat/';
import { listDialogsPageStart } from './pages/chatStart/';
import { loginPage } from './pages/login/';
import { profilePage } from './pages/profile/';
import { editProfilePage } from './pages/profileEdit/';
import { editProfilePasswordPage } from './pages/profileEditPassword/';
import { singInPage } from './pages/singin/';

const PAGES: Record<string, { title: string, component: Block }> = {
  page404: {
    title: 'Ошибка 404',
    component: pageNotFound
  },
  page500: {
    title: 'Ошибка 500',
    component: pageServerError
  },
  chatStart: {
    title: 'Чаты',
    component: listDialogsPageStart
  },
  chat: {
    title: 'Чат',
    component: listDialogsPage
  },
  pageLogin: {
    title: 'Вход',
    component: loginPage
  },
  pageProfile: {
    title: 'Профиль',
    component: profilePage
  },
  pageProfileEdit: {
    title: 'Редактировать профиль',
    component: editProfilePage
  },
  pageEditPassword: {
    title: 'Изменить пароль',
    component: editProfilePasswordPage
  },
  pageSingin: {
    title: 'Регистрация',
    component: singInPage
  }
}

let activePageLabel: string = 'pageLogin';

document.addEventListener("DOMContentLoaded", () => {
  renderPage(activePageLabel);
});

const selectPage: HTMLSelectElement | null = document.querySelector('#select-page');

if (selectPage) {
  selectPage.addEventListener('change', () => {
    renderPage(selectPage.value);
  });
}

function renderPage(pageLabel: string): void {
  let pageTitle = PAGES[pageLabel].title;
  let pageComponent = PAGES[pageLabel].component;

  document.title = pageTitle;
  renderDOM("#app", pageComponent);

  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      if (!link.dataset.page) return;

      const label: string = link.dataset.page;
      if (selectPage) {
        selectPage.value = label;
      }
      renderPage(label);
    });
  });
}
