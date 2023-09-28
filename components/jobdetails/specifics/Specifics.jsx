import React from 'react'
import { View, Text } from 'react-native'

import styles from './specifics.style'

const Specifics = ({title, data}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}:</Text>

            <View style={styles.pointsContainer} >
                {data.map((item, idx) => (
                    <View style={styles.pointWrapper} key={idx + item}>
                        <Text style={styles.pointDot}></Text>
                        <Text style={styles.pointText}>{item}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default Specifics