import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList
} from 'react-native';
import FilmItem from "../bean/FilmItem/FilmItem";
import { connect } from 'react-redux'

class Lists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            films: []
        }
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.films}
                keyExtractor={(item) => item.id.toString()}
                extraData={this.props.favoriteFilms}
                renderItem={({item}) =>
                    <FilmItem
                        film={item}
                        isFavorite={(this.props.favoriteFilms.findIndex(film => film.id === item.id) !== -1)}
                        displayDetailForFilm={this._displayDetailForFilm}
                    />
                }
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
                        this.props.loadFilms()
                    }
                }}
            />
        );
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmsDetails", {idFilm: idFilm})
    };


}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});

const mapStateToProps = state => {
    return {
        favoriteFilms: state.toggleFavorite.favoriteFilms
    }
};

export default connect(mapStateToProps)(Lists)