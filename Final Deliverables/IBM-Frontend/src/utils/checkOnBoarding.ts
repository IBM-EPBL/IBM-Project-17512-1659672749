export const isOnBoardingFinished = (): boolean => {
  const value = localStorage.getItem('onboarded');
  return value != null ? false : true;
};

export const setOnBoarding = (): void => {
  localStorage.setItem('onboarded', 'true');
};
