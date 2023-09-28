import { useRouter} from 'expo-router'
import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import * as Location from 'expo-location'

import { COLORS } from '../../../constants'
import  NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import styles from './nearbyjobs.style'

import useFetch from '../../../hooks/useFetch'


const Nearbyjobs = () => {
    const router = useRouter()
    const [location, setLocation] = useState({country:'Egypt'});
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
        
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            let [lat, long] = [loc.coords.latitude, loc.coords.longitude]
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`;

            fetch(url)
            .then(res=>res.json())
            .then(data=>setLocation(data.address))
            
        })();
    }, []);

    

    const {data, isLoading, error} = useFetch('search', {
        query : `Developer in ${location.country}`,
        num_pages: 1
    })    
  
    return (
        <View style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nearby jobs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                { isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
                 ): error ? (
                    <Text>Something went wrong</Text>
                 ): errorMsg ?(
                    <Text>{errorMsg}</Text>
                 )
                 : (
                 data?.map((item)=>(
                    <NearbyJobCard 
                      item={item} 
                      handlePress={()=> router.push(`/job-details/${item.job_id}`)}
                      key={`near-by-${item.job_id}`}
                    />
                 ))
                 )
                }
            </View>
        </View>
  )
}

export default Nearbyjobs