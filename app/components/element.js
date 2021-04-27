import React, {useState, useEffect} from 'react'
import { TextInput, StyleSheet } from 'react-native';
import { insertAnswer } from '../stores/action'
import {useDispatch} from 'react-redux'
import _ from 'lodash'


export default function Element(props) {
  const [data, setData] = useState('')
  const dispatch = useDispatch()
  const {el, row, col, initiate, answer, secondsLeft} = props
  useEffect(() => {
    setData(el)
  }, [el])

  const inputAnswer = (value) => {
    if (parseInt(value) || value === ""){
      let temp = _.cloneDeep(answer)
      temp[row][col] = parseInt(value) || 0;
      dispatch(insertAnswer(temp))
      setData(value)
    }
  }

  return (
    <TextInput
      style={[styles.input, {borderRightWidth: col % 3 === 2 ? 3 : 0.5, borderBottomWidth: row % 3 === 2 ? 3 : 0.5, borderLeftWidth: col === 0 ? 3 : 0.5, borderTopWidth: row === 0 ? 3 : 0.5, borderRightColor: col % 3 !== 2 ? 'red' : 'black', borderBottomColor: row % 3 !== 2 ? 'red' : 'black', backgroundColor: initiate[row][col] !== 0 ? 'rgba(200, 157, 115, 0.7)' : 'white', color: initiate[row][col] !== 0 ? 'white' : 'black'}]}
      onChangeText={value => inputAnswer(value)}
      editable={initiate[row][col] === 0 && secondsLeft !== 0 ? true : false}
      value={data.toString() !== "0" ? data.toString() : "" }
      keyboardType="numeric"
      maxLength={1}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 40,
    borderWidth: 0.5,
    textAlign:'center',
    fontSize: 25,
    fontFamily: 'ArcadeClassic'
  },
});