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

var REQUEST_URL = "https://jobs.github.com/positions.json";
var mockdata = [
  {
    "id": "59d83fd0-c381-11e5-85fd-77e746dfdf8d",
    "created_at": "Mon Jan 25 16:34:37 UTC 2016",
    "title": "Lead Frontend Engineer",
    "location": "New York, NY",
    "type": "Full Time",
    "description": "<p>Launched in 2013, First Look Media (FLM) is a new-model media company p…",
    "how_to_apply": "<p><a href=\"http://grnh.se/w7fykr\">http://grnh.se/w7fykr…",
    "company": "First Look",
    "company_url": "http://firstlook.media",
    "company_logo": null,
    "url": "http://jobs.github.com/positions/59d83fd0-c381-11e5-85fd-77e746dfdf8d"
  },
  {
    "id": "24dc8846-bedf-11e5-82a5-d34a83712e5e",
    "created_at": "Tue Jan 19 19:02:51 UTC 2016",
    "title": "iOS Engineer",
    "location": "New York, NY",
    "type": "Full Time",
    "description": "<p>As an iOS Engineer at Handshake, you&#39;ll build mission-critical…",
    "how_to_apply": "<p><a href=\"http://grnh.se/ucw1p6\">http://grnh.se/ucw1p6…",
    "company": "Handshake",
    "company_url": "https://www.handshake.com",
    "company_logo": null,
    "url": "http://jobs.github.com/positions/24dc8846-bedf-11e5-82a5-d34a83712e5e"
  }
];

class jblyrn extends Component {
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
          Loading movies...
        </Text>
      </View>
    );
  }  

  renderJobs(job) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {job.title}
        </Text>
        <Text style={styles.instructions}>
          {job.location}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('jblyrn', () => jblyrn);
