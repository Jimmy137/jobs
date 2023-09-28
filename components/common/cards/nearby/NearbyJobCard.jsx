import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from './nearbyjobcard.style'
import { checkImageURL } from '../../../../utils/checkImage'
import { images } from '../../../../constants'

const NearbyJobCard = ({item, handlePress}) => {
  return (
    <TouchableOpacity style= {styles.container} onPress={handlePress}>
        <TouchableOpacity style={styles.logoContainer}>
        
            {checkImageURL(item.employer_logo) ?
              <Image source = {{uri : item.employer_logo}} style={styles.logoImage} resizeMode = 'contain'  />
              :
              <Image source = {images.company} style={styles.logoImage} resizeMode = 'contain'  />
            }
        </TouchableOpacity>

        <View style={styles.textContainer}>
            <Text style={styles.jobName} numberOfLines={1}>{item.job_title}</Text>
            <Text style={styles.jobType} numberOfLines={1}>{item.job_employment_type}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard