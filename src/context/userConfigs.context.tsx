import {createContext, useContext, useState} from 'react';
import {IUser} from '../services/User.model';
import {useUserStorage} from '../storage/user.storage';

interface IUserConfigContext {
  favoritesAccounts: IUser['id'][];
  isFavorite(id_username: number): boolean;
  updateFavorite(id_username: number): void;
}

const defaultValue: IUserConfigContext = {
  favoritesAccounts: [],
  isFavorite: (id_username: number) => false,
  updateFavorite: (id_username: number) => {},
};
export const UserConfigContext = createContext(defaultValue);

export const UserConfigProvider = ({children}) => {
  const [userStorage, setUserStorage] = useUserStorage();
  const [providerValue, setProviderValue] = useState({
    ...defaultValue,
    favoritesAccounts: userStorage.favorites,
  });

  const isFavorite = (id_username: number): boolean => {
    return providerValue.favoritesAccounts.includes(id_username);
  };

  const updateFavorite = (id_username: number): void => {
    const index = providerValue.favoritesAccounts.indexOf(id_username);
    let newList: IUserConfigContext['favoritesAccounts'] =
      providerValue.favoritesAccounts;

    if (index > -1) {
      newList.splice(index, 1);
    } else {
      newList.push(id_username);
    }
    setProviderValue(prev => ({
      ...prev,
      favoritesAccounts: newList,
    }));
    setUserStorage(prev => ({...prev, favorites: newList}));
  };

  const values = {
    ...providerValue,
    isFavorite,
    updateFavorite,
  };

  return (
    <UserConfigContext.Provider value={values}>
      {children}
    </UserConfigContext.Provider>
  );
};

export const useUserConfigContext = () => useContext(UserConfigContext);
