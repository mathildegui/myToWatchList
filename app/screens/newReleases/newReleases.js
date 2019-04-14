import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';
import Lists from "../lists/lists";
import {getNewReleases} from "../../api/TMDBApi";

class NewReleases extends Component {

    constructor(props) {
        super(props);
        this.page = 0;
        this.totalPages = 0;
        this.state = {
            films: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this._loadFilms();
    }

    _loadFilms = () => {
        this.setState({ isLoading: true })
        getNewReleases(this.page+1).then(data => {
            this.page = data.page
            this.totalPages = data.total_pages
            this.setState({
                films: [ ...this.state.films, ...data.results ],
                isLoading: false
            })
        })
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            ) ;
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Lists
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    page={this.page}
                    totalPages={this.totalPages}
                    favoriteList={false}
                />
                {this._displayLoading()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex:1,
        marginTop: 20
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

export default NewReleases;
