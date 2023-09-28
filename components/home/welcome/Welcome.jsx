import {useState} from 'react'
import { useRouter } from 'expo-router'
import { View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'

import styles from './welcome.style'
import { icons, COLORS } from '../../../constants'

const Type = ({title, router, active, setActive})=> {
    return (
        <TouchableOpacity 
            style={styles.tab(active, title)}
            onPress={()=>{
                setActive(title)
                router.push(`/search/${title}`)
            }}
        >

            <Text style={styles.tabText(active, title)}>{title}</Text>
        </TouchableOpacity>
    )
}

const Welcome = ({name}) => {
    const router = useRouter()

    const [query, setQuery] = useState('')
    const [activeType, setActiveType] = useState('Full-time')
    const types = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"]

    const handlePress = ()=> {
        if (query) {
            router.push(`/search/${query}`)
        }
    }

  return (
    <View>
        <View style={styles.container}>
            <Text style={styles.userName}>Hello, {name}!</Text>
            <Text style={styles.welcomeMessage}>Find your dream job</Text>
        </View>

        <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
                <TextInput 
                    style={styles.searchInput}
                    selectionColor = {COLORS.tertiary}
                    value={query}
                    onChangeText={(t) => setQuery(t)}
                    placeholder='What are you looking for?'
                />
            </View>

                <TouchableOpacity 
                    style={styles.searchBtn}
                    onPress={handlePress}
                >
                    <Image 
                        source={icons.search}
                        resizeMode='contain'
                        style={styles.searchBtnImage}
                    ></Image>
                </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}> 
            <FlatList 
                data= {types}
                renderItem={({item}) => <Type 
                        title={item} 
                        router={router} 
                        active={activeType} 
                        setActive={setActiveType} 
                />}
                keyExtractor={(item)=> item}
                horizontal
                showsHorizontalScrollIndicator = {false}
            ></FlatList>
        </View>
        
    </View>
  )
}

export default Welcome