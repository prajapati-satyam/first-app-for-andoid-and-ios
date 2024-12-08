import React, { useState } from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput , Alert} from 'react-native';
import { Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
const [number, setnumber] = useState(1);
const [mess, setmess] = useState("All ok")
const [details, setdetails] = useState([])
const [rollnumber2, setrollnumber2] = useState(null);
const [enro, setenro] = useState(null);
const [name, setname] = useState(null);
const [lab, setlab] = useState(null);
const [click, setclick] = useState(false)
const url = `https://sem-4-ddu-student-data-server.vercel.app/sem4/${number}`
const setrollnumber = (e) => {
  const value = parseInt(e.nativeEvent.text, 10);
  // setnumber(value);
  if ((value >= 1 && value <= 146)) {
    setnumber(value);
    setmess("ALL OK")
  } else if(value === null || undefined) {
    setnumber(10) 
    setmess("Roll number must be greater than 1 and less than 147")
    }  else {
      setnumber(10);
       setmess("Roll number must be greater than 1 and less than 147")
      }
    }  
    const handleClick = async () => {
      setclick(true)
      // Alert.alert("i am click")
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/Airtel UPI Payment Sound Airtel Notification Sound Airtel Music Sound.mp3') // Replace with the path to your sound file
      );
      await sound.playAsync();
       const data = await fetch(url, {method:"POST"});
       if(!data.ok) {
        setrollnumber2(null)
        setenro(null)
        setname(null)
        setlab(null)
        setmess("error")     
       }
       const responce = await data.json();
       console.log(responce)
      //  setdetails([responce])
      setrollnumber2(responce.RollNo)
      setenro(responce.EnrollmentNo)
      setname(responce.StudentName)
      setlab(responce.LabBatchNo)

      // console.log(rollnumber2,enro,name,lab);
      
      setmess("All ok")
    }  
    console.log(rollnumber2,enro,name,lab);
    // const [number, setnumber] = useState(10);
    
    //   const setrollnumber = (e) => {
      //     const value = parseInt(e.nativeEvent.text, 1);
      
      //     // Check if the value is a valid number and within the range of 1 to 146
      //     if (!isNaN(value) && value >= 1 && value <= 146) {
        //       setnumber(value);
        //     } else {
          //       setnumber(10); // Reset to default value if invalid
          //       Alert.alert("Roll number must be between 1 to 146");
          //     }
          //   };
          const isDisable =  (number < 1 || number > 146);

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <Text style={styles.head}>Collages are useless </Text>
      <Text style={styles.head}>And their syllabus are outdated</Text>
      <Text style={styles.title}>This Is Use less DDU RollNumber Finder</Text>
      <TextInput
      style={styles.input}
        placeholder="Enter Roll number"
        keyboardType="numeric" // Restrict input to numbers
        value={number}  // Update state with input 
        onChange={setrollnumber}
        /> 
        <Text style={styles.pre}>Your current input: {number}</Text> 
        <Text style={styles.mess}>{mess}</Text> 
        <Button title='Get details' onPress={handleClick} disabled={isDisable}/>
        {click && <>
        <Text style={styles.Rollnumber}>Roll Number: {rollnumber2 !== null ? rollnumber2 : 'No data found'}</Text>
        <Text style={styles.enro}>Enrollment No: {enro !== null ? enro : 'No data found'}</Text>
        <Text style={styles.result}>Name: {name !== null ? name : 'No data found'}</Text>
        <Text style={styles.result}>Lab Batch: {lab !== null ? lab : 'No data found'}</Text>
        </>}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#242533",
  },  
  head: {
    fontSize: 15,
    color: "snow",
    marginTop: "40",
    textTransform: "capitalize",
    fontFamily: "monospace"
  } ,
  title:{
     color:"red",
     marginTop: 25,
     fontSize: 18
  },
   input:{
    backgroundColor: "white", 
    marginTop: 35,
    width: 160,
   } 
   , 
   pre:{
    color:"red",
    marginTop: 20
   },
    mess:{
      color: "red",
      marginTop: 10,
      marginBottom: 20,

    },
    result:{
      padding: 2,
     color: "black",
     width: 300,
     textTransform: "capitalize",
     backgroundColor: "lightgray"
    },  
    Rollnumber:{
      padding: 2,
      marginTop: 30,
      width: 300,
     textTransform: "capitalize",
     backgroundColor: "lightgray"
    },
     enro:{ 
      padding: 2,
      color: "black",
      width: 300,
      textTransform: "capitalize",
      backgroundColor: "lightgray",
      textTransform: "uppercase"
     }

});
