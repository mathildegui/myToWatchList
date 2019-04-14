import { createStore } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import toggleFavorite from './reducers/favoriteReducer'
import setAvatar from './reducers/avatarReducer'
import toggleSeen from './reducers/seenReducer'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
    key: 'root',
    storage: storage
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar, toggleSeen}))