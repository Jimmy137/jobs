import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, RefreshControl, Share } from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from '../../hooks/useFetch'

const JobDetails = ()=> {
    const params = useLocalSearchParams()
    const router = useRouter()
    const [refreshing, setRefreshing] = useState(false)

    const {data, isLoading, error, refresh } = useFetch('job-details', {
        job_id : params.id
    })

    const tabs = ['About', 'Qualifications', 'Responsibilities']
    const [activeTab, setActiveTab] = useState(tabs[0])

    const shareData = async () => {
        try {
            await Share.share({
                message:  data[0].job_apply_link,
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refresh()
        setRefreshing(false)
      }, []);

    
    const displayContent = () => {
        switch (activeTab) {
            case "About":
                return <JobAbout 
                    info={data[0].job_description ?? "No description provided"}
                />
            case "Qualifications":
                return <Specifics 
                    title="Qualifications"
                    data={data[0].job_highlights?.Qualifications ?? ['N/A']}
                />
            case "Responsibilities":
                return <Specifics 
                    title="Responsibilities"
                    data={data[0].job_highlights?.Responsibilities ?? ['N/A']}
                />
        }
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite},
                    headerTitle:'',
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress = {()=> router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.share}
                            dimension="60%"
                            handlePress={shareData}
                        />
                    )
                }}

            />
            <>
            <ScrollView 
                showsVerticalScrollIndicator= {false} 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
            >
                {isLoading ? 
                    <ActivityIndicator size="large" color={COLORS.primary}/>
                    :
                    error ?
                    <Text>Something went wrong</Text>
                    :
                    data.length === 0 ? 
                    <Text>Sorry, no data</Text>
                    :
                    <View style={{padding: SIZES.small, paddingBottom: 100}}>
                        <Company 
                            logo = {data[0].employer_logo}
                            jobTitle = {data[0].job_title}
                            companyName = {data[0].employer_name}
                            loacation = {data[0].job_country}
                        />

                        <JobTabs 
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        {displayContent()}
                    </View>
                    
                }
            </ScrollView>

            { data[0] ? <JobFooter url={data[0].job_apply_link}/> 
            : ''}
            </>

        </SafeAreaView>
    )
}

export default JobDetails