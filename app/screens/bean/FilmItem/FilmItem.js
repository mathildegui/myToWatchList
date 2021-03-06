import React, { Component } from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native'
import { getImageFromAPI } from './../../../api/TMDBApi'
import  FadeIn  from './../../../animation/fadeIn'

class FilmItem extends Component {
    render() {
        const {film, displayDetailForFilm} = this.props;
        return (
            <FadeIn>
                <TouchableOpacity
                    style={styles.main_container}
                    onPress={() => displayDetailForFilm(film.id)}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromAPI(film.poster_path)}}
                    />
                    <View style={styles.content_container}>
                        <View style={styles.header_container}>
                            {this._displayFavoriteImage()}
                            <Text style={styles.title_text}>{film.title}</Text>
                            <Text style={styles.vote_text}>{film.vote_average}</Text>
                        </View>
                        <View style={styles.description_container}>
                            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                        </View>
                        <View style={styles.date_container}>
                            <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>
        )
    }

    _displayFavoriteImage() {
        // let sourceImg = require('./../../images/ic_no_favorite.png');
        if(this.props.isFavorite) {
            sourceImg = require('./../../../images/ic_favorite.png');

            return(
                <Image
                    style={styles.favorite_img} source={sourceImg}/>
            )
        }
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    favorite_img: {
        width: 20,
        height: 20,
        marginRight: 5
    }
});

export default FilmItem;
