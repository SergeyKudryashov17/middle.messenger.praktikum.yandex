import Router from "./core/Router";

import PageNotFound from './pages/404/';
import PageServerError from './pages/500/';
import DialogPage from './pages/chat/';
import LoginPage from './pages/login/';
import ProfilePage from './pages/profile/';
import EditProfilePage from './pages/profileEdit/';
import EditPasswordPage from './pages/profileEditPassword/';
import SigninPage from './pages/singin/';
import { APIError, UserData } from "./api/types";
import authService from "./services/authService";
import { apiHasError } from "./utils/apiHasError";
import { getRouteData, listRoutes, RouteData } from "./core/listRoutes";

document.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(listRoutes.base.path, DialogPage)
    .use(listRoutes.signin.path, SigninPage)
    .use(listRoutes.pageNotFound.path, PageNotFound)
    .use(listRoutes.pageError.path, PageServerError)
    .use(listRoutes.login.path, LoginPage)
    .use(listRoutes.profile.path, ProfilePage)
    .use(listRoutes.profileEdit.path, EditProfilePage)
    .use(listRoutes.passwordEdit.path, EditPasswordPage);

  const responseUser: UserData | APIError = await authService.fetchUser();
  Router.start();

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





