import Router from "./core/Router";

import { pageNotFound } from './pages/404/';
import { pageServerError } from './pages/500/';
import { listDialogsPage } from './pages/chat/';
import { listDialogsPageStart } from './pages/chatStart/';
import { loginPage } from './pages/login/';
import { profilePage } from './pages/profile/';
import { editProfilePage } from './pages/profileEdit/';
import { editProfilePasswordPage } from './pages/profileEditPassword/';
import { singInPage } from './pages/singin/';
import { APIError, UserData } from "./api/types";
import authService from "./services/authService";
import { apiHasError } from "./utils/apiHasError";
import { getRouteData, listRoutes, RouteData } from "./core/listRoutes";

document.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(listRoutes.base.path, listDialogsPageStart)
    .use(listRoutes.signin.path, singInPage)
    .use(listRoutes.pageNotFound.path, pageNotFound)
    .use(listRoutes.pageError.path, pageServerError)
    .use(listRoutes.login.path, loginPage)
    .use(listRoutes.dialog.path, listDialogsPage)
    .use(listRoutes.profile.path, profilePage)
    .use(listRoutes.profileEdit.path, editProfilePage)
    .use(listRoutes.passwordEdit.path, editProfilePasswordPage);

  const responseUser: UserData | APIError = await authService.fetchUser();
  Router.start();

  console.log(listDialogsPageStart);

  if (apiHasError(responseUser)) {
    Router.go(listRoutes.login.path);
    return;
  }

  const routeData: RouteData | undefined = getRouteData(window.location.pathname);
  if (routeData === undefined) {
    Router.go(listRoutes.pageNotFound.path);
    return;
  } else if (routeData.isProtected) {
    Router.go(listRoutes.base.path);
    return;
  }
});





