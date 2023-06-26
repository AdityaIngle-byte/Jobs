import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import BaseView from '../hoc/BaseView'
import { colors } from '../../values/colors';
import ProfileCompletionView from '../items/ProfileCompletionView';
import ProfileCardView from '../items/ProfileCardView';
import Email_SocialMediaCard from '../items/Email_SocialMediaCard';
import PreferencesCard from '../items/PreferencesCard';
import UploadResumeCard from '../items/UploadResumeCard';
import DescriptionCard from '../items/DescriptionCard';
import {
  fetchCandidateDetails,
  setProfilePersonalInfo,
  setProfileDescription,
  setProfileSocialMedia,
  setProfileEducation,
  setProfileExperiences,
  getResumeTC,
  setPreferences,
} from '../../redux/actions/homeActions';

import { useDispatch, useSelector } from 'react-redux'
import { gettenant, setTenantDetails } from '../../redux/actions/homeActions';
import { _onUploadResume } from '../../../common';
import { showAlert } from '../../utils/Message';
import {
  deleteResumeFile,
  setResumeDetails
} from '../../redux/actions/resumeActions';

export default function Home(props) {

  const baseViewRef = useRef(null)
  const dispatch = useDispatch();
  const profilePersonalInfo = useSelector(state => state.home.profilePersonalInfo);
  const profileDescription = useSelector(state => state.home.profileDescription);
  const profileSocialMedia = useSelector(state => state.home.profileSocialMedia);
  const profileEducation = useSelector(state => state.home.profileEducation);
  const profileExperiences = useSelector(state => state.home.profileExperiences);
  const tenantDetails = useSelector(state => state.home.tenantDetails);
  const resumeDetails = useSelector(state => state.resume.resumeDetails);
  const preferences = useSelector(state => state.home.preferences);
  // const [loading,setLoading] = useState(true);
  const [resume, setResume] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [valueChanged, setIsValueChanged] = useState(false);
  const [candidateDetails, setCandidateDetails] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      _fetchCandidateDetails();
    })
    _fetchCandidateDetails();
    return () => {
      unsubscribe();
    }

  }, [valueChanged])

  const _fetchCandidateDetails = () => {
    setIsRefreshing(true);
    setLoading(true);
    fetchCandidateDetails()
      .then((response) => {
        console.log("Fetch Candidate Details");
        console.log(response)
        setCandidateDetails(response);
        const id = response.candidateID;
        _gettenant(id);
        updateProfile(response);
      })
      .catch((error) => {
        setLoading(false);
        setIsRefreshing(false);
        console.log(error);
      })
  }

  const updateProfile = (profile) => {

    if (profile != null) {

      const contactInfo = {
        firstName: profile.firstName,
        middleName: profile.middleName,
        lastName: profile.lastName,
        address: {
          addressLine1: profile.address,
          addressLine2: '',
          city: profile.addressCity,
          country: profile.country,
          state: profile.addressState,
          postalCode: profile.zipCode,
        },
        primaryCountryCode: {
          name: profile.country,
          flag: ' ',
          code: ' ',
          dial_code: profile.mobilePhoneCode
        },
        primaryPhone: profile.mobilePhone,
        alternateCountryCode: {
          name: profile.country,
          flag: ' ',
          code: ' ',
          dial_code: profile.workPhoneCode
        },
        alternatePhone: profile.workPhone,
        email: profile.email,
        imageURL: profile.ImageURL,
        designation: profile.designation,
        currentJobTitle: profile.currentJobTitle,
        experienceYear: profile.experienceYear,
        experienceMonth: profile.experienceMonth,
      }
      dispatch(setProfilePersonalInfo(contactInfo));

      //update profile description
      if (profile.description != null || profile.description == '' || profile.description != 'NA') {
        dispatch(setProfileDescription(profile.description));
      }

      //update social media

      const socialMedia = {
        linkedIn: (profile.linkedIn !== '' && profile.linkedIn !== null) ? profile.linkedIn : '',
        website: (profile.website !== '' && profile.website !== null) ? profile.website : '',
        facebook: (profile.facebook !== '' && profile.facebook !== null) ? profile.facebook : '',
        twitter: (profile.twitter !== '' && profile.twitter !== null) ? profile.twitter : '',
      }
      dispatch(setProfileSocialMedia(socialMedia));

      // update preferences
      const preferences = {
        preferredSalary: profile.preferredSalary,
        preferredSalaryCurrency: profile.preferredSalaryCurrency,
        minContractRate: profile.minContractRate,
        minContractRateCurrency: profile.minContractRateCurrency,
        preferedLocations: profile.preferedLocations
      }
      console.log("This is preferences");
      console.log(preferences);


      dispatch(setPreferences(preferences));

      // update education 
      dispatch(setProfileEducation(profile.education));

      // update experience 
      dispatch(setProfileExperiences(profile.experience));

      profileCompletionCalculator(profile);
    }
  }

  const _gettenant = (id) => {
    gettenant()
      .then((response) => {
        dispatch(setTenantDetails(response[0]));
        if (response) {
          const tenantName = response[0].tenantname;
          _getResumeTC(id, tenantName);
        }
      })
      .catch((error) => {
        setIsRefreshing(false);
        console.log(error);
      })
  }

  const _getResumeTC = (candidateID, tenant) => {
    getResumeTC(candidateID, tenant)
      .then((response) => {
        setResume(response);
        dispatch(setResumeDetails(response));
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }


  const _onDeleteResume = (fileName) => {
    const candidateId = candidateDetails.candidateID;
    const tenant = tenantDetails.tenantname;
    const filteredResumeList = resumeDetails.filter(it => it.fileName !== fileName)
    // Write a logic to delete only that specific resume.

    if (baseViewRef !== null) {
      baseViewRef.current.showLoader();
      deleteResumeFile(resumeDetails, candidateId, tenant)
        .then(response => {
          if (response) {
            baseViewRef.current.hideLoader();
            setResume(filteredResumeList);
            dispatch(setResumeDetails(filteredResumeList))
            showAlert('success', 'Resume deleted successfully');
          }
        })
        .catch(error => {
          baseViewRef.current.hideLoader();
          showAlert('error', 'Something went wrong');
        })
    }
  }


  const _refreshPage = () => {
    setIsValueChanged(!valueChanged);
  }


  // const _onEditProfileDescription = () => {
  //   props.navigation.navigate('ProfileDescription', { candidateDetails: candidateDetails });
  // }


  // const _onEditProfileEdu_Exp = (navigateRoute) => {
  //   props.navigation.navigate(navigateRoute, { candidateDetails: candidateDetails });
  // }

  const _onEditTalentDetails = (navigateRoute) => {
    props.navigation.navigate(navigateRoute, { candidateDetails: candidateDetails });
  }



  // const _onEditPreferences = (navigateRoute) => {
  //   props.navigation.navigate(navigateRoute, { candidateDetails: candidateDetails });
  // }

  const _uploadResume = () => {
    if (baseViewRef !== null) {
      baseViewRef.current.showLoader();
      const tenant = tenantDetails.tenantname;
      const candidateId = candidateDetails.candidateID
      _onUploadResume(tenant, candidateId, false)
        .then(response => {
          if (response) {
            baseViewRef.current.hideLoader();
            _refreshPage();
            showAlert('success', 'Resume Uploaded Successfully!')
          }
        })
        .catch(error => {
          baseViewRef.current.hideLoader();
          if (error != 'Cancel') {
            showAlert('error', error);
          }
        })
    }
  }

  const _onEditProfileInfo = () => {
    props.navigation.navigate('ContactInfo', { candidateDetails: candidateDetails });
  }

  const profileCompletionCalculator = (profile) => {

    let fields = 0;

    resume.resumeFile !== "" && fields++;

    profile.firstName !== "" && fields++;

    profile.lastName !== "" && fields++;

    profile.email !== "" && fields++;

    profile.zipCode !== "" && fields++;

    profile.addressCity !== "" && fields++;

    profile.addressState !== "" && fields++;

    profile.country !== "" && fields++;

    profile.mobilePhone !== "" && fields++;

    profile.homePhone !== "" && fields++;

    profile.currentJobTitle !== "" && fields++;

    profile.currentEmployer !== "" && fields++;

    profile.experienceMonth !== "" && fields++;

    profile.experienceYear !== "" && fields++;

    profile.linkedIn !== "" && fields++;

    profile.description !== "" && fields++;

    profile.skillSet.length > 0 && fields++;

    profile.education.length > 0 && fields++;

    profile.experience.length > 0 && fields++;

    profile.minContractRate !== "" && fields++;

    profile.minContractRateCurrency !== "" && fields++;

    profile.preferredSalaryCurrency !== "" && fields++;

    profile.preferredSalary !== "" && fields++;

    profile.preferedLocations !== "" && fields++;

    let per = Math.round((fields / 24) * 100);

    setPercentage(per);
    setLoading(false);



  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={'large'} color={colors.accent} />
      </View>

    )
  }

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      statusBarColor={colors.black}
      hasHeader headerParentStyle={{ backgroundColor: colors.white }}
      hasTitle headerTitle={'Home'}
      hasHigh5Logo
      hasMenuView
      {...props}
    >
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl onRefresh={_refreshPage} refreshing={isRefreshing} />}>
        <View style={styles.parent}>
          <ProfileCompletionView
            item={profilePersonalInfo}
            _onEditPress={_onEditTalentDetails}
            percentage={percentage}
            {...props}
          />
          <UploadResumeCard
            item={resume}
            onUpload={_uploadResume}
            onDelete={_onDeleteResume}
          />

          <DescriptionCard
            item={profileDescription}
            onEditProfileDescription={_onEditTalentDetails}
            {...props}
          />

          <ProfileCardView
            title={'Education'}
            item={profileEducation}
            onEditProfileEdu_Exp={_onEditTalentDetails}
            {...props}
          />

          <ProfileCardView
            title={'Experience'}
            item={profileExperiences}
            onEditProfileEdu_Exp={_onEditTalentDetails}
            {...props}
          />

          <Email_SocialMediaCard
            email={profilePersonalInfo?.email}
            id={'Email'}
            {...props}
          />

          <Email_SocialMediaCard
            socialMedia={profileSocialMedia}
            id={'Social Media'}
            onEditSocialMedia={_onEditTalentDetails}
            {...props}
          />

          <PreferencesCard
            preference={preferences}
            onEditPreferences={_onEditTalentDetails}
            {...props}
          />
        </View>
      </ScrollView>
    </BaseView>
  )
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: "#EEEEEE",
    flex: 1
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
