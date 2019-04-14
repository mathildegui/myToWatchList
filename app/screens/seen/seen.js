import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Lists from './../lists'
import { connect } from 'react-redux'

class Seen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Lists
                    films={this.props.seenFilms}
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
        seenFilms: state.toggleSeen.seenFilms
    }
};

export default connect(mapStateToProps)(Seen);
