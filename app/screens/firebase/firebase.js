import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase';

class Firebase extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('favorites');
    }
    
    render () {
        return (
            <Button
            title={'Add TODO'}
            onPress={() => this.addTodo()} />
        );
    }
    
    addTodo() {
        this.ref.add({
            title: "test",
            complete: false,
        });
    }
}
export default Firebase;