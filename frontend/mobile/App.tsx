import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useEffect } from 'react'

interface iTodo {
    name: string
    description: string
    date: string
}

export default function App(): JSX.Element {
    //TODO  DA SE UREDAT REQUESTSOT I UIOT
    //TODO  MYB STYLES U DRUG FAJL?
    //TODO  INTERFACE DA SE SUREDI

    const [todo, setTodo] = useState<iTodo[]>([])
    const [payload, setPayload] = useState<iTodo>({
        name: "",
        description: "",
        date: ""
    })
    const [reload, setReload] = useState<boolean>(false)
    const [serverResponse, setServerResponse] = useState<string | null>(null)

    useEffect(() => {
        fetch(`http://192.168.1.9:3000/tasks?date=2023-10-13`)
        .then(res => res.json())
        .then(data => {
            setTodo(data.task.result)
            return console.log(data.task.result)
        })
        .catch(err => console.error(err))
    }, [reload])

    console.log(todo[0])

    return (
        <View style={styles.mainViewStyle}>
            <Text style={styles.textStyle}>Scheduler App!</Text>
            {todo.map(object => (
                <View style={styles.note} onTouchStart={() => console.log(object)}>
                    <View style={styles.titleDueTimeWrapper}>
                        <Text style={styles.noteText}>{object.name}</Text>
                        <Text style={styles.noteText}>{object.date}</Text>
                    </View>
                    <Text style={styles.noteDescription}>{object.description}</Text>
                </View>
            ))}
                <View>
                    <Text>Add ToDo Form</Text>
                <TextInput style={{ backgroundColor: 'white', color: 'black' }} value={payload.name} onChangeText={(e) => setPayload({...payload, name: e})}></TextInput>
                <TextInput style={{ backgroundColor: 'orange', color: 'black' }} value={payload.description} onChangeText={(e) => setPayload({ ...payload, description: e })}></TextInput>
                <TextInput style={{ backgroundColor: 'red', color: 'black' }} value={payload.date} onChangeText={(e) => setPayload({ ...payload, date: e })}></TextInput>
                <Button title='FETCH' onPress={() => {
                    fetch(`http://192.168.1.9:3000/tasks`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    })
                        .then(res => res.json())
                        .then(data => {
                            setServerResponse(data.successMessage)
                        })
                        .catch(err => console.error(err))
                }}></Button>
                <Button title='reload' onPress={() => setReload(!reload)}></Button>
                {serverResponse && <Text>{serverResponse}</Text>}
                </View>
        </View>
    );
}


//STYLES
const styles = StyleSheet.create({
    mainViewStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
    },
    textStyle: {
        fontSize: 50,
        position: 'absolute',
        top: 0
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
    }
})
