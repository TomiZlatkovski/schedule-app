import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useEffect } from 'react'
import { getTasks, Response } from './src/components/Helper';
import { iNote } from './src/components/Interfaces';
import Home from './src/pages/Home/Home';
import DatePicker from 'react-native-date-picker';
import AddNote from './src/pages/AddNote/AddNote';

export default function App(): JSX.Element {

    //TODO  INSTALL react-native-date-picker

    const [notes, setNotes] = useState<iNote[]>([])
    const [reload, setReload] = useState<boolean>(false)
    const [response, setResponse] = useState<string | null>(null)
    
    const [date, setDate] = useState<Date>(new Date())
    const [dateSelectorVisible, setDateSelectorVisible] = useState(false)
    

    useEffect(() => {
        getTasks(date.toISOString().split("T")[0], setResponse, setNotes)
    }, [reload, date])

    console.log(notes)

    return (
        <View style={styles.mainViewStyle}>
            <View>
                <Button title='-1' onPress={() => console.log("date-1")}/>
                <Text style={styles.textStyle} onPress={() => setDateSelectorVisible(true)}>{date.toISOString().split("T")[0]}</Text>
                <Button title='+1' onPress={() => console.log("date+1")}/>
            </View>
            <DatePicker modal open={dateSelectorVisible} date={date}
                onConfirm={(date) => {
                    setDateSelectorVisible(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setDateSelectorVisible(false)
                }}
            />
            <Home notes={notes} styles={styles} />
            {/* <AddNote setResponse={setResponse} date={date}/> */}
            <Button title='reload' onPress={() => setReload(!reload)}></Button>
            <Text style={styles.responseText}>{response}</Text>
        </View>
    );
}


//STYLES
const styles = StyleSheet.create({
    mainViewStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
    },
    textStyle: {
        fontSize: 50
    },
    notes: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '80%'
    },
    note: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
        borderColor: 'blue',
        borderRadius: 10,
        borderWidth: 1,
        margin: 20,
        width: '90%'
    },
    titleDueTimeWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderColor: 'blue',
        borderBottomWidth: 2,
        width: '100%'
    },
    noteText: {
        fontSize: 30,
        padding: 10,
        color: 'black',
    },
    noteDescription: {
        fontSize: 20,
        margin: 10,
        color: 'black'
    },
    responseText: {
        position: 'absolute',
        bottom: 0,
        fontSize: 30,
    }
})