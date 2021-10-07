import React from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../components/context';
import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import colors from '../../styles/colors';
// import HomeScreen from './HomeScreen';
import ProfileScreen from '../ProfileScreens/ProfileScreen';
import MapScreen from '../MapScreen/MapScreen';
import CommunityScreen from '../CommunityScreen/CommunityScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor='yellow'
      barStyle={{
        backgroundColor: colors.mainColors.background.backgroundColor,
      }}
    >
      <Tab.Screen
        name='Community'
        component={CommunityScreen}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Map'
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='map' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='account'
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
