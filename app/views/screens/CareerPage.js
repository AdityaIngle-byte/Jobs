import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchView from '../items/SearchView'
import BaseView from '../hoc/BaseView'
import { colors } from '../../values/colors'
import TalentCommunityCard from '../items/TalentCommunityCard'
import { getJobs } from '../../redux/actions/careerActions'
import SearchBar from '../components/SearchBar'
import NoJobsAvailable from '../items/NoJobsAvailable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Footer from '../items/Footer'
import { getJobsForCandidate } from '../../redux/actions/jobActions'
import { showAlert } from '../../utils/Message'
import { _checkIsLoggedIn } from '../../../common'
import { useRoute } from '@react-navigation/native'

export default function CareerPage(props) {

  const params = props?.route?.params || {};
  const id = params?.tenant;
  const route = params?.path;
  const data = params?.data;

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [session, setSession] = useState(false);

  useEffect(() => {
    init();
  }, [])

  const init = () => {
    if (route != undefined) {
      switch (route) {
        case "JobsForYou":
        case "JobApplications":
          _getJobsForCandidate();
          break;
        case 'Other':
          getJobs(id ? id : 1)
            .then((response) => {
              setMasterDataSource(response.reverse());
              setFilteredDataSource(response.reverse());
            })
            .catch((error) => {
              console.log(error);
            })
          break;
        default:
          break;
      }
    }

    _checkIsLoggedIn()
      .then((response) => {
        response != null ? setSession(true) : setSession(false);
      })
      .catch((error) => {
        console.log('Login response');
        console.log(error);
      })
  }


  const _getJobsForCandidate = () => {
    const email = data.email;
    getJobsForCandidate(email)
      .then((response) => {
        console.log('[path:Career Page, API : Jobs For Candidate]');
        console.log(response);
        setMasterDataSource(response);
        setFilteredDataSource(response);
      })
      .catch((error) => {
        console.log('[path:Career Page, API : Jobs For Candidate]');
        console.log(error);
        showAlert('error', 'Something went wrong');
      })
  }
  const noJobsView = (msg) => {
    return (
      <NoJobsAvailable
        hasImage
        msg={msg}
        hasTryAgain
        onTryAgain={() => _onUpdateIndex(selectedIndex)}
        imageStyle={{ height: 200, width: 200 }}
      />
    )
  }

  return (
    <BaseView
      hasStatusBar
      statusBarColor={colors.black}
      hasHigh5Logo
      hasHeader headerParentStyle={{ backgroundColor: colors.white }}
      hasTitle headerTitle={'Job Search'}
      hasLogin={!session}
      onLogin={() => props.navigation.navigate('Login')}
      route={useRoute()}
    >
      {/* <KeyboardAwareScrollView> */}
      <ScrollView contentContainerStyle={{ flex: 1 }}>

        <SearchBar
          search={search}
          setSearch={setSearch}
          filteredDataSource={filteredDataSource}
          setFilteredDataSource={setFilteredDataSource}
          masterDataSource={masterDataSource}
        />

        {/* <View style={styles.noJobsViewStyle}>
            {noJobsView('No Jobs Available')}
          </View> */}
        <View style={{ flex: 1, marginVertical: 10 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SearchView
              onPress={(item) => props.navigation.navigate('JobDescription', { path: 'CareerPage', item: item })}
              search={search}
              setSearch={setSearch}
              filteredDataSource={filteredDataSource}
              setFilteredDataSource={setFilteredDataSource}
              masterDataSource={masterDataSource}
              setMasterDataSource={setMasterDataSource}
            />
            <TalentCommunityCard onJoin={() => props.navigation.navigate('Login')} {...props} />
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Footer privacyTextVisible />
        </View>
      </ScrollView>
      {/* </KeyboardAwareScrollView> */}
    </BaseView>
  )
}

const styles = StyleSheet.create({
  noJobsViewStyle: {
    height: 400,
    justifyContent: "center"
  },
  footer: {
    alignSelf: "center",
    paddingBottom: 10,
  }
})

{/* <View style={{borderWidth:5,flex:1,borderColor:"red",justifyContent:"flex-end",alignItems:"center"}}>
<Text>dfgdfg</Text>
</View> */}