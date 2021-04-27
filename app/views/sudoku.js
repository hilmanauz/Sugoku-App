import React, {useEffect, useState} from 'react'
import {insertAsyncInitiate, getSolveAnswer, insertAnswer, getValidationAnswer, insertInitiate, changeLoadingInitiate, addToLeaderBoard} from '../stores/action'
import {useDispatch, useSelector} from 'react-redux'
import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import { Button } from 'react-native-elements'
import Element from '../components/element'
import AwesomeAlert from 'react-native-awesome-alerts';

var interval = null;

export default function Sudoku({ route, navigation }) {
  const {difficulty, username, duration} = route.params
  const [isValidate, setIsValidate] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(duration)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(insertAsyncInitiate(difficulty))
    return (() => {
      clearInterval(interval)
      dispatch(insertInitiate([]))
      dispatch(changeLoadingInitiate(true))
    })
  }, [])
  const initiate = useSelector(state => state.initiate)
  const loadingInitiate = useSelector(state => state.loadingInitiate)
  useEffect(() => {
    if(secondsLeft === 0){
      Alert.alert("You Failed!", 'Sorry, your time is up :(')
    }
  }, [secondsLeft])
  const loadingStatus = useSelector(state => state.loadingStatus)
  useEffect(() => {
    dispatch(insertAnswer(initiate))
    if(initiate.length !== 0){
      interval = setInterval(() => {
        setSecondsLeft((secs) => {
          if(secs > 0) return secs - 1;
          else return 0;
        })
      }, 1000)
    } 
  }, [initiate])

  const status = useSelector(state => state.status)

  useEffect(() => {
    if(status === 'solved'){
      let point = 0;
      if(difficulty === 'hard'){
        point = secondsLeft * 30
      } else if (difficulty === 'medium'){
        point = secondsLeft * 20
      } else {
        point = secondsLeft * 10
      }
      dispatch(addToLeaderBoard({username, point}))
      navigation.replace('Finish', {
        username,
        difficulty,
        duration: duration - secondsLeft
      })
    } else if (status !== isValidate ){
      Alert.alert("Validation", `${status === "unsolved" ? 'Keep playing, your answer is correct' : 'You have duplicate answers on your row or column board'}`)
    }
  }, [status])
  
  
  const solveAnswer = () => {
    dispatch(getSolveAnswer())
  }
  const validateAnswer = () => {
    dispatch(getValidationAnswer())
    setIsValidate(status)
    if(isValidate === status && status && isValidate){
      Alert.alert("Validation", `${status === "unsolved" ? 'Keep playing, your answer is correct' : 'You have duplicate answers on your row or column board'}`)
    }
  }
  const clockify = () => {
    let minutes = Math.floor(secondsLeft / 60 % 60)
    let seconds = Math.floor(secondsLeft % 60)

    let displayMinutes = minutes < 10 ? `0${minutes}` : minutes
    let displaySeconds = seconds < 10 ? `0${seconds}` : seconds

    return {
      displayMinutes,
      displaySeconds
    }
  }
  const answer = useSelector(state => state.answer)

  if(loadingInitiate){
    return (
      <View style={{flex: 1, justifyContent: 'center',  alignItems: 'center', backgroundColor: 'black'}}>
        <Image source={ require('../assets/loading.gif')}></Image>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Image source={ require('../assets/gokus.webp')} style={{width: 60, height: 60}}/><Text style={styles.welcome} >SUGOKU</Text>
        </View>
        <View>
          <View style={styles.bar}>
            <Text style={styles.time}>Time = {clockify().displayMinutes}:{clockify().displaySeconds}</Text>
            <Text style={styles.difficulty}>{difficulty}</Text>
          </View>
          <View style={styles.board}>
            {
              answer.map((rows, i) => {
                return <View style={styles.row} key={i}> 
                {
                  rows.map((el, j) => {
                    return <Element el={el} row={i} col={j} key={j} initiate={initiate} answer={answer} secondsLeft={secondsLeft}></Element>
                  })
                }
                </View>
              })
            }
          </View>
        </View>
        <View style={styles.button}>
          <Button
            type="outline"
            title='Check'
            titleStyle={{fontFamily: 'ArcadeClassic', color: 'white', fontSize: 20}}
            raised= {true}
            buttonStyle= {styles.go}
            onPress={validateAnswer}
          />
          <Button
            type="outline"
            title='Solve'
            titleStyle={{fontFamily: 'ArcadeClassic', color: 'white', fontSize: 20}}
            raised= {true}
            buttonStyle= {styles.go}
            onPress={solveAnswer}
          />
        </View>
        <AwesomeAlert
          show={loadingStatus}
          messageStyle={{fontSize: 20, textAlign: 'center'}}
          contentContainerStyle={{padding: 30}}
          useNativeDriver={true}
          showProgress={true}
          message="Please wait.."
        />
      </View>
      )
    
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    justifyContent: 'space-evenly',
  },
  welcome: {
    fontFamily: 'ArcadeClassic',
    fontSize: 65
  },
  row: {
    flexDirection: 'row'
  },
  board: {
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  title: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  time: {
    fontFamily: 'ArcadeClassic',
    fontSize: 22,
  },
  go: {
    backgroundColor: '#8B0000',
    borderColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 20
  },
  difficulty: {
    fontFamily: 'ArcadeClassic',
    fontSize: 22
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 17
  }
});