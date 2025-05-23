import {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {UserService} from '../services/Users';
import Feather from 'react-native-vector-icons/Feather';
import {ICommonUser} from '../services/User.model';

interface ISearchUsers {
  setResults: (res: ICommonUser[]) => void;
  resetSearch: () => void;
}

const SearchUsers = (props: ISearchUsers) => {
  const {resetSearch, setResults} = props;
  const [terms, setTerms] = useState('');

  const handleSearch = () => {
    console.log('Buscar por ', terms);
    if (terms.trim().length === 0) {
      resetSearch();
    } else {
      UserService.getUsersByTerm(terms).then(results => {
        let res = results.items.map(UserService.transformUserToCommonUser);
        setResults(res);
      });
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputSearch}
        placeholder="Buscá tus usuarios"
        defaultValue={terms}
        onChangeText={setTerms}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.containerSearch}>
        <Feather name="search" color="#000" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#9FE2BF',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  containerSearch: {
    marginHorizontal: 10,
  },
  inputSearch: {height: 40, padding: 5, fontSize: 16},
});
export default SearchUsers;
