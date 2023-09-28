import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './company.style'
import { icons, images } from '../../../constants'
import { checkImageURL } from '../../../utils/checkImage'

const Company = ({logo, jobTitle, companyName, location}) => {

    return (
        <View style={styles.container}>
            <View style={styles.logoBox}>
                {checkImageURL(logo) ?
                    <Image source = {{uri : logo}} style={styles.logoImage}/>
                    :
                    <Image source = {images.company} style={styles.logoImage}/>
                }
            </View>

            <View style={styles.jobTitleBox}>
                <Text style={styles.jobTitle}>{jobTitle}</Text>
            </View>

            <View style={styles.companyInfoBox}>
                <Text style={styles.companyName}>{companyName}  </Text>
                <View style={styles.locationBox}>
                    <Image 
                        source = {icons.location}
                        resizeMode='contain'
                        style= {styles.locationImage}
                    />
                    <Text style={styles.locationName}>{location}</Text>
                </View>

            </View>
        </View>
    )
}

export default Company