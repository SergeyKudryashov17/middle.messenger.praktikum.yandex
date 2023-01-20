import { HTTPTransport } from "../core/request";
import { APIError, IPasswordData, IRequestSearchUser, IProfileData, UserData } from "./types";

export default class UserAPI {
  protected http: HTTPTransport

  constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  public changeProfile(profileData: IProfileData): Promise<UserData | APIError> {
    return this.http.put('/profile', profileData);
  }

  public changeAvatar(fileAvatar: FormData): Promise<UserData | APIError> {
    return this.http.put('/profile/avatar', fileAvatar);
  }

  public changePassword(passwordData: IPasswordData): Promise<null | APIError> {
    return this.http.put('/password', passwordData);
  }

  public getUser(userID: number): Promise<UserData | APIError> {
    return this.http.get('/', userID);
  }

   public searchUser(userLogin: IRequestSearchUser): Promise<UserData[] | APIError> {
      return this.http.post('/search', userLogin);
   }
}
