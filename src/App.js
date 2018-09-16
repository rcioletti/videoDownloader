import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Player from './Player';
import VideoBrowser from './VideoBrowser';
import Playlists from './Playlists';
import Favorities from './Favorities';
import History from './History';

export default createBottomTabNavigator(
  {
    Favorities: {
      screen: Favorities,
      navigationOptions: {
          tabBarLabel: 'Favorities'
      }
    },
    History: {
      screen: History,
      navigationOptions: {
          tabBarLabel: 'History'
      }
    },
    VideoBrowser: {
      screen: VideoBrowser,
      navigationOptions: {
          tabBarLabel: 'VideoBrowser'
      }
    },
    Playlists: {
      screen: Playlists,
      navigationOptions: {
          tabBarLabel: 'Playlists'
      }
    },
    Player: {
      screen: Player,
      navigationOptions: {
          tabBarLabel: 'Player'
      }
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Favorities') {
          iconName = `ios-star${focused ? '' : '-outline'}`;
        } else if (routeName === 'History') {
          iconName = `ios-time`;
        } else if (routeName === 'VideoBrowser') {
          iconName = `ios-search`;
        } else if (routeName === 'Playlists') {
          iconName = `ios-musical-notes`;
        } else if (routeName === 'Player') {
          iconName = `ios-play-circle`;
        } 

        return <Icon name={iconName} type='ionicon'size={25} color={tintColor} />;
      },
    }),
    animationEnabled: true,
    swipeEnabled: true,
    gesturesEnabled: false,
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    },
  }
);