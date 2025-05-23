import axios from 'axios';
import {API_URL} from '../constants';
import users_mock from '../mock/Users/users.json';
import user_mock from '../mock/Users/user.json';
import usersByTerm from '../mock/Users/usersByTerm.json';
import {ICommonUser, IUserByTerm} from './User.model';

const AxiosInstaceUser = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Challenge': 'Ivan Gonzalez',
  },
});

const IS_MOCKED = true;

class UserServiceMocked {
  static getUsers(): Promise<any> {
    console.log('mock getUsers');
    return Promise.resolve(users_mock);
  }
  static getUsersByTerm(query: string) {
    console.log('mock getUsersByTerm ', query);
    return Promise.resolve(usersByTerm);
  }
  static getUser(username: string) {
    const userFiltered = users_mock.find(u => u.login === username);
    console.log('mock getUser by username ', username, userFiltered);
    return Promise.resolve(userFiltered);
  }
}

export class UserService {
  static getUsers(): Promise<any> {
    if (IS_MOCKED) {
      return UserServiceMocked.getUsers();
    }
    return AxiosInstaceUser.get('users')
      .then(res => res.data)
      .catch(console.error);
  }
  static getUsersByTerm(terms: string) {
    const query = `user:${encodeURIComponent(terms)}`;
    if (IS_MOCKED) {
      return UserServiceMocked.getUsersByTerm(query);
    }
    return AxiosInstaceUser.get('search/users', {params: {q: query}})
      .then(res => res.data)
      .catch(console.error);
  }
  static getUser(username: string) {
    if (IS_MOCKED) {
      return UserServiceMocked.getUser(username);
    }
    return AxiosInstaceUser.get(`users/${username}`)
      .then(res => res.data)
      .catch(console.error);
  }
  static readonly transformUserToCommonUser = (
    user: IUserByTerm,
  ): ICommonUser => {
    const {login, avatar_url} = user;
    return {login, avatar_url};
  };
}
