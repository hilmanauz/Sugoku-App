import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Image, SafeAreaView, Text } from 'react-native'
import { Input, Button, BottomSheet, ListItem } from 'react-native-elements'
import { changeLoadingInitiate, insertStatus } from '../stores/action'
import { useDispatch } from 'react-redux'
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Home(props) {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [duration, setDuration] = useState(null);
  const [difficulty, setDifficulty] = useState('');
  const [username, setUsername] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const list = [
    { title: 'Hard', disabled: difficulty === 'hard' ? true : false, disabledStyle:{backgroundColor: '#D3D3D3'}, onPress: () => {
      setDifficulty('hard')
      setDuration(360)
      toggleBottomNavigationView()
    } },
    { title: 'Medium', disabled: difficulty === 'medium' ? true : false, disabledStyle:{backgroundColor: '#D3D3D3'}, onPress: () => {
      setDifficulty('medium')
      setDuration(300)
      toggleBottomNavigationView()
    } },
    { title: 'Easy', disabled: difficulty === 'easy' ? true : false, disabledStyle:{backgroundColor: '#D3D3D3'}, onPress: () => {
      setDifficulty('easy')
      setDuration(240)
      toggleBottomNavigationView()
    } },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: 'red', opacity: 0.9 },
      titleStyle: { color: 'white' },
      onPress: () => {
        toggleBottomNavigationView()
      }
    },
  ];
  const toggleBottomNavigationView = () => {
    setIsVisible(!isVisible);
  };
  const goToSudoku = () => {
    if(!username){
      setShowAlert(true)
    } else if (!difficulty){
      setShowAlert(true)
    } else {
      dispatch(changeLoadingInitiate(true))
      dispatch(insertStatus(''))
      props.navigation.navigate('Play', {
        username,
        difficulty,
        duration
      })
      setUsername('')
      setDifficulty('')
      setDuration(null)
    }
  }

    return (
      <View style={styles.container}>
        <View>
          <Text style={{fontFamily: 'ArcadeClassic', textAlign: 'center', fontSize: 65, paddingTop: 30}}>Welcome To</Text>
          <View style={styles.sugoku}>
            <Text style={{fontFamily: 'ArcadeClassic', textAlign: 'center', fontSize: 65, paddingTop: 40}}>SU</Text>
            <Image
              source={ require('../assets/goku.gif') }
              style={styles.goku}
            />
          </View>
        </View>
        <View style={styles.input}>
            <Text style={{fontFamily: 'ArcadeClassic', fontSize: 30}}>Username</Text>
          <Input
            inputContainerStyle={styles.inputName}
            inputStyle={{textAlign:'center', fontFamily: 'ArcadeClassic', fontSize: 20}}
            onChangeText={value => setUsername(value)}
            value={username}
          />
        <Button
            type="outline"
            title='Difficulty'
            titleStyle={{fontFamily: 'ArcadeClassic', color: 'black', fontSize: 25}}
            raised= {true}
            buttonStyle= {styles.difficulty}
            containerStyle= {{marginTop: 5}}
            onPress={toggleBottomNavigationView}
          />
        </View>

        <View style={styles.input}>
           <Button
            type="outline"
            title='Play Game'
            titleStyle={{fontFamily: 'ArcadeClassic', color: 'black', fontSize: 35, color: 'white'}}
            raised= {true}
            buttonStyle= {styles.go}
            containerStyle= {{marginTop: 50}}
            onPress={goToSudoku}
          />
        </View>
        
        <SafeAreaView>
          <BottomSheet
            isVisible={isVisible}
            containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
          >
            {list.map((l, i) => (
              <ListItem key={i} containerStyle={l.containerStyle} disabled={l.disabled} disabledStyle={l.disabledStyle} onPress={l.onPress}>
                <ListItem.Content>
                  <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </BottomSheet>
        </SafeAreaView>

        <AwesomeAlert
          show={showAlert}
          titleStyle={{fontSize: 30, color: 'red'}}
          messageStyle={{fontSize: 20, textAlign: 'center'}}
          contentContainerStyle={{padding: 30}}
          useNativeDriver={true}
          showConfirmButton={true}
          title="Warning!"
          message="Please Input Username and Difficulty"
          onDismiss={() => {
            setShowAlert(false)
          }}
          onConfirmPressed={() => {
            setShowAlert(false)
          }}
        />
       
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D3D3D3',
      justifyContent: 'space-between',
    },
    welcome: {
      marginRight: 'auto',
      marginLeft: 'auto',
      marginTop: 50,
      width: 320, 
      height: 30
    },
    sugoku:{
      marginTop: 20,
      justifyContent: 'center',
      flexDirection: 'row'
    },
    goku:{
      height: 150,
      width: 120,
    },
    input:{
      alignItems: 'center'
    },
    inputName:{
      width:200,
      marginHorizontal: 85,
      marginVertical: 10,
    },
    difficulty: {      
      backgroundColor: 'grey',
      borderColor: 'white',
      paddingHorizontal: 40,
      paddingVertical: 20
    },
    go: {
      backgroundColor: '#8B0000',
      borderColor: 'white',
      paddingHorizontal: 70,
      paddingVertical: 30,
    }
  });
