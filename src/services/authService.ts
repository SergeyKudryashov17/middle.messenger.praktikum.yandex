import AuthAPI from "../api/AuthAPI";
import { APIError, SignupData, SigninData, UserData } from "../api/types";
import { apiHasError } from "../utils/apiHasError";
import store from "../core/Store";
import Router from "../core/Router";
import isEqual from "../utils/isEqual";


class AuthService {
  private api = new AuthAPI('/auth');

  async signup(signupData: SignupData) {
    try {
      const response = await this.api.singup(signupData);
      if (apiHasError(response)) {
        alert(response.reason);
        return;
      }
      await this.fetchUser();
      Router.go('/');
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

    const responseUser: UserData | APIError = await this.fetchUser();
    if (apiHasError(responseUser)) {
      alert(responseUser.reason);
      store.set('isLoading', false);
      throw new Error(responseUser.reason);
    }

    const userState = store.getState().user;
    store.set('isLoading', false);
    if (!userState || !isEqual(userState, responseUser)) {
      store.set('user', responseUser);
    }

    Router.go('/');
  }

  async logout() {
    try {
      const response = await this.api.logout();
      Router.go('/login');
    } catch (e) {
      alert ('Error during logging out');
    }
  }

  async fetchUser(): Promise<UserData | APIError> {
    store.set('isLoading', true);
    const response: UserData | APIError = await this.api.getUser();
    store.set('isLoading', false)

    return response;
  }
 }

export default new AuthService();
