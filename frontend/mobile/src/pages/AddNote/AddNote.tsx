import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { iNote } from "../../components/Interfaces";
import { postTask } from "../../components/Helper";

interface iAddNote {
    setResponse: Function
    date: Date
}

export default function AddNote({setResponse, date}: iAddNote) {
    const [note, setNote] = useState<iNote>({
        name: "",
        description: "",
        date: ""
    })

    useEffect(() => {
        setNote({...note, date: date.toISOString().split("T")[0]})
    }, [date])

    return (
        <View>
            <Text>Add ToDo Form</Text>
            <TextInput style={{ backgroundColor: 'white', color: 'black' }} value={note.name} onChangeText={(e) => setNote({ ...note, name: e })}></TextInput>
            <TextInput style={{ backgroundColor: 'orange', color: 'black' }} value={note.description} onChangeText={(e) => setNote({ ...note, description: e })}></TextInput>
            <Button title='Add Task' onPress={() => postTask(note, setResponse)}></Button>
        </View>
    )
}