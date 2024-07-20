const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error: unknown) {
      console.error('An error has occured during saving value to local storage', error);
    }
  };

  const getItem = (): unknown | undefined => {
    try {
      const storageValue = window.localStorage.getItem(key);
      return storageValue ? JSON.parse(storageValue) : undefined;
    } catch (error: unknown) {
      console.error('An error has occured during getting value from local storage', error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error: unknown) {
      console.error('An error has occured during removing value from local storage', error);
    }
  };
  return { setItem, getItem, removeItem };
};

export default useLocalStorage;
