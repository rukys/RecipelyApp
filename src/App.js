import React, {useRef, useState} from 'react';
import {LogBox} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import Navigations from './navigations';
import FlashMessage from 'react-native-flash-message';
// import {colors} from './utils';
import {SafeAreaProvider} from 'react-native-safe-area-context';

LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreAllLogs();
const queryClient = new QueryClient();

const App = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();
  const [screen, setScreen] = useState('');

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current = navigationRef.getCurrentRoute().name;
            }}
            onStateChange={async () => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName = navigationRef.getCurrentRoute().name;
              setScreen(currentRouteName);
              const trackScreenView = () => {
                // Your implementation of analytics goes here!
              };

              if (previousRouteName !== currentRouteName) {
                // Save the current route name for later comparison
                routeNameRef.current = currentRouteName;

                // Replace the line below to add the tracker from a mobile analytics SDK
                await trackScreenView(currentRouteName);
                console.log(currentRouteName);
              }
            }}>
            <Navigations />
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
      <FlashMessage position="top" />
    </>
  );
};

export default App;
