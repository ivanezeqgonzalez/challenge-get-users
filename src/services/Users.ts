import axios from 'axios';
import {API_URL} from '../constants';
import users_mock from '../mock/Users/users.json';
import user_mock from '../mock/Users/user.json';

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
      return users_mock;
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

export interface IUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}

export interface IUserDetail {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: any;
  hireable: any;
  bio: any;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
