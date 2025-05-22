import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {IUserDetail} from '../services/Users';
import {useEffect} from 'react';
import {useUserConfigContext} from '../context/userConfigs.context';

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
      <View style={styles.userInfo}>
        <Text style={styles.username}>{user.login}</Text>
        <Image source={{uri: user.avatar_url}} style={styles.avatar} />
        <Text>Nombre: {user.name}</Text>
        {user.bio && <Text>Bio: {user.bio}</Text>}
      </View>
      <TouchableHighlight onPress={toggleFavorite}>
        <Text>
          {!isFavorite(user.id)
            ? 'Agregar a favoritos'
            : 'Remover de favoritos'}
        </Text>
      </TouchableHighlight>
      <Text>Repos públicos: {user.public_repos}</Text>
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
  avatar: {width: 75, height: 75, borderRadius: 8},
  username: {
    fontSize: 18,
  },
  userInfo: {
    gap: 5
  },
  commonText: {
    fontSize: 14,
  },
  contact: {
    borderBlockColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
export default UserDetail;
