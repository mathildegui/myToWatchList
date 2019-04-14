const initialState = {historicFilms: []};

function manageHistoricFilms(state = initialState, action) {
    let nextState;
    switch(action.type) {
        case 'TOGGLE_FILMDETAIL':

            const seenFilmIndex =
                state.historicFilms.findIndex(item => item.id === action.value.id);
            if(seenFilmIndex === -1) {
                nextState = {
                    ...state,
                    historicFilms: [...state.historicFilms, action.value]
                }
            }
            return nextState || state;

        case 'REMOVE_HISTORIC_FILM':
            const removeFilmIndex =
                state.historicFilms.findIndex(item => item.id === action.value.id);
            if(removeFilmIndex !== -1) {
                nextState = {
                    ...state,
                    historicFilms: state.historicFilms.filter( (item , index) => index !== removeFilmIndex)
                }
            }
            return nextState || state;

        case 'RESET_HISTORIC':
            nextState = {
                ...state,
                historicFilms: []
            };
            return nextState || state;
        default:
            return state
    }
}

export default manageHistoricFilms
