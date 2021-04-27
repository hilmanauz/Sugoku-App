import axios from 'axios'

export function insertInitiate (payload) {
	return {type: 'insertInitiate', payload}
}

export function insertAnswer (payload) {
  return {type: 'insertAnswer', payload}
}

export function insertStatus (payload) {
  return {type: 'insertStatus', payload}
}

export function changeLoadingInitiate (payload) {
  return {type: 'changeLoadingInitiate', payload}
}

export function changeLoadingStatus (payload) {
  return {type: 'changeLoadingStatus', payload}
}

export function addToLeaderBoard (payload) {
  return {type: 'addToLeaderBoard', payload}
}

export function resetLoadingInitiate () {
  return (dispatch) => {
    dispatch(changeLoadingInitiate(true))
  }
}

export function resetInitiate () {
  return (dispatch) => {
    dispatch(insertInitiate([]))
  }
}


export function insertAsyncInitiate (difficulty) {
	return (dispatch) => {
    // var data = {
    //   board: [[0,0,1,0,0,0,0,0,0],
    //           [2,0,0,0,0,0,0,7,0],
    //           [0,7,0,0,0,0,0,0,0],
    //           [1,0,0,4,0,6,0,0,7],
    //           [0,0,0,0,0,0,0,0,0],
    //           [0,0,0,0,1,2,5,4,6],
    //           [3,0,2,7,6,0,9,8,0],
    //           [0,6,4,9,0,3,0,0,1],
    //           [9,8,0,5,2,1,0,6,0]]
    // }
    // dispatch(insertInitiate(data.board))
    // dispatch(changeLoadingInitiate(false))
    dispatch(changeLoadingInitiate(true))
		axios({
      url: `https://sugoku2.herokuapp.com/board?difficulty=${difficulty}`,
      method: 'GET'
    })
      .then(({data}) => {
        dispatch(insertInitiate(data.board))
      })
      .catch(err => {
        console.log(err)
      })
      .finally(()=> {
        dispatch(changeLoadingInitiate(false))
      })
	}
}

export function getSolveAnswer () {
  return (dispatch, getState) => {
    dispatch(changeLoadingStatus(true))
    const state = getState()  
    const board = state.answer;
    const data = {board}
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

    fetch('https://sugoku2.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        dispatch(insertAnswer(response.solution))
      })
      .catch(console.warn)
      .finally(()=> {
        dispatch(changeLoadingStatus(false))
      })
  }
}

export function getValidationAnswer () {
  return (dispatch, getState) => { 
    const state = getState()  
    const board = state.answer;
    const data = {board}
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');
    fetch('https://sugoku2.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        dispatch(insertStatus(response.status))
      })
      .catch(console.warn)
  }
}