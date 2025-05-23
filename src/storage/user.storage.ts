import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';

const storage = new MMKVLoader().initialize();

interface IUserStorage {
  favorites: number[];
}
const defaultUserStorage: IUserStorage = {
  favorites: [],
};

export const useUserStorage = () =>
  useMMKVStorage('userStorage', storage, defaultUserStorage);
