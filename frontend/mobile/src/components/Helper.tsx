import { iResponse, iNote } from "./Interfaces";
import { View, Text } from "react-native";

const serverURL = 'http://192.168.1.9:3000'

interface iResponseProps {
    response: iResponse
}

//TODO  BACKEND DA SE SREDAT RESPONSES

export function Response({response}: iResponseProps) {

    //HANDLE RESPONSE LOGIC

    return (
        <View>
            <Text>{response.result ? response.successMessage : response.errorMessage}</Text> 
        </View>
    )

}

export function getTasks(date: string, setResponse: Function, setNotes: Function) {
    fetch(`${serverURL}/tasks?date=${date}`)
        .then(res => {
            if (res.ok) return res.json()
            console.error(res.json())
            return setResponse(res.json().then(data => {
                return data.errorMessage
            }))
        })
        .then((data: iResponse) => {
            setNotes(data.task.result)
            setResponse(data.successMessage)
        })
        .catch((err: Error) => {
            console.error(err)
            setResponse(err.message)
        })
}

export function postTask(note: iNote, setResponse: Function) {
    fetch(`${serverURL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
    .then(res => {
        if (res.ok) return res.json()
        console.error(res.json())
        return setResponse(res.json().then(data => {
            return data.errorMessage
        }))
    })
    .then((data: iResponse) => {
        setResponse(data.successMessage)
    })
    .catch((err: Error) => {
        console.error(err)
        setResponse(err.message)
    })
}

export function updateTask(id: number, note: iNote, setResponse: Function) {

}

export function deleteTask(id: number) {

}