export const getLocalStorageItem = (key) => {
  if (localStorage.getItem(key) && typeof localStorage.getItem(key) === 'string') {
    return JSON.parse(localStorage.getItem(key) as string);
  }
  return null;
};
