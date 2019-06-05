import React from 'react';
import {StackNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {Icon} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Favorite from './screens/favorite';
import Search from './screens/search';
import FilmsDetails from "./screens/filmsDetails/filmsDetails";
import News from "./screens/newReleases/newReleases";
import Seen from "./screens/seen/seen";
import Firebase from "./screens/firebase/firebase";

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Here the Search'
        }
    },
    FilmsDetails: {
        screen: FilmsDetails
    }
});

const FavoritesStackNavigator = createStackNavigator({
    Favorite: {
        screen: Favorite,
        navigationOptions: {
            title: 'My movies'
        }
    },
    FilmsDetails: {
        screen: FilmsDetails
    }
});

const NewsStackNavigator = createStackNavigator({
    News: {
        screen: News,
        navigationOptions: {
            title: 'New Release'
        }
    },
    FilmsDetails: {
        screen: FilmsDetails
    }
});

const SeenStackNavigator = createStackNavigator({
    Seen: {
        screen: Seen,
        navigationOptions: {
            title: 'Already seen'
        }
    },
    FilmsDetails: {
        screen: FilmsDetails
    }
});

const FirebaseStackNavigator = createStackNavigator({
    Firebase: {
        screen: Firebase,
        navigationOptions: {
            title: 'Fire test'
        }
    }
});

const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarIcon: ({tintColor}) => <Icon name="database-search" type="material-community" size={28} color={tintColor}/>
        }
    },
    Favorites: {
        screen: FavoritesStackNavigator,
        navigationOptions: {
            tabBarLabel: 'My movies',
            tabBarIcon: ({tintColor}) => <FontAwesome5 name="kiss-wink-heart" type="font-awesome" size={28} color={tintColor}/>
        }
    },
    News: {
        screen: NewsStackNavigator,
        navigationOptions: {
            tabBarLabel: 'New Release',
            tabBarIcon: ({tintColor}) => <Icon name="movie-filter" size={28} color={tintColor}/>
        }
    },
    Seen: {
        screen: SeenStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Already seen',
            tabBarIcon: ({tintColor}) => <Icon name="visibility" size={28} color={tintColor}/>
        }
    },
    Firebase: {
        screen: FirebaseStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Fire test',
            tabBarIcon: ({tintColor}) => <Icon name="visibility" size={28} color={tintColor}/>
        }
    }
});

export default createAppContainer(MoviesTabNavigator)