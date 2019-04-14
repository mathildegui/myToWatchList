import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity,
    Share,
    Button,
    Platform
} from 'react-native';
import { getFilmDetail, getImageFromAPI } from './../../api/TMDBApi'
import { connect } from 'react-redux'

class FilmsDetails extends Component {

    static navigationOptions = ({ navigation }) => {
        const {params} = navigation.state
        if(params.film !== undefined && Platform.OS === 'ios')
            return {
                headerRight: (
                    <TouchableOpacity
                        style={styles.share_menu}
                        onPress={() => params.shareFilm()} >
                        <Image
                            style={styles.share_image}
                            source={require('./../../images/ic_share.png')}
                        />
                    </TouchableOpacity>
                )
            }
    };

    constructor(props) {
        super(props);
        this.state = {
            film: undefined,
            isLoading: false
        }
    }

    componentDidMount() {
        const favoriteItem = this.props.favoriteFilms.findIndex(item => item.id === this.props.navigation.state.params.idFilm)

        if(favoriteItem !== -1) {
            this.setState({
                film: this.props.favoriteFilms[favoriteItem]
            });
            return
        }
        this.setState({isLoading: true});
        getFilmDetail(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            }, () => {this._updateNAvigationParams()})
        })
    }

    _updateNAvigationParams() {
        this.props.navigation.setParams({
            shareFilm: this._shareFilm,
            film: this.state.film
        })
    }

    _toggleFavorite() {
        const action = {type: "TOGGLE_FAVORITE", value: this.state.film};
        this.props.dispatch(action)
    }

    _toggleSeen() {
        const action = {type: "TOGGLE_SEEN", value: this.state.film};
        this.props.dispatch(action)
    }

    _displayLoading() {
        if (this.state.isLoading) {
            // Si isLoading vaut true, on affiche le chargement à l'écran
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayFloatingAB() {
        const {film} = this.state
        if(film !== undefined && Platform.OS === 'android') {
            return (
                <TouchableOpacity
                    style={styles.share_fab}
                    onPress={() => this._shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require("./../../images/ic_share.png")}
                    />
                </TouchableOpacity>
            )
        }
    }

    _shareFilm = () => {
        const { film } = this.state
        Share.share({
            title: film.title,
            message: film.overview
        })
    }

    _displayFilm() {
        const {film} = this.state;
        if(film !== undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    {this._displayImage()}
                    <Text style={styles.title_text}>{film.title}</Text>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text>Sortie le {film.release_date}</Text>
                    <Text style={fontWeight= 'bold'}>Note: {film.vote_average}</Text>
                    <Text>Nombre de votes: {film.vote_count}</Text>
                    <Text>Budget: {film.budget}</Text>
                    <Text>Genre(s): {film.genres.map(function (genre) {
                        return genre.name;
                    }).join(' | ')}</Text>
                    <Text>Companie(s): {film.production_companies.map(function (company) {
                        return company.name;
                    }).join(' | ')}</Text>
                </ScrollView>
            )
        }
    }

    _displayButtonAlreaySeen() {
        const {film} = this.state
        if (film !== undefined && this.props.seenFilms.findIndex(item => item.id === film.id) !== -1) {
            return <Button style={{height: 50}} title={'Don\'t seen'} onPress={() => this._toggleSeen()}/>
        } else {
            return <Button style={{height: 50}} title={'I\'v seen it'} onPress={() => this._toggleSeen()}/>
        }
    }

    _displayFavoriteImage() {
        let sourceImg = require('./../../images/ic_no_favorite.png');
        if(this.props.favoriteFilms.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImg = require('./../../images/ic_favorite.png');
        }
        return(
            <Image
                style={styles.favorite_img} source={sourceImg}/>
        )

    }

    _displayImage() {
        if(this.state.film.backdrop_path !== null) {
            return (
                <Image
                    style={styles.image}
                    source={{uri: getImageFromAPI(this.state.film.backdrop_path)}}
                />
            )
        } else {
            return (
                <Image
                    style={styles.image}
                    source={{uri: getImageFromAPI(this.state.film.poster_path)}}
                />
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
                {this._displayFloatingAB()}
                {this._displayButtonAlreaySeen()}
            </View>
        )}
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    image: {
        width: '100%',
        height: 180,
        margin: 5
    },
    scrollview_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        margin: 10
    },
    description_text: {
        fontStyle:'italic',
        color:'#666666',
        margin: 5
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_img: {
        width: 40,
        height: 40
    },
    share_menu: {
        marginRight: 8
    },
    share_fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        end: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 30,
        height: 30
    }
});

const mapStateToProps = (state) => {
    return {
        favoriteFilms: state.toggleFavorite.favoriteFilms,
        seenFilms : state.toggleSeen.seenFilms
    }
};

export default connect(mapStateToProps)(FilmsDetails);