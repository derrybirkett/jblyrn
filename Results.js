'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  LinkingIOS
} from 'react-native';

var REQUEST_URL = "https://jobs.github.com/positions.json";

class Results extends Component {
  constructor(props) {
     super(props);
     this.state = {
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2
       }),
       loaded: false,
     };
   }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  render() {

    if(!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderJobs}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading Jobs...
        </Text>
      </View>
    );
  }

  onPressButton(url) {
    alert('Hi!');
    LinkingIOS.openURL(url);
  }

  renderJobs(job) {
    return (
      <TouchableHighlight onPress={() => { LinkingIOS.openURL(job.url); }}>
        <View style={styles.container}>
              <Text style={styles.title}>
                {job.title}
              </Text>
              <Text style={styles.location}>
                {job.company} - {job.location}
              </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 30,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderStyle: 'solid'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  location: {
    textAlign: 'center',
    color: '#999'
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = Results;
