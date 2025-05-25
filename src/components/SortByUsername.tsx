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
import Feather from 'react-native-vector-icons/Feather';

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
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Filtros y ordenamiento</Text>
          <View style={styles.containerFilters}>
            <View style={styles.comboLabelValue}>
              <Text style={styles.labelSetting}>Por Favorito</Text>
              <Switch
                value={temporalFilter.filters.byFavorite}
                onValueChange={value =>
                  updateTemporalFilter('byFavorite', value)
                }
              />
            </View>
            <View style={styles.comboLabelValue}>
              <Text style={styles.labelSetting}>Ascendete | Descendente</Text>
              <ToggleOrder
                order={temporalFilter.order}
                toggleOrder={() => updateTemporalOrder()}
              />
            </View>
          </View>
          <View style={styles.containerButtons}>
            <Button title="Guardar" onPress={successModal} color={'#27ae60'} />
            <Button title="Cancelar" onPress={dimissModal} color={'#FFC300'} />
          </View>
        </View>
      </Modal>
      <Text style={styles.text}>Filtros y ordenamiento</Text>
      <ToggleOrder order={settingsResults.order} toggleOrder={toggleOrder} />
      <TouchableOpacity onPress={openModal}>
        <Feather name="filter" color="#000" size={24} />
      </TouchableOpacity>
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
    gap: 20,
  },
  comboLabelValue: {
    backgroundColor: 'pink',
    borderRadius: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 36,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 700,
  },
  modalContainer: {
    height: '100%',
    flexDirection: 'column',
    gap: 10,
    padding: 15,
  },
  containerFilters: {
    flex: 1,
    padding: 10,
    gap: 8,
  },
  labelSetting: {
    fontSize: 17,
    color: '#020202',
    fontWeight: 300,
  },
  containerButtons: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  text: {
    fontWeight: '400',
    flex: 1,
  },
});

export default SortByUsername;
