import React, { useState } from 'react'
import axios from 'axios'
import { Text, View, StyleSheet, Button, TextInput, ImageBackground, Image } from 'react-native';

const weatherAPI = () => {

    const [ciudad, setCity] = useState('')
    const [pais, setCountry] = useState('')
    const [temp, setTemp] = useState('')
    const [horaActual, setDateTime] = useState('')
    const [description, setDescription] = useState('')
    const [iconResponse, setIcon] = useState('https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png')
    
    const nubSol = '../resources/images/nublado-sol.jpg'
    var imageBack = require(nubSol)
    
    return (
        <View style={styles.container}>
            <ImageBackground source={imageBack} resizeMode='cover' style={styles.image}>
                <View style={styles.headder}>
                    <TextInput
                        style={styles.input}
                        placeholder='City name: '
                        placeholderTextColor='#D3D3D3'
                        onChangeText={(val) => setCity(val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Country name: '
                        placeholderTextColor='#D3D3D3'
                        onChangeText={(val) => setCountry(val)}
                    />
                    <Button
                        color='#0057FF'
                        title="Consult"
                        onPress={() => { // Función para consultar clima por medio de las entradas ciudad - país
                            axios.get('http://api.weatherstack.com/current?access_key=' + '22b3fac6a902c97871daca23326fae5a' + '&query=' + ciudad + ',' + pais)
                                .then(response => {
                                    const apiResponse = response.data
                                    console.log(apiResponse)
                                    setIcon(apiResponse.current.weather_icons[0])
                                    setTemp(apiResponse.current.temperature + "°C")
                                    setDateTime(apiResponse.location.localtime)
                                    setDescription(apiResponse.current.weather_descriptions)
                                }).catch(error => {
                                    console.log(error);
                                });
                        }}
                    />
                </View>
                <View style={styles.body}>
                    <Text style={styles.cityName}>{pais}</Text>
                    <Text style={styles.cityName}>{ciudad}</Text>
                    <Text style={styles.cityTemp}>{temp}
                    </Text>
                    <Text style={styles.dateTime}>{horaActual}</Text>
                    <Text style={styles.dateTime}>{description}</Text>
                </View>
            </ImageBackground>
            <Text style={styles.footer}>
                Jesús Isaac Gallegos Esquivel
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        margin: 0,
        alignItems: 'center',
        flex: 1
    },
    image: {
        flex: 1,
        width: '100%',
    },
    headder: {
        backgroundColor: '#004459',
        textAlign: 'center',
        padding: 10,
        width: '100%'
    },
    input: {
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: '#fff',
        borderRadius: 5,
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        padding: 10,
        marginBottom: 10
    },
    cityName: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    cityTemp: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 45,
        marginTop: 50,
        marginBottom: 80,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.68)',
        padding: 5
    },
    dateTime: {
        textAlign: 'center',
        fontSize: 26,
        color: '#fff',
    },
    body: {
        backgroundColor: 'rgba(0, 0, 0, 0.493)',
        flex: 1
    },
    footer: {
        backgroundColor: '#0057FF',
        color: '#fff',
        padding: 5,
        textAlign: 'center',
        width: '100%',
        borderTopColor: '#fff',
        borderTopWidth: 2,
        fontSize: 17,
        fontWeight: 'bold'
    }
});

export default weatherAPI;
