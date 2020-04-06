import React from 'react';
import { View, Image, Text } from 'react-native';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {

    return (

        <View style = { styles.container }>
            <View style = { styles.header }>
                <Image source = { logoImg } />
                <Text style = { styles.headerText }>
                    Total of <Text sytle = { styles.headerTextBold }>0 incidents</Text>.
                </Text>
            </View>

            <Text style = { styles.title }>Welcome!</Text>
            <Text style = { styles.description }>Choose one of the incidents below and save the day.</Text>
        </View>


    );
}