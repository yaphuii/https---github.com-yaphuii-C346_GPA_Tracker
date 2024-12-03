// components/Add.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Add = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [credits, setCredits] = useState('');

    const handleAddCourse = () => {
        if (name && grade && credits) {
            // Add the course to the list
            route.params.addCourse({ name, grade, credits: parseInt(credits) });
            navigation.goBack();
        } else {
            Alert.alert('Error', 'Please fill in all fields.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Icon name="plus" size={30} color="black" />
                <Text style={styles.header}>Add New Course</Text>
            </View>

            <View style={styles.form}>
                {/* Course Name Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Course Name"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {/* Grade Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Grade (A, B+, etc.)"
                        value={grade}
                        onChangeText={setGrade}
                    />
                </View>

                {/* Credits Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Credits"
                        value={credits}
                        onChangeText={setCredits}
                        keyboardType="numeric"
                    />
                </View>

                {/* Add Course Button */}
                <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
                    <Text style={styles.addButtonText}>Add Course</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: 'whitesmoke',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'slateblue',
        textAlign: 'center',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        height: 50,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: 'white',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: 'tomato',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Add;
