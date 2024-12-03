// components/Edit.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Edit = ({ navigation, route }) => {
    const { course, editCourse, deleteCourse } = route.params;
    const [name, setName] = useState(course.name);
    const [grade, setGrade] = useState(course.grade);
    const [credits, setCredits] = useState(course.credits.toString());

    // Function to handle editing the course
    const handleEditCourse = () => {
        if (name && grade && credits) {
            // Pass the updated course info back to Home
            editCourse({ id: course.id, name, grade, credits: parseInt(credits) });
            navigation.goBack();
        } else {
            Alert.alert('Error', 'Please fill in all fields.');
        }
    };

    // Function to handle deleting the course
    const handleDeleteCourse = () => {
        Alert.alert(
            'Delete Course',
            'Are you sure you want to delete this course?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        deleteCourse(course.id);
                        navigation.goBack();
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Icon name="wrench" size={30} color="black" />
                <Text style={styles.header}>Edit Course</Text>
            </View>

            {/* Form to Edit Course Details */}
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

                {/* Save Changes Button */}
                <TouchableOpacity style={styles.saveButton} onPress={handleEditCourse}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>

                {/* Delete Course Button */}
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteCourse}>
                    <Text style={styles.deleteButtonText}>Delete Course</Text>
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
        justifyContent: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'seagreen',
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
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: 'mediumseagreen',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: 'maroon',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Edit;
