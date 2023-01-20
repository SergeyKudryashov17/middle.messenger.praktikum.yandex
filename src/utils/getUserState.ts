import { UserData } from "../api/types";

type userState = {
  user: UserData
}

export const getUserState = (state): userState => {
  return { userState: state.user };
};
