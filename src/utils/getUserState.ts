import { IState, UserData } from "../api/types";

type userState = {
    userState: UserData;
};

export const getUserState = (state: IState): userState => {
    return { userState: { ...state.user } as UserData };
};
