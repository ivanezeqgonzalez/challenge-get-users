import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import {Routes} from '../constants';
import UserScreen from './UserScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.HOME}>
      <Stack.Screen name={Routes.HOME} component={HomeScreen} />
      <Stack.Screen
        name={Routes.USER_DETAILS}
        component={UserScreen}
        options={({route}) => ({
          title: `Detalles de ${route.params.username}`,
        })}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
