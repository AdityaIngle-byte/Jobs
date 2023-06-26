import { View, Text, StyleSheet, RefreshControl, TouchableOpacity, FlatList, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BaseView from '../hoc/BaseView'
import { colors } from '../../values/colors'
import TagButton from '../components/TagButton'
import { Card, Icon } from 'react-native-elements'
import { fetchCandidateVettingDetails, getResultList } from '../../redux/actions/assessmentActions'
import { showAlert } from '../../utils/Message'
import { useSelector } from 'react-redux'
import moment from 'moment'
import NoDataView from '../components/NoDataView'

export default function Assessments(props) {

  const [tabIndex, setTabIndex] = useState(0);
  const [candidateVettingDetails, setCandidateVettingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mcqVetting, setMcqVetting] = useState([]);
  const [oneWayVetting, setOneWayVetting] = useState([]);
  const [generalVetting, setGeneralVetting] = useState([]);
  const [MCQInterview, setMCQInterview] = useState(false);
  const baseViewRef = useRef(null);
  const profilePersonalInfo = useSelector(state => state.home.profilePersonalInfo);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      _getCandidateVettingDetails();
    })

    return () => {
      unsubscribe();
    }
  }, []);

  const _getCandidateVettingDetails = () => {
    if (baseViewRef !== null) {
      baseViewRef.current.showLoader();
      const email = profilePersonalInfo.email;

      fetchCandidateVettingDetails(email)
        .then((response) => {
          console.log(response);
          setCandidateVettingDetails(response);
          let idList = [];
          idList = response.map((element) => {
            return {
              candidateId: element._id
            };
          });

          _getList(idList, response);
        })
        .catch((error) => {
          baseViewRef.current.hideLoader();
          console.log(error);
        })
    }
  }


  const _getList = (idList, vettingResponse) => {
    let arrMCQ = [];
    let arrOneWay = [];
    let arrGeneral = [];

    if (idList.length > 0) {
      getResultList(idList)
        .then((response) => {
          vettingResponse.forEach(async (element) => {
            response.forEach(async (item) => {
              if (element._id == item.candidateId) {
                if (element?.testAssign?.testCategory == "OneWay") {
                  element.isReviewed = item.isReviewed; arrOneWay = [...arrOneWay, element];
                } else if (element?.testAssign?.testCategory == "General") {
                  element.isReviewed = item.isReviewed; arrGeneral = [...arrGeneral, element];
                } else if (element?.testAssign?.testCategory == "MCQ") {
                  element.isReviewed = item.isReviewed; arrMCQ = [...arrMCQ, element];
                }
              }
            });
          });

          let ActiveMcQ = [];
          let ActiveGeneralVetting = [];
          let ActiveOneWay = [];

          arrMCQ.map((elem) => {
            let date = new Date(elem.createdAt);
            if (new Date() <= date.setDate(date.getDate() + elem.expiryDays)) ActiveMcQ.push(elem);
          });
          arrGeneral.map((elem) => {
            let date = new Date(elem.createdAt);
            if (new Date() <= date.setDate(date.getDate() + elem.expiryDays))
              ActiveGeneralVetting.push(elem);
          });
          arrOneWay.map((elem) => {
            let date = new Date(elem.createdAt);
            if (new Date() <= date.setDate(date.getDate() + elem.expiryDays))
              ActiveOneWay.push(elem);
          });
          setMcqVetting(ActiveMcQ);
          setGeneralVetting(ActiveGeneralVetting);
          setOneWayVetting(ActiveOneWay);
          console.log('MCQ');
          console.log(ActiveMcQ);
          console.log('General');
          console.log(ActiveGeneralVetting);
          console.log('One Way');
          console.log(ActiveOneWay);
          baseViewRef.current.hideLoader();

        })
        .catch((error) => {
          baseViewRef.current.hideLoader();
          console.log(error);
        })
    } else {
      baseViewRef.current.hideLoader();
    }
  }


  const IconWithButtonElement = ({ iconName, iconType, content, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.iconButtonWrapper}>
          {
            iconName &&
            <Icon
              name={iconName}
              type={iconType}
              color={colors.black}
              size={15}
              containerStyle={{ marginLeft: 8 }}
            />
          }
          <Text style={styles.viewResult}>{content}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const calExpiryDate = (createdAt, days) => {
    var new_date = moment(createdAt, "YYYY-MM-DD").add(days, "days");
    let date = new_date.format("MM/DD/YYYY");
    return date;
  };


  const AssessmentCard = (item, testType) => {
    let diff = moment(new Date()).diff(moment(item.createdAt), "days");
    return diff < item.expiryDays ? (
      <Card containerStyle={{ borderRadius: 6, marginLeft: 20 }}>
        <View style={styles.assessmentHead}>
          <Text style={styles.assessmentName}>{item.testAssign.testName}</Text>
          {
            testType == 'MCQ' && (
              <>
                {
                  item.testCompleted &&
                  <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>
                    <IconWithButtonElement iconName={'eye'} iconType={'feather'} content={'View Result'} onPress={() => Linking.openURL(`https://vetuat.high5hire.app/assessmentResult/${item._id}`)} />
                    <IconWithButtonElement iconName={'share-2'} iconType={'feather'} content={'Share Result'} />
                  </View>

                }
              </>
            )
          }
          {
            !item.testCompleted &&
            <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>
              <IconWithButtonElement content={'Start Assessment'} onPress={() => Linking.openURL(`https://vetuat.high5hire.app/candidates/${item.testAssign._id}/${item.uniqueCode}`)} />
            </View>

          }
          {
            testType != 'MCQ' && (
              <>
                {
                  item.isReviewed && (
                    <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>
                      <IconWithButtonElement iconName={'eye'} iconType={'feather'} content={'View Result'} onPress={() => Linking.openURL(`https://vetuat.high5hire.app/assessmentResult/${item._id}`)} />
                      <IconWithButtonElement iconName={'share-2'} iconType={'feather'} content={'Share Result'} />
                    </View>
                  )
                }
              </>
            )
          }



        </View>

        <Text style={{ fontSize: 14, margin: 20, color: colors.black }}><Text style={{ color: colors.black, fontWeight: '500' }}>Job Title :</Text> {item.jobTitle}</Text>
        {/* Start Assessment  */}
        {/* Share Result */}
        {/* View Result */}
        <TagButton
          title={`Assigned By : ${item.companyInfo?.companyName}`}
          disabledStyle={{ backgroundColor: '#E4E4E4', borderColor: '#E4E4E4' }}
          disabledTitleStyle={{ color: colors.black }}
          size={'large'}
          containerStyle={{ alignSelf: "flex-start" }}
          disabled
        />

        {
          item?.testCompleted == false && testType == 'MCQ' ?
            <TagButton
              title={`Assigned On : ${item.createdAt ? moment(item.createdAt).format("MM/DD/YYYY") : "N/A"}`}
              disabledStyle={{ backgroundColor: '#E4E4E4', borderColor: '#E4E4E4' }}
              disabledTitleStyle={{ color: colors.black }}
              size={'large'}
              containerStyle={{ alignSelf: "flex-start" }}
              disabled
            />
            : null
        }

        {
          testType != 'MCQ ' && (
            <>
              {item?.isReviewed ? null : item?.testCompleted ? null : (
                <TagButton
                  title={`Assigned On : ${item.createdAt ? moment(item.createdAt).format("MM/DD/YYYY") : "N/A"}`}
                  disabledStyle={{ backgroundColor: '#E4E4E4', borderColor: '#E4E4E4' }}
                  disabledTitleStyle={{ color: colors.black }}
                  size={'large'}
                  containerStyle={{ alignSelf: "flex-start" }}
                  disabled
                />
              )
              }
            </>
          )
        }
        {
          item.testCompleted == false &&
          <TagButton
            title={`Expires On : ${calExpiryDate(item?.createdAt, item?.expiryDays)}`}
            disabledStyle={{ backgroundColor: '#E4E4E4', borderColor: '#E4E4E4' }}
            disabledTitleStyle={{ color: colors.black }}
            size={'large'}
            containerStyle={{ alignSelf: "flex-start" }}
            disabled
          />
        }
        {
          testType != 'MCQ' &&
          <TagButton
            disabled
            title={`Status : ${item?.isReviewed ? "Completed" : item?.testCompleted ? "Under Review" : "Invited"}`}
            disabledStyle={{ backgroundColor: item.isReviewed ? '#47791F' : item?.testCompleted ? colors.underReviewColor : colors.assessmentColor, borderColor: item.isReviewed ? '#47791F' : item?.testCompleted ? colors.underReviewColor : colors.assessmentColor }}
            disabledTitleStyle={{ color: item.isReviewed ? colors.white : item?.testCompleted ? colors.black : colors.black, fontSize: 14, fontWeight: 'bold' }}
            size={'large'}
            containerStyle={{ alignSelf: "flex-start" }}
          />
        }
        {
          testType == 'MCQ' &&
          <TagButton
            disabled
            title={`Status : ${item.testCompleted ? "Completed" : "Invited"}`}
            disabledStyle={{ backgroundColor: !item.testCompleted ? colors.assessmentColor : '#47791F', borderColor: !item.testCompleted ? colors.assessmentColor : '#47791F' }}
            disabledTitleStyle={{ color: colors.white, fontSize: 14, fontWeight: 'bold' }}
            size={'large'}
            containerStyle={{ alignSelf: "flex-start" }}
          />
        }

      </Card>
    ) : (
      <></>
    )
  }

  return (
    <BaseView
      hasStatusBar
      ref={baseViewRef}
      statusBarColor={colors.black}
      hasHeader headerParentStyle={{ backgroundColor: colors.white }}
      hasTitle headerTitle={'Assessments'}
      hasHigh5Logo
      hasMenuView
      {...props}
    >
      <View style={styles.parent}>
        <View style={styles.navigationTopContainer}>

          <TagButton
            title={'MCQ'}
            onPress={() => setTabIndex(0)}
            buttonStyle={tabIndex === 0 ? styles.selectedButtonStyle : styles.notSelectedButtonStyle}
            titleStyle={tabIndex === 0 ? [styles.selectedTextStyle, { padding: 14 }] : [styles.notSelectedTextStyle, { padding: 14 }]}
            size={'large'}
          />
          <TagButton
            title={'One Way'}
            onPress={() => setTabIndex(1)}
            buttonStyle={tabIndex === 1 ? styles.selectedButtonStyle : styles.notSelectedButtonStyle}
            titleStyle={tabIndex === 1 ? styles.selectedTextStyle : styles.notSelectedTextStyle}
            size={'large'}
          />
          <TagButton
            title={'General'}
            onPress={() => setTabIndex(2)}
            buttonStyle={tabIndex === 2 ? styles.selectedButtonStyle : styles.notSelectedButtonStyle}
            titleStyle={tabIndex === 2 ? styles.selectedTextStyle : styles.notSelectedTextStyle}
            size={'large'}
          />
        </View>

        {
          tabIndex == 0 && (
            <>
              {
                mcqVetting.length > 0 ?
                  <FlatList
                    data={mcqVetting}
                    renderItem={({ item }) => AssessmentCard(item, 'MCQ')}
                  /> :
                  <View style={styles.noDataViewContainer}>
                    <NoDataView
                      hasImage
                      msg={'No Assessments Found'}
                      parentStyle={{ marginTop: 20 }}
                    />
                  </View>
              }
            </>
          )
        }


        {
          tabIndex == 1 && (
            <>
              {
                oneWayVetting.length > 0 ?
                  <FlatList
                    data={oneWayVetting}
                    renderItem={({ item }) => AssessmentCard(item, 'OneWay')}
                  /> :
                  <View style={styles.noDataViewContainer}>
                    <NoDataView
                      hasImage
                      msg={'No Assessments Found'}
                      parentStyle={{ marginTop: 20 }}
                    />
                  </View>
              }
            </>
          )
        }
        {
          tabIndex == 2 && (
            <>
              {
                generalVetting.length > 0 ?
                  <FlatList
                    data={generalVetting}
                    renderItem={({ item }) => AssessmentCard(item, 'General')}
                  /> :
                  <View style={styles.noDataViewContainer}>
                    <NoDataView
                      hasImage
                      msg={'No Assessments Found'}
                      parentStyle={{ marginTop: 20 }}
                    />
                  </View>

              }
            </>
          )
        }
      </View>
    </BaseView>
  )
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#EEEEEE',
    flex: 1,
  },
  navigationTopContainer: {
    flexDirection: "row",
    marginTop: 40,
    marginLeft: 20
  },
  notSelectedButtonStyle: {
    backgroundColor: colors.white,
    borderColor: colors.white
  },
  selectedButtonStyle: {
    backgroundColor: colors.accent,
    borderColor: colors.accent
  },
  notSelectedTextStyle: {
    color: colors.black,
    fontSize: 14,
    padding: 5
  },
  selectedTextStyle: {
    color: '#fff',
    fontSize: 14,
    padding: 5
  },
  assessmentHead: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  assessmentName: {
    fontWeight: "bold",
    color: colors.black,
    fontSize: 18,
    letterSpacing: 0.1
  },
  viewResult: {
    fontSize: 13,
    margin: 4,
    color: colors.black
  },
  iconButtonWrapper: {
    backgroundColor: colors.lightAccent2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    borderColor: colors.lightAccent2,
    borderWidth: 0.4,
    paddingHorizontal: 3,
    marginHorizontal: 5
  },
  noDataViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }


})