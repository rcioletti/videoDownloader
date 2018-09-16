import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Icon, Button } from 'react-native-elements';

type Props = {};
export default class VideoBrowser extends Component<Props> {

  static navigationOptions = {
    title: 'Browser',

    drawerLabel: 'Home',
    drawerIcon: () => (
      <Icon
        name='youtube'
        color='#fff' />
    ),
  };

  render() {
    return(
      <View style={styles.container}>  
        <Text>Video Browser</Text>
        <Button title="Video Player" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    top: 20,
  },
});