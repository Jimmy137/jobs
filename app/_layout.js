import {Stack} from 'expo-router'
import { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()


const Layout = () => {
    const [fonts] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    })

    const onLayout = useCallback(async ()=> {
        if (fonts) await SplashScreen.hideAsync()
    }, [fonts])

    if (!fonts) return null;
    return <Stack onLayout={onLayout}/>
}

export default Layout