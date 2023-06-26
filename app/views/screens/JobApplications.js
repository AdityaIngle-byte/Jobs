import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BaseView from '../hoc/BaseView'
import { colors } from '../../values/colors'
import JobApplicationCardView from '../items/JobApplicationCardView'
import { fetchJobApplications } from '../../redux/actions/jobActions'
import { showAlert } from '../../utils/Message'
import NoDataView from '../components/NoDataView'
import TagButton from '../components/TagButton'

export default function JobApplications(props) {

    const [jobList, setJobList] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const baseViewRef = useRef(null);

    useEffect(() => {
        _fetchJobApplications();
    }, [])

    const _fetchJobApplications = () => {
        setIsRefreshing(true);
        fetchJobApplications()
            .then((response) => {
                setIsRefreshing(false);
                const jobApplications = response.value;
                setJobList(jobApplications);
            })
            .catch((error) => {
                setIsRefreshing(false);
            })
    }

    const _jobFullView = (item) => {
        props.navigation.navigate('JobDescription', { path: 'JobApplications', item: item })
    }

    const _renderJobApplications = ({ item, index }) => {
        return (
            <JobApplicationCardView
                jobApplication
                item={item}
                index={index}
                onPressItem={() => _jobFullView(item)}
            />
        )
    }

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            statusBarColor={colors.black}
            hasHeader headerParentStyle={{ backgroundColor: colors.white }}
            hasTitle headerTitle={'Job Applications'}
            hasHigh5Logo
            hasMenuView
            {...props}
        >
            <View style={styles.parent}>
                {
                    jobList.length > 0 ?
                        <FlatList
                            data={jobList}
                            renderItem={_renderJobApplications}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isRefreshing}
                                    onRefresh={_fetchJobApplications}
                                />
                            }
                            showsVerticalScrollIndicator={false}
                        />
                        :
                        <View style={styles.noDataContainer}>
                            <NoDataView
                                hasImage
                                msg={'There are no matching jobs at this time. Would you like to view all available jobs ?'}
                                parentStyle={{ marginTop: 20 }}
                            />
                            <TagButton
                                title={'Go to career page'}
                                onPress={() => props.navigation.navigate('CareerPage', { path: 'JobApplications', data: profilePersonalInfo })}
                                buttonStyle={{ backgroundColor: colors.acceptBtn, borderColor: colors.acceptBtn }}
                                titleStyle={{ color: '#fff', fontSize: 14, padding: 10 }}
                                size={'large'}
                                containerStyle={{ borderRadius: 10 }}
                                parentStyle={{ marginRight: 0, padding: 10, margin: 10 }}
                            />
                        </View>
                }
            </View>
        </BaseView>
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})