import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {UserService} from '../services/Users';
import {IUserByTermResponse, IUserDetail} from '../services/User.model';
import {ListUsers} from '../components/ListUsers';
import SearchUsers from '../components/SearchUsers';

const HomeScreen = () => {
  const [users, setUsers] = useState<IUserDetail[]>([]);

  const resetSearch = () => {
    setUsers([]);
  };

  const handleSetResultsSearch = (resutls: IUserByTermResponse) => {
    console.log(resutls);
    // setUsers([]);
  };

  useEffect(() => {
    UserService.getUsers().then(usersData => setUsers(usersData));
  });

  return (
    <SafeAreaView style={styles.container}>
      <SearchUsers
        resetSearch={resetSearch}
        setResults={handleSetResultsSearch}
      />
      <ScrollView style={styles.containerListUsers}>
        <ListUsers users={users} />
      </ScrollView>
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
  containerListUsers: {
    width: '90%',
  },
});

export default HomeScreen;
