import {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {UserService} from '../services/Users';

interface ISearchUsers {}

const SearchUsers = (props: ISearchUsers) => {
  const [terms, setTerms] = useState('');
  // const handleSearch
  const handleSearch = () => {
    console.log('Buscar por ', terms);
    UserService.getUsersByTerm(terms).then(console.log);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputSearch}
        placeholder="Buscá tus usuarios"
        defaultValue={terms}
        onChangeText={setTerms}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Text>BUSCAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'gray',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  inputSearch: {height: 40, padding: 5},
});
export default SearchUsers;
