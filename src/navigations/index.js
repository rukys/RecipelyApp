/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  HomeScreen,
  SignupScreen,
  LoginScreen,
  SplashScreen,
  OnboardScreen,
  SearchScreen,
  FavoriteScreen,
  ProfileScreen,
  ArticleScreen,
  NotificationScreen,
  RecipeScreen,
  RecipeDetailScreen,
  AboutScreen,
  ProfileDetailScreen,
  FaqScreen,
  ContactMeScreen,
  ForgotPasswordScreen,
  DeleteAccountScreen,
  WebviewScreen,
  UpdateVersionScreen,
} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../components';
import ArticleDetailScreen from '../screens/article-detail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppBarScreen = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Navigations = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
      <Stack.Screen name="AppBarScreen" component={AppBarScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
      <Stack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
      />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
      <Stack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="FaqScreen" component={FaqScreen} />
      <Stack.Screen name="ContactMeScreen" component={ContactMeScreen} />
      <Stack.Screen
        name="UpdateVersionScreen"
        component={UpdateVersionScreen}
      />
      <Stack.Screen
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name="ProfileDetailScreen"
        component={ProfileDetailScreen}
      />
      <Stack.Screen name="WebviewScreen" component={WebviewScreen} />
    </Stack.Navigator>
  );
};

export default Navigations;
