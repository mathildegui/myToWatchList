import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import {Icon} from 'react-native-elements';
import { getFilmsFromApiWithSearchedText } from './../../api/TMDBApi'
import Lists from "../lists/lists";

class Search extends Component {

    constructor(props) {
        super(props);
        this.searchedText = "";
        this.page = 0;
        this.totalPages = 0;
        this.state = {
            films: [],
            isLoading: false
        };
    }

    componentDidUpdate() {
        console.log("componentDidUpdate : ");
        console.log(this.props)
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

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchFilms() { //load films + reset state
        this.page = 0;
        this.totalPages = 0;
        this.setState({
            films:[]
        }, () => {
            this._loadFilms() //load films but only after callbacks so that films variable is reset before
        });
    }

    _loadFilms = () => {
        console.log(this.searchedText);
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true });
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page;
                this.totalPages = data.total_pages;
                this.setState({
                    films: [ ...this.state.films, ...data.results ], //films: this.state.films.concat(data.results)
                    isLoading: false
                });
            })
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Search
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Titre du film'}
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchFilms()}
                />
                <Button color="#FE434C" badgeStyle= {{color: '#cc2026'}} style={{ height: 50, width: 150, alignSelf: 'center' }} title={'Rechercher'} onPress={() => this._searchFilms()}
                        icon={ <Icon
                            name="search"
                            size={28}
                            color="white"
                            type="material" />
                        }
                />
                <Lists
                    films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                    loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                    page={this.page}
                    totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
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
    input : {
        margin: 15,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
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

export default Search;