import {createContext, useContext, useState} from 'react';
import { IUser } from '../services/User.model';

interface IUserConfigContext {
  favoritesAccounts: IUser['id'][];
  isFavorite(id_username: number): boolean
    updateFavorite(id_username: number): void
}

const defaultValue: IUserConfigContext = {
  favoritesAccounts: [1, 2, 46],
  isFavorite:(id_username: number) => false,
  updateFavorite:(id_username: number) => {},
};
export const UserConfigContext = createContext(defaultValue);

export const UserConfigProvider = ({children}) => {
  const [providerValue, setProviderValue] = useState(defaultValue);

  const isFavorite = (id_username: number): boolean => {
    return providerValue.favoritesAccounts.includes(id_username);
  };

  const updateFavorite = (id_username: number): void => {
    const index = providerValue.favoritesAccounts.indexOf(id_username);
    let newList: IUserConfigContext['favoritesAccounts'] = providerValue.favoritesAccounts;

    if (index > -1) {
      newList.splice(index, 1);
    } else {
      newList.push(id_username);
    }
    setProviderValue(prev => ({
      ...prev,
      favoritesAccounts: newList,
    }));
  };

  const values = {
    ...providerValue,
    isFavorite,
    updateFavorite
  };

  return (
    <UserConfigContext.Provider value={values}>
      {children}
    </UserConfigContext.Provider>
  );
};

export const useUserConfigContext = () => useContext(UserConfigContext);
