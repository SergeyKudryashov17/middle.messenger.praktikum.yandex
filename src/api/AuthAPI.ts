import { HTTPTransport } from "../core/request";
import { SignupData, SigninData, UserData, APIError } from "./types";

export default class AuthAPI {
  protected http: HTTPTransport

  constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  public singup(data: SignupData) {
    return this.http.post('/signup', data);
  }

  public singin(data: SigninData): Promise<null | APIError> {
    console.log('authApi', data);
    return this.http.post('/signin', data);
  }

  public getUser(): Promise<UserData | APIError> {
    return this.http.get('/user');
  }

  public logout() {
    return this.http.post('/logout');
  }
}
