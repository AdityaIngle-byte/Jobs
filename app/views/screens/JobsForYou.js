import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BaseView from '../hoc/BaseView'
import { colors } from '../../values/colors'
import JobApplicationCardView from '../items/JobApplicationCardView'
import { fetchJobApplications } from '../../redux/actions/jobActions'
import { showAlert } from '../../utils/Message'
import NoDataView from '../components/NoDataView'
import { Card } from 'react-native-elements';
import TagButton from '../components/TagButton'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { getAutomatchedJobs } from '../../redux/actions/jobActions'
import moment from 'moment'
import { Icon } from 'react-native-elements'

export default function JobsForYou(props) {

  const [jobList, setJobList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const baseViewRef = useRef(null);
  const profilePersonalInfo = useSelector(state => state.home.profilePersonalInfo);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      _getAutomatchedJobs();
    })
    return () => {
      unsubscribe();
    }
  }, [])

  const _getAutomatchedJobs = () => {
    setIsRefreshing(true);
    getAutomatchedJobs(profilePersonalInfo.email)
      .then((response) => {
        setIsRefreshing(false);
        if (response) {
          console.log("res.data", response.value);
          setJobList(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsRefreshing(false);
      })
  }

  // const _jobFullView = (item) => {
  //   props.navigation.replace('JobDescription', { item: item })
  // }


  const Item = props => {
    const { iconName, iconType, title } = props;
    return (
      <View style={[styles.itemRow, props.style]}>
        <Icon
          name={iconName}
          type={iconType}
          color={colors.defaultTextColor}
          size={14}
        />
        <Text
          style={[styles.text1, { paddingLeft: 4 }]}
          numberOfLines={1}
          ellipsizeMode='tail'
        >{title}</Text>
      </View>
    )
  }

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Card containerStyle={{ borderRadius: 6 }}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <View><Text style={{ fontWeight: "bold", color: colors.black, fontSize: 16 }}>{item.jobTitle}</Text></View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.row}>
                <Item
                  title={item.jobType[0]}
                  iconName='briefcase'
                  iconType='feather'
                />
              </View>
              <View style={styles.row}>
                <Item
                  title={item.workPlaceType ? item.workPlaceType : 'NA'}
                  iconName='map-pin'
                  iconType='feather'
                />
              </View>
            </View>
            <View style={[styles.row, { marginTop: -6 }]}>
              <Item
                title={moment(new Date(item.updatedDate), "MMDDYYYY").fromNow()}
                iconName='clock'
                iconType='feather'
              />
            </View>
          </View>
          <View style={{ alignItems: "flex-end", flex: 1, justifyContent: "center" }}>
            <TagButton
              title={'Apply Now'}
              onPress={() => props.onPress(item)}
              buttonStyle={{ backgroundColor: colors.newColor, borderColor: colors.newColor }}
              titleStyle={{ color: '#fff' }}
              size={'medium'}
              containerStyle={{ borderRadius: 3 }}
            />
          </View>
        </View>
      </Card>
    );
  };
  // const _renderJobApplications = ({ item, index }) => {
  //   return (
  //     <JobApplicationCardView
  //       item={item}
  //       index={index}
  //       onPressItem={() => _jobFullView(item)}
  //     />
  //   )
  // }
  // token github :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
  const data = [{
    "@search.score": 1,
    "jobId": "864982994",
    "jobTitle": "Software Engineer",
    "jobTenant": "Adobe",
    "jobType": "Contract",
    "isRemote": false,
    "prefferedStartDate": "2023-05-24T18:37:57.179Z",
    "positionCount": 1,
    "allowedSubmittals": 5,
    "annualSalary": "150",
    "activeFrom": "2023-03-24T18:37:57.180Z",
    "expiresOn": "2023-05-24T18:37:57.180Z",
    "placementFee": "200",
    "placementCurrency": "USD",
    "usePrefferedSupplier": null,
    "projectCompletionDate": null,
    "contractDurationMonths": "3",
    "contractDurationDays": "10",
    "hourlyRate": "",
    "projectBudjet": null,
    "referalBonus": "",
    "referalBonusCurrency": "USD",
    "submittal": "",
    "jobDescription": "<p>&nbsp;A product engineer is a professional who designs and implements automated systems and software solutions for various settings and industries.</p>",
    "primarySkills": [
      "Python",
      "Angular"
    ],
    "secondarySkills": [],
    "skillSet": [],
    "jobPostDate": "2023-03-29T09:54:47.213Z",
    "jobStatus": "active",
    "jobCreatedBy": "1622220316",
    "jobCreatedByName": "Jenus Burl",
    "isPublic": true,
    "isHotJob": false,
    "isFexible": true,
    "education": [
      "Bachelor's Degree"
    ],
    "certifications": [],
    "industries": [],
    "workStart": "",
    "workEnd": "",
    "travel": "",
    "drugTest": false,
    "backgroundCheck": false,
    "securityClearance": "",
    "domainName": "https://uat.high5hire.com",
    "recruiterId": null,
    "hiringManagerId": "",
    "tenantId": "1",
    "jobUpdatedTime": "2023-03-24T18:42:20.487Z",
    "favorites": null,
    "visaRequirement": "",
    "companyName": "",
    "companyJobId": "",
    "intakeId": null,
    "isFeePercentage": false,
    "experienceLevel": "1-3 years",
    "licenceRequirement": "",
    "notes": "",
    "minimumPay": "100",
    "maximumPay": "150",
    "additionalInfo": "[]",
    "QandA": "[{\"name\":\"Background Check\",\"question\":\"Are you willing to undergo a background check, in accordance with local law/regulations?\",\"isMandatory\":true}]",
    "workPlaceType": "Hybrid",
    "salaryType": "Per hour",
    "salaryCurrency": "USD",
    "documents": "[{\"documentName\":\"sample(3).pdf\",\"uploadedDate\":\"03/25/2023\",\"uploadedBy\":\"Jenus Burl\",\"category\":\"Job Description\",\"role\":\"HiringManager\",\"type\":\"JD\"},{\"documentName\":\"Job Description (1).docx\",\"uploadedDate\":\"03/28/2023\",\"uploadedBy\":\"Jenus Burl\",\"category\":\"Job Description\",\"role\":\"HiringManager\"},{\"documentName\":\"JobId_889205617.pdf\",\"uploadedDate\":\"03/28/2023\",\"uploadedBy\":\"Jenus Burl\",\"category\":\"Job Description\",\"role\":\"HiringManager\"},{\"documentName\":\"Eliminate suppliers.docx\",\"uploadedDate\":\"03/28/2023\",\"uploadedBy\":\"Jenus Burl\",\"category\":\"Job Description\",\"role\":\"HiringManager\"}]",
    "intakeDetails": null,
    "onsiteWorkDays": "3 days",
    "weightage": "{\"primarySkills\":[\"Python\",\"Angular\"],\"secondarySkills\":[],\"jobTitle\":false,\"location\":false,\"experienceLevel\":true,\"education\":[],\"industries\":[]}",
    "vettingRequired": true,
    "screeningRequired": true,
    "vettingDetails": null,
    "isPublished": "Yes",
    "jobTenantId": "1",
    "prevJobStatus": "pending",
    "isDisqualifiedMailSend": "No",
    "location": {
      "address": "Lubbock County, Texas, United States",
      "city": "Lubbock County",
      "state": "Texas",
      "zipcode": "79409",
      "country": "United States"
    },
    "tierData": [],
    "JobTierData": [],
    "fullText": {
      "jobTitle": "Software Engineer",
      "jobTenant": "Adobe",
      "primarySkills": [
        "Python",
        "Angular"
      ],
      "secondarySkills": [],
      "location": {
        "address": null,
        "city": "Lubbock County",
        "state": "Texas",
        "zipcode": null,
        "country": "United States"
      }
    },
    "screeningQuestions": null
  }];




  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      statusBarColor={colors.black}
      hasHeader headerParentStyle={{ backgroundColor: colors.white }}
      hasTitle headerTitle={'Jobs For You'}
      hasHigh5Logo
      hasMenuView
      {...props}
      route={useRoute()}
    >
      {
        isRefreshing
        &&
        <ActivityIndicator
          size='small'
          style={{ marginTop: 12 }}
        />
      }
      <View style={styles.parent}>
        {
          jobList.length > 0 ?
            <FlatList
              data={jobList}
              renderItem={ItemView}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={_getAutomatchedJobs}
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
                onPress={() => props.navigation.navigate('CareerPage', { path: 'JobsForYou', data: profilePersonalInfo })}
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