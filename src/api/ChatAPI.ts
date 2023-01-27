import { HTTPTransport } from "../core/request";
import {
    APIError,
    IRequestChat,
    IChat,
    IRequestNewChat,
    IResponseDeleteChat,
    IChatID,
    IRequestChatUsers,
    ITokenChat,
    IAdditParamUsersChat,
    FullUserData,
} from "./types";

export default class ChatAPI {
    protected http: HTTPTransport;

    constructor(endpoint: string) {
        this.http = new HTTPTransport(endpoint);
    }

    public getChats(request?: IRequestChat): Promise<IChat[] | null> {
        return this.http.get("", request);
    }

    public createChat(request: IRequestNewChat): Promise<null | APIError> {
        return this.http.post("", request);
    }

    public deleteChat(request: IChatID): Promise<IResponseDeleteChat | null> {
        return this.http.delete("", request);
    }

    public addUserToChat(request: IRequestChatUsers): Promise<null | APIError> {
        return this.http.put("/users", request);
    }

    public deleteUserFromChat(request: IRequestChatUsers): Promise<null | APIError> {
        return this.http.delete("/users", request);
    }

    public getChatToken(request: IChatID): Promise<ITokenChat | null> {
        return this.http.post(`/token/${request.id}`);
    }

    public getChatUsers(chatID: string, additParams: IAdditParamUsersChat): Promise<FullUserData[] | null> {
        return this.http.get(`/${chatID}/users`, additParams);
    }
}
