import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ICommonUser} from '../services/User.model';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../constants';

interface IUser {
  user: ICommonUser;
}
const User = (props: IUser) => {
  const {user} = props;
  const navigation = useNavigation();
  const handleGetFullInfo = () => {
    navigation.navigate(Routes.USER_DETAILS, {username: user.login});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGetFullInfo}>
        <View style={styles.cardUser}>
          <Image source={{uri: user.avatar_url}} style={styles.avatar} />
          <Text style={styles.username}>{user.login}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: 210,
  },
  cardUser: {
    borderBlockColor: '#DAF7A6',
    borderWidth: 1,
    // paddingBottom: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  avatar: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  username: {
    backgroundColor: '#DAF7A6',
    color: '#1f1f1f',
    fontSize: 19,
    fontWeight: '500',
    paddingLeft: 5,
  },
});

export default User;
