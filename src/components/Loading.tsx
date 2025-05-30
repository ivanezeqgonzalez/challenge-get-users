import {SafeAreaView, ActivityIndicator} from 'react-native';

const Loading = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};

export default Loading;
