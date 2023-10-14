import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Button, GestureResponderEvent, Image, StyleSheet, Text, View} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Question 1" component={IceCreamQ1}/>
                <Stack.Screen name="Question 2" component={DisneyQ2}/>
                <Stack.Screen name="Question 3" component={SportQ3}/>
                <Stack.Screen name="End" component={EndGame}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// @ts-ignore
function HomeScreen({navigation}) {
    function onPressStartGame(event: GestureResponderEvent): void {
        console.log('Printing')
        navigation.navigate('Question 1')
    }

    return (
        <View style={styles.container}>
            <Text style={tw`text-3xl`}>
                Welcome to my quiz!</Text>
            <Button
                onPress={onPressStartGame}
                title="Start game"
                color="#841584"
            />
            <StatusBar style="auto"/>
        </View>
    );
}

// @ts-ignore
function IceCreamQ1({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={tw`text-3xl`}>
                Of the following, which is your favorite ice-cream flavor?</Text>

            <Button title="Chocolate" color="#841584"
                    onPress={e => {
                        navigation.navigate('Question 2', {answers: ['Chocolate']})
                    }}/>
            <Button title="Vanilla" color="#841584"
                    onPress={e => {
                        navigation.navigate('Question 2', {answers: ['Vanilla']})
                    }}/>
            <Button title="Strawberry" color="#841584"
                    onPress={e => {
                        navigation.navigate('Question 2', {answers: ['Strawberry']})
                    }}/>
            <StatusBar style="auto"/>
        </View>
    );
}

function DisneyQ2({route, navigation}: { route: any, navigation: any }) {
    // Depending on their answer, choose a color for the buttons
    let color = '#949494';
    let iceCreamChoice = route.params.answers[0];
    let answers: string[] = route.params.answers;
    switch (iceCreamChoice) {
        case 'Chocolate': {
            color = "#843815"
            break;
        }
        case 'Vanilla': {
            color = "#da9c4d"
            break;
        }
        case 'Strawberry': {
            color = "#ef9fdd"
            break;
        }
    }
    return (
        <View style={styles.container}>
            <Text style={tw`text-3xl`}>
                Of the following, who is your favorite Disney Princess?</Text>

            <Button title="Merida" color={color}
                    onPress={e => {
                        answers[1] = 'Merida'
                        navigation.navigate('Question 3', {answers: answers, color: color})
                    }}/>
            <Button title="Elsa" color={color}
                    onPress={e => {
                        answers[1] = 'Elsa'
                        navigation.navigate('Question 3', {answers: answers, color: color})
                    }}/>
            <Button title="Mulan" color={color}
                    onPress={e => {
                        answers[1] = 'Mulan'
                        navigation.navigate('Question 3', {answers: answers, color: color})
                    }}/>
            <StatusBar style="auto"/>
        </View>
    );
}

function SportQ3({route, navigation}: { route: any, navigation: any }) {

    let color = route.params.color;
    let disneyChoice = route.params.answers[1];
    let imagePath;
    switch (disneyChoice) {
        case 'Merida': {
            imagePath = require('./assets/princesses/Merida.png')
            break;
        }
        case 'Elsa': {
            imagePath = require('./assets/princesses/Elsa.png')
            break;
        }
        case 'Mulan': {
            imagePath = require('./assets/princesses/Mulan.png')
            break;
        }
    }

    let answers: string[] = route.params.answers;

    return (
        <View style={styles.container}>
            <Text style={tw`text-3xl`}>
                Of the following, what is the best sport?</Text>

            <Button title="Running" color={color}
                    onPress={e => {
                        answers[2] = 'Running'
                        navigation.navigate("End", {answers: answers})
                    }}/>
            <Button title="Biking" color={color}
                    onPress={e => {
                        answers[2] = 'Biking'
                        navigation.navigate("End", {answers: answers})
                    }}/>
            <Button title="Swimming" color={color}
                    onPress={e => {
                        answers[2] = 'Swimming'
                        navigation.navigate("End", {answers: answers})
                    }}/>

            <Image source={imagePath} style={styles.images}/>

            <StatusBar style="auto"/>
        </View>
    );
}

function EndGame({route, navigation}: { route: any, navigation: any }) {
    let hasWon = false;

    let iceCreamChoice = route.params.answers[0];
    let disneyChoice = route.params.answers[1];
    let sportChoice = route.params.answers[2];
    
    console.log(iceCreamChoice, disneyChoice, sportChoice)

    if (iceCreamChoice == 'Chocolate' && disneyChoice == 'Elsa' && sportChoice == 'Biking') {
        hasWon = true
    }
    
    if (hasWon) {
        return (
            <View style={styles.container}>
                <Text>You win!!!!!!!!!!</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text>You lose.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    images: {
        width: 100,
        height: 200,
    }
});
