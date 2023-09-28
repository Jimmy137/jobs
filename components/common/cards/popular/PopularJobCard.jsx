import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from './popularjobcard.style'
import { checkImageURL } from '../../../../utils/checkImage'

const PopularJobCard = ({item, selectedJob, handlePress}) => {
  return (
    <TouchableOpacity 
      style= {styles.container(selectedJob, item)}
      onPress={() => handlePress(item.job_id)}
    >
        <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
            <Image
              source = {{uri: checkImageURL(item.employer_logo) ? 
                item.employer_logo
              :
                'https://toppng.com/uploads/preview/icon-enterprise-company-name-ico-11563503074ctayiq52av.png'    
            }}
              resizeMode = 'contain'
              style={styles.logoImage}
            />
        </TouchableOpacity>

        <Text style={styles.companyName}>{item.employer_name}</Text>

        <View style={styles.infoContainer}>
            <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>{item.job_title}</Text>
            <Text style={styles.location} numberOfLines={1}>{item.job_country}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default PopularJobCard