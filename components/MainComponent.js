import React, { Component } from 'react';
import { Platform, View,Image,StyleSheet,ScrollView,Text, ToastAndroid} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Aboutus from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import {createDrawerNavigator, createStackNavigator,DrawerItems,SafeAreaView} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {connect } from 'react-redux';
import {fetchDishes,fetchComments,fetchPromos,fetchLeaders} from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: ()=> dispatch(fetchDishes()),
  fetchComments: ()=> dispatch(fetchComments()),
  fetchLeaders: ()=> dispatch(fetchLeaders()),
  fetchPromos: ()=> dispatch(fetchPromos())
})

const MenuNavigator = createStackNavigator({
  Menu: {screen: Menu,
  navigationOptions: ({navigation}) => ({
    headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
  })},
  Dishdetail: {screen: Dishdetail}
},{
  initialRouteName: 'Menu',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#512DAB'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    }
  }
});

const HomeNavigator = createStackNavigator({
  Home: {screen: Home}
},{
  navigationOptions: ({navigation}) => ({
    headerStyle: {
      backgroundColor: '#512DAB'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    },
    headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
  })
});

const ContactNavigator = createStackNavigator({
  Contact: {screen: Contact}
},{
  navigationOptions: ({navigation}) => ({
    headerStyle: {
      backgroundColor: '#512DAB'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    },
    headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
  })
});

const AboutNavigator = createStackNavigator({
  Aboutus: {screen: Aboutus}
},{
  navigationOptions: ({navigation}) => ({
    headerStyle: {
      backgroundColor: '#512DAB'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    },
    headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
  })
});

const LoginNavigator = createStackNavigator({
  Login: { screen: Login }
}, {
navigationOptions: ({ navigation }) => ({
  headerStyle: {
      backgroundColor: "#512DA8"
  },
  headerTitleStyle: {
      color: "#fff"            
  },
  headerTintColor: "#fff",
  headerLeft: <Icon name="menu" size={24}
    iconStyle={{ color: 'white' }} 
    onPress={ () => navigation.toggleDrawer() } />    
})
});

const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }} 
      onPress={ () => navigation.toggleDrawer() } />    
  })
})

const FavoritesNavigator = createStackNavigator({
  Favorites: { screen: Favorites }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }} 
      onPress={ () => navigation.toggleDrawer() } />    
  })
})


const CustomDrawerContentComponent = (props) => (
  <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{top: 'always',horizontal: 'never'}}>
           <View style={styles.drawerHeader}>
              <View style = {{flex: 1}}>
                  <Image source={require('./images/logo.png')} style={styles.drawerImage} />
              </View>
              <View style={{flex: 2}}>
                 <Text style={styles.drawerHeaderText}>Ristorante Confusion</Text>
              </View>
           </View>
           <DrawerItems {...props} />
      </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator({
  Login: 
  { screen: LoginNavigator,
    navigationOptions: {
      title: 'Login',
      drawerLabel: 'Login',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='sign-in'
          type='font-awesome'            
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  },
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home',
      drawerIcon: ({tintColor}) => (
        <Icon name='home' type='font-awesome' size={24} color={tintColor} />
      )
    }
  },
 Aboutus: {
  screen: AboutNavigator,
  navigationOptions: {
    title: 'About Us',
    drawerLabel: 'About Us',
    drawerIcon: ({tintColor}) => (
      <Icon name='info-circle' type='font-awesome' size={24} color={tintColor} />
    )
  }
},
  Menu: {
     screen: MenuNavigator,
     navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu',
      drawerIcon: ({tintColor}) => (
        <Icon name='list' type='font-awesome' size={24} color={tintColor} />
      )
    }
  }
,
Contact: {
  screen: ContactNavigator,
  navigationOptions: {
    title: 'Contact Us',
    drawerLabel: 'Contact Us',
    drawerIcon: ({tintColor}) => (
      <Icon name='address-card' type='font-awesome' size={22} color={tintColor} />
    )
  }
},
Reservation:
      { screen: ReservationNavigator,
        navigationOptions: {
          title: 'Reserve Table',
          drawerLabel: 'Reserve Table',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='cutlery'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }
      },
      Favorites:
        { screen: FavoritesNavigator,
          navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor, focused }) => (
              <Icon
                name='heart'
                type='font-awesome'            
                size={24}
                iconStyle={{ color: tintColor }}
              />
            ),
          }
        }
 },
{
  initialRouteName: 'Home',
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
});


class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
/*
  NetInfo.getConnectionInfo() 
    .then((connectionInfo) => {
          ToastAndroid.show('Initial Network Connectivity Type: '
          + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
          ToastAndroid.LONG)
  });   

  NetInfo.addEventListener('connectionChange', this.handleConnectivityChange(connectionInfo));

  }


  componentWillUnmount() {
      NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange(connectionInfo));
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }
*/
  render() {
 
    return (
        <View style={{flex: 1,paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
        </View>
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor:  '#512DAB',
    height: 140,
    alignItems: 'center'
    ,justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
})
  
export default connect(mapStateToProps,mapDispatchToProps)(Main);