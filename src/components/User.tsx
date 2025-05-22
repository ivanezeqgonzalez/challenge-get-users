import React from 'react';
import {View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native';
import {IUserDetail} from '../services/Users';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../constants';

interface IUser {
  user: IUserDetail;
}
const User = (props: IUser) => {
  const {user} = props;
  const navigation = useNavigation();
  const handleGetFullInfo = () => {
    navigation.navigate(Routes.USER_DETAILS, {username: user.login});
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={handleGetFullInfo}>
        <View style={styles.cardUser}>
          <Image source={{uri: user.avatar_url}} style={styles.avatar} />
          <Text style={styles.username}>{user.login}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '50%', backgroundColor: 'red', height: 210},
  cardUser: {
    borderBlockColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    paddingBottom: 5,
    // paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // elevation: 1
  },
  avatar: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
  },
  username: {
    backgroundColor: 'green',
    fontSize: 19,
    fontWeight: 'bold',
    paddingTop: 5,
  },
});

export default User;
