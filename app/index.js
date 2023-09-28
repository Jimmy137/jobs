import { useState } from "react";
import { Text, View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, SIZES, icons, images } from "../constants";
import { Nearbyjobs, Popularjobs, Welcome, ScreenHeaderBtn } from "../components";

const Home = ()=> {
    const router = useRouter()
    return (
        <SafeAreaView style = {{
            flex: 1,
            backgroundColor: COLORS.lightWhite
          }}>
            <Stack.Screen 
                options={{
                    headerStyle : {backgroundColor: COLORS.lightWhite, justifyContent: 'space-between'},
                    headerShadowVisible: true,
                    headerRight: () =>  <ScreenHeaderBtn iconUrl = {images.profile} dimension= "100%"/>,
                    headerLeft: () =>  <ScreenHeaderBtn iconUrl = {icons.menu} dimension= "60%"/>,
                    headerTitle: ""
                }}
            />
                <ScrollView showsVerticalScrollIndicator= {false}>
                    <View style = {{flex: 1, padding: SIZES.medium}}>
                        <Welcome name="Jimmy"/>
                        <Popularjobs/>
                        <Nearbyjobs/>
                    </View>
                    
                </ScrollView>
                

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: COLORS.lightWhite
    },
    text: {
      fontSize: 25,
      fontWeight: '500',
      color: 'red'
    },
  });
export default Home