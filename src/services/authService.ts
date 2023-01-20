import AuthAPI from "../api/AuthAPI";
import { APIError, IProfileData, SigninData, UserData } from "../api/types";
import { apiHasError } from "../utils/apiHasError";
import store from "../core/Store";
import Router from "../core/Router";
import isEqual from "../utils/isEqual";
import { listRoutes } from "../core/listRoutes";


class AuthService {
  private api = new AuthAPI('/auth');

  async signup(IProfileData: IProfileData) {
    try {
      const response = await this.api.singup(IProfileData);
      if (apiHasError(response)) {
        alert(response.reason);
        return;
      }
      await this.fetchUser();
      Router.go(listRoutes.base.path);
    } catch (e) {
      alert ('Error during signing up');
    }
  }

  async signin(signinData: SigninData) {
    store.set('isLoading', true);
    const response: null | APIError = await this.api.singin(signinData);
    if (apiHasError(response)) {
      alert(response.reason);
      store.set('isLoading', false);
      throw new Error(response.reason);
    }

    await this.fetchUser();

    Router.go(listRoutes.base.path);
    console.log(store.getState());
  }

  async logout() {
    try {
      await this.api.logout();
      Router.go(listRoutes.login.path);
    } catch (e) {
      alert ('Error during logging out');
    }
  }

  async fetchUser(): Promise<UserData | APIError> {
    store.set('isLoading', true);
    const responseUser: UserData | APIError = await this.api.getUser();
    store.set('isLoading', false);

    if (apiHasError(responseUser)) {
      alert(responseUser.reason);
      console.error(responseUser.reason);
      return responseUser;
    }

    const userState = store.getState().user;
    if (!userState || !isEqual(userState, responseUser)) {
      store.set('user', responseUser);
    }

    return responseUser;
  }
 }

export default new AuthService();
