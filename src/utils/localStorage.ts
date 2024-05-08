export const setLocalStorage = (key: string, item: unknown) => {
  const stringifyItem = JSON.stringify(item);

  localStorage.setItem(key, stringifyItem);
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};
