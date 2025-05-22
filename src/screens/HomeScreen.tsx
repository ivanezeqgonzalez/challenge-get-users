import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Routes} from '../constants';
import {IUserDetail, UserService} from '../services/Users';
import {ListUsers} from '../components/ListUsers';
import SearchUsers from '../components/SearchUsers';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState<IUserDetail[]>([]);
  const handlePressClickMe = () => {
    navigation.navigate(Routes.USER_DETAILS, {username: users[0].login});
  };

  useEffect(() => {
    UserService.getUsers().then(usersData => setUsers(usersData));
  });

  return (
    <SafeAreaView style={styles.container}>
      <SearchUsers />
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
  },
  containerListUsers: {
    width: '90%',
  },
});

export default HomeScreen;
