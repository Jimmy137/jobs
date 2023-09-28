import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import { SIZES } from '../../../constants'
import styles from './tabs.style'

const Tab = ({name, activeTab, handlePress}) => {
  return (
    <TouchableOpacity 
      style={styles.btn(name, activeTab)}
      onPress={handlePress}
    >
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  )
}

const Tabs = ({tabs, activeTab, setActiveTab}) => {
  return (
    <View style={styles.container}>
      <FlatList 
        data={tabs}
        renderItem={({item}) => (
          <Tab 
            name={item}
            activeTab={activeTab}
            handlePress={() => setActiveTab(item)}
          />
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator = {false}
        contentContainerStyle = {{columnGap: SIZES.small / 2, justifyContent:'space-between'}}
        horizontal

      />
    </View>
  )
}

export default Tabs