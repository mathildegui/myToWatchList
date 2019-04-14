import React, { Component } from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import Lists from './../lists'
import Avatar from './../profile/avatar'
import { connect } from 'react-redux'

class Favorite extends Component {
    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.avatar_container}><Avatar/></View>
                <Lists
                    films={this.props.favoriteFilms}
                    navigation={this.props.navigation}
                    favoriteList={true} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    avatar_container: {
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

const mapStateToProps = state => {
    return {
        favoriteFilms: state.toggleFavorite.favoriteFilms
    }
};

export default connect(mapStateToProps)(Favorite);
