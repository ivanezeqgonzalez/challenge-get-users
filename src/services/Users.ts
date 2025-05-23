import axios from 'axios';
import {API_URL} from '../constants';
import users_mock from '../mock/Users/users.json';
import user_mock from '../mock/Users/user.json';
import usersByTerm from '../mock/Users/usersByTerm.json';

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
    return Promise.resolve(() => {
      return users_mock;
    });
  }
  static getUsersByTerm(query: string) {
    console.log('mock getUsersByTerm ', query);
    return Promise.resolve(() => {
      return usersByTerm;
    });
  }
  static getUser(username: string) {
    console.log('mock getUser by username ', username);
    return Promise.resolve(() => {
      return user_mock;
    });
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
    const query = `q=user:${encodeURIComponent(terms)}`;
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
}


