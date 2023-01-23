type TLoadingState = {
  isLoading: boolean
}

export const getLoadingState = (state): TLoadingState => {
  return { isLoading: state.isLoading }
};
