import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Button,
  Switch,
  Modal,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FilterBy, Order} from '../screens/HomeScreen';

export type SettingResults = {
  filters: FilterBy;
  order: Order;
};
interface ISortByUserName {
  toggleOrder: Function;
  setFilters: (newSettingsResults: SettingResults) => void;
  settingsResults: SettingResults;
}

interface IToggleOrder {
  toggleOrder: Function;
  order: Order;
}
const ToggleOrder = (props: IToggleOrder) => {
  const {order, toggleOrder} = props;
  return (
    <TouchableOpacity onPress={() => toggleOrder()}>
      <FontAwesome
        name={order === 'ASC' ? 'sort-alpha-asc' : 'sort-alpha-desc'}
        color="#000"
        size={24}
      />
    </TouchableOpacity>
  );
};

export const SortByUsername = (props: ISortByUserName) => {
  const {toggleOrder, settingsResults, setFilters} = props;
  const [open, setOpen] = useState(false);
  const [temporalFilter, setTemporalFilter] =
    useState<SettingResults>(settingsResults);

  const openModal = () => {
    setOpen(() => true);
  };

  const dimissModal = () => {
    setOpen(() => false);
    setTemporalFilter(settingsResults);
  };

  const successModal = () => {
    setFilters(temporalFilter);
    setOpen(() => false);
  };

  const updateTemporalFilter = (key: keyof FilterBy, value: any) => {
    const filters: FilterBy = {...temporalFilter.filters, [key]: value};
    setTemporalFilter(prev => ({...prev, filters}));
  };

  const updateTemporalOrder = () => {
    const newOrder = temporalFilter.order === 'ASC' ? 'DESC' : 'ASC';
    setTemporalFilter(prev => ({...prev, order: newOrder}));
  };

  return (
    // TODO: renombrar este archivo a uno generico de tipo filtros o config de resultados
    // TODO: agregar seccion Filtrar por favorito y otra para ordernar por asc desc. Tambien poner titulo de Configuración de resultados de búsqueda
    <View style={styles.container}>
      <Modal visible={open} animationType="slide">
        <Text>Filtrar por</Text>
        <View>
          <Text>Por Favorito</Text>
          <Switch
            value={temporalFilter.filters.byFavorite}
            onValueChange={value => updateTemporalFilter('byFavorite', value)}
          />
          <Text>Ascendete | Descendente</Text>
          <ToggleOrder
            order={temporalFilter.order}
            toggleOrder={() => updateTemporalOrder()}
          />
        </View>
        <Button title="Guardar" onPress={successModal} />
        <Button title="Cancelar" onPress={dimissModal} />
      </Modal>
      <Text style={styles.text}>Ordenamiento por username</Text>
      <Button title="filters" onPress={openModal} />
      <ToggleOrder order={settingsResults.order} toggleOrder={toggleOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
