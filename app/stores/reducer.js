const initialState = {
    loadingInitiate: true,
    loadingStatus: false,
    initiate: [],
    answer: [],
    status: '',
    leaderBoard: []
  }
  function reducer (state = initialState, action) {
    const {type, payload} = action;
    if (type === 'insertInitiate'){
      return {...state, initiate: payload}
    } else if (type === 'insertStatus'){
      return {...state, status: payload}
    } else if (type === 'insertAnswer'){
      return {...state, answer: payload}
    } else if (type === 'changeLoadingInitiate'){
      return {...state, loadingInitiate: payload}
    } else if (type === 'addToLeaderBoard'){
      return {...state, leaderBoard: state.leaderBoard.concat(payload)}
    }
  
    return state
  }
  
  export default reducer;