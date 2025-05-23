import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {UserService} from '../services/Users';
import {ICommonUser} from '../services/User.model';
import {ListUsers} from '../components/ListUsers';
import SearchUsers from '../components/SearchUsers';

const HomeScreen = () => {
  const [users, setUsers] = useState<ICommonUser[]>([]);

  const resetSearch = () => {
    fetchUsers();
  };

  const handleSetResultsSearch = (resutls: ICommonUser[]) => {
    setUsers(resutls);
  };

  const fetchUsers = () =>
    UserService.getUsers().then(usersData => setUsers(usersData));

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchUsers
        resetSearch={resetSearch}
        setResults={handleSetResultsSearch}
      />
        <ListUsers users={users} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%',
    gap: 20,
    columnGap: 20,
    paddingBottom: 20,
  },
});

export default HomeScreen;
