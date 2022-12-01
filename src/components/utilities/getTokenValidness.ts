export const getTokenValidness = () => {
  const tokenExpirationTime = Number(localStorage.getItem('exp') || '') * 1000;
  // const dateNow = Date.now() + 43195954;
  return Date.now() >= tokenExpirationTime;
};
