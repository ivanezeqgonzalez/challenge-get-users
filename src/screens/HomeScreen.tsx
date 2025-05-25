import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {UserService} from '../services/Users';
import {ICommonUser} from '../services/User.model';
import {ListUsers} from '../components/ListUsers';
import SearchUsers from '../components/SearchUsers';
import Loading from '../components/Loading';
import SortByUsername, {SettingResults} from '../components/SortByUsername';
import {useUserConfigContext} from '../context/userConfigs.context';

export type Order = 'ASC' | 'DESC';
export type FilterBy = {
  byFavorite: boolean;
};
const defaultFilters: FilterBy = {
  byFavorite: false,
};

const HomeScreen = () => {
  const [users, setUsers] = useState<ICommonUser[]>([]);
  const [order, setOrder] = useState<Order>('ASC');
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState(defaultFilters);
  const {isFavorite} = useUserConfigContext();
  const toggleOrder = () => {
    const newSort: Order = order === 'ASC' ? 'DESC' : 'ASC';
    setOrder(newSort);
  };
  //TODO: mover esta fucnion fuera del componente
  const sortUserByLogin = (userA: ICommonUser, userB: ICommonUser): number => {
    return order === 'ASC'
      ? userA.login.localeCompare(userB.login)
      : userB.login.localeCompare(userA.login);
  };

  // TODO: esta fn deberia cambiar a nombre generico de filtros
  const updateSortedUsers = () => {
    console.log('filtros nuevos?', filters, order);
    const copyUsers = [...users];
    copyUsers.sort(sortUserByLogin);
    setUsers(() => copyUsers);
    setLoading(false);
  };

  const filterListUsers = (): ICommonUser[] => {
    let copyUsers = [...users];
    if (filters.byFavorite) {
      copyUsers = copyUsers.filter(user => isFavorite(user.id));
    }
    return copyUsers;
  };
  
  const resetSearch = () => {
    fetchUsers();
  };

  const handleSetResultsSearch = (resutls: ICommonUser[]) => {
    setUsers(resutls);
  };

  const fetchUsers = () => {
    UserService.getUsers().then(usersData => {
      const usersOrdered = usersData.sort(sortUserByLogin);
      setUsers(usersOrdered);
      setLoading(false);
    });
  };

  const handleSetFilters = (newSettingsResults: SettingResults) => {
    setFilters(newSettingsResults.filters);
    setOrder(newSettingsResults.order);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      setLoading(true);
      updateSortedUsers();
    }
  }, [order]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchUsers
        resetSearch={resetSearch}
        setResults={handleSetResultsSearch}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          <SortByUsername
            toggleOrder={toggleOrder}
            setFilters={handleSetFilters}
            settingsResults={{filters, order}}
          />
          <ListUsers users={filterListUsers()} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%',
    gap: 10,
    columnGap: 20,
    paddingBottom: 20,
  },
});

export default HomeScreen;
