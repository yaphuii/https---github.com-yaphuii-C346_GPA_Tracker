import React, { useState } from 'react';
import { View, FlatList, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({ navigation }) => {
    const [courses, setCourses] = useState([
        { id: '1', name: 'Immersive Technology', grade: 'C', credits: 2 },
        { id: '2', name: 'Fundamentals of Design', grade: 'B', credits: 3 },
        { id: '3', name: 'Mobile App Development', grade: 'C', credits: 2 },
    ]);

    // Function to add a new course with a unique ID
    const addCourse = (newCourse) => {
        const uniqueId = Date.now().toString(); // Generate unique ID based on timestamp
        setCourses((prevCourses) => [
            ...prevCourses,
            { id: uniqueId, ...newCourse },
        ]);
    };

    // Function to edit an existing course
    const editCourse = (updatedCourse) => {
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.id === updatedCourse.id ? updatedCourse : course
            )
        );
    };

    // Function to delete a course by its ID
    const deleteCourse = (id) => {
        setCourses((prevCourses) => prevCourses.filter(course => course.id !== id));
    };

    // Function to calculate GPA
    const calculateGPA = () => {
        let totalPoints = 0;
        let totalCredits = 0;

        // Convert grades to numeric values for GPA calculation
        const gradeToPoints = {
            'A': 4.0, 'B+': 3.3, 'B': 3.0, 'C+': 2.3, 'C': 2.0, 'D': 1.0, 'F': 0.0,
        };

        // Calculate total points and credits
        courses.forEach(course => {
            const gradePoint = gradeToPoints[course.grade] || 0;
            totalPoints += gradePoint * course.credits;
            totalCredits += course.credits;
        });

        const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;

        Alert.alert('Your GPA is:', gpa);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Icon name="calculator" size={30} color="black" />
                <Text style={styles.header}>My GPA Tracker</Text>
            </View>

            <FlatList
                data={courses}
                keyExtractor={(item) => item.id}  // Use the unique ID for FlatList keys
                renderItem={({ item }) => (
                    <View style={styles.courseCard}>
                        <Text style={styles.courseText}>
                            {item.name} - {item.grade} ({item.credits} credits)
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => navigation.navigate('Edit', {
                                    course: item,
                                    editCourse,
                                    deleteCourse
                                })}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => {
                                    Alert.alert(
                                        'Delete Course',
                                        'Are you sure you want to delete this course?',
                                        [
                                            { text: 'Cancel', style: 'cancel' },
                                            { text: 'Delete', onPress: () => deleteCourse(item.id) },
                                        ]
                                    );
                                }}
                            >
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('Add', { addCourse })}
            >
                <Text style={styles.buttonText}>+ Add Course</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.gpaButton}
                onPress={calculateGPA}
            >
                <Text style={styles.buttonText}>Calculate GPA</Text>
            </TouchableOpacity>
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
        color: 'indianred',
        textAlign: 'center',
    },
    courseCard: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    courseText: {
        fontSize: 18,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    editButton: {
        backgroundColor: 'seagreen',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: 'tomato',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
    },
    addButton: {
        backgroundColor: 'slateblue',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    gpaButton: {
        backgroundColor: 'salmon',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Home;
