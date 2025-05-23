import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {UserService} from '../services/Users';
import { IUserDetail } from '../services/User.model';
import UserDetail from '../components/UserDetail';

const UserScreen = ({route}) => {
  const {username} = route.params;
  const [user, setUser] = useState<IUserDetail | null>();

  useEffect(() => {
    UserService.getUser(username)
      .then(setUser)
      .catch(() => {
        setUser(null);
      });
  }, [username]);

  if (user === undefined) {
    return (
      <View>
        <Text>Cargando</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>Challenge of users!</Text> */}
      {!user ? <Text style={styles.title}>Usuario no encontrado</Text> : <UserDetail user={user} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
  },
});

export default UserScreen;
