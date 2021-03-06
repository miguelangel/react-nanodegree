import React from 'react';
import {View, Platform, StatusBar as NativeStatusBar} from 'react-native';
import PropTypes from 'prop-types';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {Constants} from 'expo';
import AddEntry from './components/AddEntry';
import History from './components/History';
import EntryDetails from './components/EntryDetails';
import Live from './components/Live';
import {purple, white} from './utils/colors';
import reducer from './reducers';
import {setLocalNotification} from './utils/helpers';

const StatusBar = ({backgroundColor, ... props}) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <NativeStatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
);

StatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired
};

const Tabs = TabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      // eslint-disable-next-line react/display-name, react/prop-types
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30}
        color={tintColor}/>
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      // eslint-disable-next-line react/display-name, react/prop-types
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30}
        color={tintColor}/>
    }
  },
  Live: {
    screen: Live,
    navigationOptions: {
      tabBarLabel: 'Live',
      // eslint-disable-next-line react/display-name, react/prop-types
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-speedometer' size={30}
      color={tintColor}/>
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  EntryDetails: {
    screen: EntryDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {backgroundColor: purple}
    }
  }
});

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor={purple} barStyle='light-content'/>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}
