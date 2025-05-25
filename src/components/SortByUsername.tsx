import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Order} from '../screens/HomeScreen';

interface ISortByUserName {
  toggleOrder: Function;
  order: Order;
}

export const SortByUsername = (props: ISortByUserName) => {
  const {toggleOrder, order} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ordenamiento por username</Text>
      <TouchableOpacity onPress={() => toggleOrder()}>
        <FontAwesome
          name={order === 'ASC' ? 'sort-alpha-asc' : 'sort-alpha-desc'}
          color="#000"
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#FFA07A',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontWeight: '400',
  },
});

export default SortByUsername;
