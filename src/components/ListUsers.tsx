import React from 'react';
import {Text, FlatList, StyleSheet} from 'react-native';
import User from '../components/User';
import {IUserDetail} from '../services/User.model';

interface IListUsers {
  users: IUserDetail[];
}
export const ListUsers = (props: IListUsers) => {
  const {users} = props;

  if (users.length === 0) {
    return <Text>No hay usuarios para mostrar</Text>;
  }

  return (
    <FlatList
      // style={styles.list}
      contentContainerStyle={styles.list}
      numColumns={2}
      data={users}
      columnWrapperStyle={{gap: 15, justifyContent: 'center'}}
      keyExtractor={item => item.login}
      renderItem={({item}) => <User user={item} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    paddingHorizontal: 15,
    gap: 20,
    backgroundColor: 'orange',
    paddingVertical: 15,
  },
});
