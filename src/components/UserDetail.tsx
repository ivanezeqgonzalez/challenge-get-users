import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IUserDetail} from '../services/User.model';
import React, {useEffect} from 'react';
import {useUserConfigContext} from '../context/userConfigs.context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
interface IUserDetailProps {
  user: IUserDetail;
}

const UserDetail = (props: IUserDetailProps) => {
  const {user} = props;
  const {updateFavorite, isFavorite} = useUserConfigContext();

  const toggleFavorite = () => {
    // TODO: guardarlo en AsyncStorage
    // setIsFavorite(prev => !prev);
    updateFavorite(user.id);
  };

  useEffect(() => {}, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.principalData}>
        <View style={styles.userInfo}>
          <Image source={{uri: user.avatar_url}} style={styles.avatar} />
          <Text style={styles.username}>{user.name}</Text>
          {user.bio && (
            <Text style={styles.complementaryText}>Bio: {user.bio}</Text>
          )}
        </View>
        <View style={styles.otherInfo}>
          <TouchableOpacity onPress={toggleFavorite}>
            {isFavorite(user.id) ? (
              <Text style={styles.complementaryText}>
                Agregado <FontAwesome name="star" color="#ffe033" size={24} />
              </Text>
            ) : (
              <Text style={styles.complementaryText}>
                Agregar <Feather name="star" color="#000" size={24} />
              </Text>
            )}
          </TouchableOpacity>
          <Text style={styles.complementaryText}>
            Repos públicos: {user.public_repos}
          </Text>
        </View>
      </View>
      <ContactUser user={user} />
    </View>
  );
};

interface IContactUser {
  user: IUserDetail;
}
const ContactUser = (props: IContactUser) => {
  const {user} = props;

  return (
    <View style={styles.contact}>
      <Text>Twitter: {user.twitter_username ?? 'No disponible'}</Text>
      <Text>Email: {user.email ?? 'No disponible'}</Text>
      <Text>Blog: {user.blog ?? 'No disponible'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 20,
  },
  principalData: {
    borderBlockColor: '#FFC300',
    borderWidth: 1,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff4b7',
    paddingVertical: 10,
  },
  otherInfo: {},
  avatar: {width: 140, height: 140, borderRadius: 8, resizeMode: 'contain'},
  username: {
    fontSize: 18,
    paddingLeft: 5,
    fontWeight: 'bold',
  },
  complementaryText: {
    fontWeight: 'bold',
  },
  userInfo: {
    gap: 5,
  },
  commonText: {
    fontSize: 14,
  },
  contact: {
    borderBlockColor: 'green',
    backgroundColor: '#DAF7A6',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default UserDetail;
