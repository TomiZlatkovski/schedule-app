import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { iNote } from '../../components/Interfaces'
import { useState } from 'react'

interface iHomeProps {
    notes: iNote[]
    styles: Object
}

export default function Home({notes, styles}: iHomeProps) {

    return (
        <View style={styles.notes}>
            {notes && notes.length > 0 ? (notes.map((note: iNote) => (
                <View key={note.id} style={styles.note} onTouchStart={() => console.log(note)}>
                    <View style={styles.titleDueTimeWrapper}>
                        <Text style={styles.noteText}>{note.name}</Text>
                        <Text style={styles.noteText}>{note.time}</Text>
                    </View>
                    <Text style={styles.noteDescription}>{note.description}</Text>
                </View>
            ))) : (
                <Text>No notes for current day!</Text>
            )}
        </View>
    )
}