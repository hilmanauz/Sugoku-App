import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import { View, StyleSheet, Text, Image } from 'react-native';
import { Button } from 'react-native-elements'



export default function Finish({route, navigation}) {
  const {difficulty, username, duration} = route.params
  const [time, setTime] = useState(duration)
  const leaderBoard = useSelector(state => state.leaderBoard)
  leaderBoard.sort(function (a, b) {
    return b.point - a.point;
  });
  const clockify = () => {
    let minutes = Math.floor(time / 60 % 60)
    let seconds = Math.floor(time % 60)

    return {
      minutes,
      seconds
    }
  }
  return (
      <View style={styles.container}>
          <Text style={{textAlign: 'center', fontFamily: 'ArcadeClassic', fontSize: 20, paddingBottom: 5}}>Leaderboard</Text>
        <View style={styles.leaderboard}>
            <View style={styles.header}>
              <Text style={styles.boardHeader}>Rank</Text>
              <Text style={styles.boardHeader}>Username</Text>
              <Text style={styles.boardHeader}>Score</Text>
            </View>
          {
            leaderBoard.map((el, idx) => {
              return (
                <View style={styles.row} key={idx}> 
                  <Text style={styles.board}>{idx+1}</Text>
                  <Text style={styles.board}>{el.username}</Text>
                  <Text style={styles.board}>{el.point}</Text>
                </View>
              )
            })
          }
        </View>
        <View style={styles.congrats}>
          <Text style={styles.text}>Congratulation   {username}!</Text>
          <Text style={styles.text}>You passed to solve the sugoku board</Text>
          <Text style={styles.text}>Difficulty: {difficulty}</Text>
          <Text style={styles.text}>Duration: {clockify().minutes === 0 ? "" : `${clockify().minutes} minutes`} {clockify().seconds === 0 ? "" : `${clockify().seconds} seconds`}</Text>
        </View>
        <Button
          icon={
            <Image
              style={{width: 100, height: 50}}
              source={ require('../assets/goHome.gif') }
            />
          }
          title="Home"
          titleStyle={{marginLeft: 10, fontFamily: 'ArcadeClassic', fontSize: 30}}
          buttonStyle= {{backgroundColor: 'grey', borderColor: 'white', borderWidth: 1}}
          raised={true}
          onPress={() => navigation.navigate('Home')}
         />
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D3D3D3',
      alignItems: 'center',
      justifyContent: "center"
    },
    text: {
      fontSize: 20,
      fontFamily: 'ArcadeClassic',
      lineHeight: 23
    },
    congrats:{
      alignItems:'center',
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: 5,
      padding: 15,
      marginBottom: 30,
      borderColor: '#8B0000',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,

      elevation: 9,
    },
    leaderboard: {
      backgroundColor: '#8B0000',
      width: 350,
      marginBottom: 40,
      paddingHorizontal: 10,
      paddingBottom: 15,
      paddingTop: 5,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'white',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 20
    },
    board: {
      fontFamily: 'ArcadeClassic',
      color: 'white'
    },
    boardHeader: {
      fontFamily: 'ArcadeClassic',
      lineHeight: 20,
      fontSize: 15
    }
})