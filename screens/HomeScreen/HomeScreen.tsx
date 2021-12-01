import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../styles/colors';
import ProfileScreen from '../ProfileScreens/ProfileScreen';
import MapScreen from '../MapScreen/MapScreen';
import CommunityScreen from '../CommunityScreen/CommunityScreen';

const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => (
  <Tab.Navigator
    initialRouteName="Map"
    activeColor="yellow"
    barStyle={{
      backgroundColor: colors.mainColors.background.backgroundColor,
    }}
  >
    <Tab.Screen
      name="Community"
      component={CommunityScreen}
      options={{
        tabBarLabel: 'Community',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Map"
      component={MapScreen}
      options={{
        tabBarLabel: 'Map',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="map" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default HomeScreen;
