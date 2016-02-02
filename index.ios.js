/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

// COMPONENTS
var Results = require('./Results');

class jblyrn extends Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Github',
          component: Results,
        }}/>
    );
   }
}
var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('jblyrn', () => jblyrn);
