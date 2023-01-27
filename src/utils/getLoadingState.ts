import { IState } from "../api/types";

type TLoadingState = {
    isLoading?: boolean;
};

export const getLoadingState = (state: IState): TLoadingState => {
    return { isLoading: state.isLoading };
};
