import {useState} from 'react'
import { View, Text, Image, TouchableOpacity, TouchableHighlight, Linking } from 'react-native'

import styles from './footer.style'
import { icons } from '../../../constants'

const Footer = ({url}) => {
  const [isFavourite, setIsFavourite] = useState(false)
  return (
    <View style={styles.container}> 
      <TouchableHighlight 
        style={styles.likeBtn}
        onPress={()=> setIsFavourite(!isFavourite)}
      >
        <Image 
          source={ !isFavourite? icons.heartOutline: icons.heart}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />
      </TouchableHighlight>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={()=> Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer