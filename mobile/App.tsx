import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text, Center } from 'native-base';

import { THEME } from './src/styles/theme';

export default function App() {
  return (
    <NativeBaseProvider>
      <Center flex={1} bgColor="gray.900">
        <Text color="white" fontSize={24}>
          Hello World!
        </Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  );
}
