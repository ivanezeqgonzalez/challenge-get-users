import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {UserService} from '../services/Users';
import {ICommonUser} from '../services/User.model';
import {ListUsers} from '../components/ListUsers';
import SearchUsers from '../components/SearchUsers';
import Loading from '../components/Loading';
import SortByUsername from '../components/SortByUsername';

export type Order = 'ASC' | 'DESC';
const HomeScreen = () => {
  const [users, setUsers] = useState<ICommonUser[]>([]);
  const [order, setOrder] = useState<Order>('ASC');
  const [loading, setLoading] = useState<boolean>(true);

  const toggleOrder = () => {
    const newSort: Order = order === 'ASC' ? 'DESC' : 'ASC';
    setOrder(newSort);
  };

  const sortUserByLogin = (userA: ICommonUser, userB: ICommonUser): number => {
    return order === 'ASC'
      ? userA.login.localeCompare(userB.login)
      : userB.login.localeCompare(userA.login);
  };

  const updateSortedUsers = () => {
    const newOrder = [...users].sort(sortUserByLogin);
    setUsers(() => newOrder);
    setLoading(false);
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
          <SortByUsername toggleOrder={toggleOrder} order={order} />
          <ListUsers users={users} />
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
