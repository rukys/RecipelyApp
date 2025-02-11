import React, {useEffect, useRef} from 'react';
import {LogBox, StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import Navigations from './navigations';
import FlashMessage from 'react-native-flash-message';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import {checkForUpdate, UpdateFlow} from 'react-native-in-app-updates';
// import {colors} from './utils';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import tw from '../tailwind';
import {themeStore} from './stores';

LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreAllLogs();
const queryClient = new QueryClient();

const App = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();

  const isDarkMode = themeStore(state => state.isDarkMode);

  async function getData() {
    try {
      await checkForUpdate(UpdateFlow.FLEXIBLE);
    } catch (e) {
      // Handle error
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // foreground notification
    const unsubscribe = messaging().onMessage(async ({notification, data}) => {
      console.log(notification, data);
      // handlePushLocalNotification(notification, data);
    });

    return unsubscribe;
  }, []);

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

              const trackScreenView = () => {
                // Your implementation of analytics goes here!
              };

              if (previousRouteName !== currentRouteName) {
                // Save the current route name for later comparison
                routeNameRef.current = currentRouteName;

                // Replace the line below to add the tracker from a mobile analytics SDK
                await trackScreenView(currentRouteName);
                await analytics().logEvent('AppScreen', {
                  screen: currentRouteName,
                });
                // console.log(currentRouteName);
              }
            }}>
            <StatusBar
              backgroundColor={tw.color(isDarkMode ? 'black' : 'white')}
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <Navigations />
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
      <FlashMessage position="top" />
    </>
  );
};

export default App;
