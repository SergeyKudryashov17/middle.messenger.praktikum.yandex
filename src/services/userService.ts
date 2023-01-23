import UserAPI from "../api/UserAPI";
import { APIError, IPasswordData, IProfileData, IRequestSearchUser, UserData } from "../api/types";
import { apiHasError } from "../utils/apiHasError";
import { listRoutes } from "../core/listRoutes";
import Router from "../core/Router";
import store from "../core/Store";
import cloneDeep from "../utils/cloneDeep";
import isEqual from "../utils/isEqual";
import AuthService from "./authService";

class UserService {
  private api = new UserAPI('/user');

  async changeProfile(profileData: IProfileData) {
    let previousProfileState = cloneDeep(store.getState().user as UserData);
    delete previousProfileState.id;
    delete previousProfileState.avatar;

    if (isEqual(previousProfileState, profileData)) {
      alert('Данные не нуждаются в обновлении');
      Router.go(listRoutes.profile.path);
      return;
    }

    const response: UserData | APIError = await this.api.changeProfile(profileData);
    if (apiHasError(response)) {
      alert(response.reason);
      throw Error(response.reason);
    }

    store.set('user', response);
    alert('Профиль успешно изменен');
    Router.go(listRoutes.profile.path);
  }

  async changeAvatar(file: FormData) {
    const response: UserData | APIError = await this.api.changeAvatar(file);
    if (apiHasError(response)) {
      alert(response.reason);
      throw Error(response.reason);
    }

    store.set('user', response);
  }

  async changePassword(passwordData: IPasswordData) {
    const response: null | APIError = await this.api.changePassword(passwordData);
    if (apiHasError(response)) {
      alert(response.reason);
      throw Error(response.reason);
    }

    alert('Пароль успешно изменен');
    await AuthService.logout();
  }

  async getUser(userID: number): Promise<UserData> {
    const response: UserData | APIError = await this.api.getUser(userID);
    if (apiHasError(response)) {
      alert(response.reason);
      throw Error(response.reason);
    }

    return response;
  }

  async searchUser(requestUser: IRequestSearchUser): Promise<UserData[]> {
    const response: UserData[] | APIError = await this.api.searchUser(requestUser);
    if (apiHasError(response)) {
      alert(response.reason);
      throw Error(response.reason);
    }

    return response;
  }
}

export default new UserService();
