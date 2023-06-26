import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Linking, BackHandler } from 'react-native'
import { colors } from '../../values/colors'
import BaseView from '../hoc/BaseView'
import TagButton from '../components/TagButton'
import { Card } from 'react-native-elements'
import DropShadow from 'react-native-drop-shadow'
import TalentCommunityCard from './../items/TalentCommunityCard'
import Footer from '../items/Footer'
import { fetchJobDescription } from '../../redux/actions/jobActions'
import RenderHtml from 'react-native-render-html';
import { _checkIsLoggedIn } from '../../../common'
import { showAlert } from '../../utils/Message'
import { useRoute, useNavigation } from '@react-navigation/native';
import ApplyNowModal from '../modals/ApplyNowModal'
import { fetchExistingTalentFromUserIndex, fetchNewTalentDetails, fetchRecruiterDetails, isEmailExist } from '../../redux/actions/careerActions'
import { clearUserPrefs } from '../../utils/UserPrefs'
import { gettenant, setProfileDescription, setProfileEducation, setProfileExperiences, setProfilePersonalInfo, setProfileSkills, setProfileSocialMedia, setTenantDetails, recruiterid } from '../../redux/actions/homeActions'
import { useDispatch, useSelector } from 'react-redux'
import { set } from 'react-native-reanimated'
import { domain } from '../../redux/networkRequests/networkConstants'
import { setUserPrefs } from '../../redux/actions/loginActions'
import { findTenantid } from '../../redux/actions/loginActions'
import { loginUser } from '../../redux/actions/loginActions'
import { Icon } from 'react-native-elements'

const JobDescription = (props) => {

    const [jobDetails, setJobDetails] = useState({});
    const [recruiterAgency, setRecruiterAgency] = useState("");
    const [sourceChannel, setSourceChannel] = useState("");
    const [recruiterData, setRecruiterData] = useState([]);
    const [tenantData, setTenantData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(0);
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [session, setSession] = useState(false);
    const [email, setEmail] = useState(false);
    const [enableApply, setEnableApply] = useState(true);
    const applyNowModalRef = useRef(null);
    const params = props.route.params || {};
    const { personDetailsId, tenantId, item, jobId, recruiterid, login, userName, passWord, path } = params;
    const _jobId = item?.jobId || jobId;
    const baseViewRef = useRef(null);
    const dispatch = useDispatch();


    useLayoutEffect(() => {
        const _unsubscribe = props.navigation.addListener('focus', () => {
            if (props?.route?.params?.login === true) {
                __login(props?.route?.params?.userName, props?.route?.params?.passWord);
            } else {
                init();
                _fetchJobDescription(_jobId);
            }
        })
        return () => {
            _unsubscribe();
        }

    }, [])

    useEffect(() => {
        BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => {
            BackHandler.removeEventListener('hardwareBackPress',
                backAction)
        }
    }, [session])

    const backAction = () => {
        // if (session) {
        //     props.navigation.replace('Home');
        //     return true;
        // } else {
        //     BackHandler.exitApp();
        //     return true;
        // }
        console.log(path);
        if (path != undefined) {
            switch (path) {
                case "CareerPage":
                case 'JobApplications':
                    props.navigation.goBack();
                    return true;
                default:
                    BackHandler.exitApp();
                    return true;
            }
        } else {
            if (!session) {
                props.navigation.replace('JobDescription', { jobId: jobId });
                return;
            }
            BackHandler.exitApp();
            return true;
        }

    };

    const __login = (userName, passWord) => {
        if (baseViewRef !== null) {
            // baseViewRef.current.showLoader();
            setLoading(true);
            loginUser(userName, passWord)
                .then((response) => {
                    console.log(response);
                    findTenantid(userName)
                        .then((response) => {
                            // baseViewRef.current.hideLoader();
                            setLoading(false);
                            props.navigation.replace('Home');
                        })
                        .catch((error) => {
                            // baseViewRef.current.hideLoader();
                            setLoading(false);
                            showAlert('error', error);
                        })
                })
                .catch((error) => {
                    // baseViewRef.current.hideLoader()
                    setLoading(false);
                    showAlert('error', error);
                })
        }
    }


    const init = async () => {

        if (tenantId) _gettenant(tenantId);
        if (recruiterid) _getRecruiterDetails(recruiterid);
        _checkIsLoggedIn()
            .then(response => {
                response != null ? setSession(true) : setSession(false);
                _fromDeepLinking();
            })
            .catch(error => console.log(error))

        if (path != undefined) {
            switch (path) {
                case "CareerPage":
                    setEnableApply(true);
                    break;
                case 'JobApplications':
                    setEnableApply(false);
                    break;
                default:
                    break;
            }
        }
    }

    const _gettenant = (id) => {
        gettenant(id)
            .then((response) => {
                console.log(response);
                setTenantData(response[0]);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const _getRecruiterDetails = (recruiterid) => {
        fetchRecruiterDetails(recruiterid)
            .then((response) => {
                console.log(response);
                let name = `${response[0].firstName} ${response[0].lastName}`;
                setSourceChannel(name);
                setRecruiterAgency(response[0].tenantname[0].tenantname);
                setRecruiterData(response[0]);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const _fetchJobDescription = (jobId) => {
        setLoading(true);
        fetchJobDescription(jobId)
            .then((response) => {
                console.log("Job Description, Fetch job Description");
                console.log(response);
                const job = response.jobData;
                setJobDetails(job);
                setMinSalary(new Intl.NumberFormat({ style: 'currency', currency: 'USD' }).format(job.minimumPay));
                setMaxSalary(new Intl.NumberFormat({ style: 'currency', currency: 'USD' }).format(job.maximumPay));
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                showAlert('error', 'Something went wrong');
                console.log("Job Description, Fetch job Description");
                console.log(error);
            })

    }

    const _fromDeepLinking = () => {
        if (tenantId) {
            setSession(false);
            console.log('Job Id' + jobId);
            console.log('Tenant Id' + tenantId);
        }
    }



    const _applyWithEmail = async (emailId) => {

        await clearUserPrefs();
        if (applyNowModalRef != null)
            applyNowModalRef.current.baseModal.hideModal();
        setFlag(0);
        dispatch(setProfilePersonalInfo(null));
        dispatch(setProfileDescription(null));
        dispatch(setProfileSocialMedia(null));
        dispatch(setProfileSkills(null));
        dispatch(setProfileEducation([]));
        dispatch(setProfileExperiences([]));
        dispatch(setTenantDetails([]));
        dispatch(setUserPrefs(null))
        if (baseViewRef !== null) {
            baseViewRef.current.showLoader();
            if (emailId !== null && emailId !== undefined) {
                isEmailExist(emailId, tenantId)
                    .then((response) => {
                        const emailExistResponse = response;
                        fetchNewTalentDetails(emailId, _jobId)
                            .then((response) => {
                                const newTalentDetailsResponse = response;
                                if (emailExistResponse.isExist === false) {
                                    fetchExistingTalentFromUserIndex(emailId)
                                        .then((response) => {
                                            console.log("Store to prepopulate the data ");
                                            console.log(response); // Store  to prepopulate the data
                                            if (response.length == 0) {
                                                baseViewRef.current.hideLoader();
                                                const data = {
                                                    candidateData: {
                                                        FK_Tenant: tenantId.toString(),
                                                        jobId: jobDetails.jobId,
                                                        tenantName: tenantData.tenantname,
                                                        tenantId: tenantId.toString(),
                                                        source: "Career Page",
                                                        sourceChannel: "",
                                                        recruiterAgency: "",
                                                        recruiterId: recruiterData.userId.toString(),
                                                        createdBy: recruiterData.userId.toString(),
                                                        createdByName: sourceChannel,
                                                        createdByTenant: recruiterAgency,
                                                        visaStatus: "",
                                                        reffererName: "",
                                                        domainName: domain,
                                                        minContractRate: "",
                                                        minContractRateCurrency: "USD",
                                                        positionTypes: [],
                                                        designation: "",
                                                        isFresher: "false"
                                                    },
                                                    newCandidateEmail: emailId,
                                                    jobDetails: jobDetails,
                                                    recruiterData: recruiterData
                                                }
                                                console.log('Data in Job Description before sending');
                                                console.log(data);
                                                console.log('Recruiter');
                                                console.log(recruiterData)
                                                props.navigation.navigate('ContactInfo', data);
                                            }
                                            // fetch other api if data found in response and after response navigate them to contact Info.
                                            // baseViewRef.current.hideLoader();
                                        })
                                        .catch((error) => {
                                            baseViewRef.current.hideLoader();
                                            showAlert('error', 'Something went wrong')
                                            console.log(error);
                                        })
                                } else {
                                    baseViewRef.current.hideLoader();
                                    if (newTalentDetailsResponse.status == 'exist') {
                                        showAlert('error', 'You have already applied for this job');
                                        return;
                                    } else {
                                        props.navigation.replace('Login');
                                    }
                                }
                            })
                            .catch((error) => {
                                baseViewRef.current.hideLoader();
                                showAlert('error', 'Something went wrong')
                                console.log(error);
                            })
                    })
                    .catch((error) => {
                        baseViewRef.current.hideLoader();
                        showAlert('error', 'Something went wrong')
                        console.log(error);
                    })
            }
        }
    }

    //Algo 


    //1
    // adi@yopmail.com
    // isEmail Exists = false
    // fetchNewTalentDetails = success   // if candidate is invited through mail then we get response
    // fetchExistingTalentFromUserIndex  = []

    //111111111111111111111 (already applied, alert and stop )
    // alngale@eteaminc.com
    // isEmail Exists = true
    // fetchNewTalentDetails = exist  

    //111111111111111111111 (email exists but not applied then login and password)
    // alngale@eteaminc.com
    // isEmail Exists = true
    // fetchNewTalentDetails = success


    // 4 
    // adi@yopmail.com
    // isEmail Exists = false
    // fetchNewTalentDetails = success
    // fetchExistingTalentFromUserIndex  = []

    // alngale@eteaminc.com
    // isEmail Exists = false
    // fetchNewTalentDetails = success
    // fetchExistingTalentFromUserIndex  = [] if length greater than execute next steps 
    // fetchDetailsDS    // this is candidate details
    // getrequestdetailsbyIdDS // this is job details.


    const JobHeaderComponent = ({ jobTitle, jobLocation, jobSalary, jobType, experienceLevel }) => {
        return (
            <View style={styles.jobHeaderComponent}>
                <Text style={styles.textWithShadow}>{jobTitle}</Text>
                <View style={styles.jobTagsView}>
                    <TagButton
                        title={jobLocation}
                        containerStyle={styles.jobTagsContainer}
                        buttonStyle={styles.jobTagsButton}
                        titleStyle={styles.jobTagsTitle}
                        parentStyle={{ marginRight: 5 }}
                    />
                    <TagButton
                        title={jobSalary}
                        containerStyle={styles.jobTagsContainer}
                        buttonStyle={styles.jobTagsButton}
                        titleStyle={styles.jobTagsTitle}
                        parentStyle={{ marginRight: 5 }}
                    />
                    <TagButton
                        title={jobType}
                        containerStyle={styles.jobTagsContainer}
                        buttonStyle={styles.jobTagsButton}
                        titleStyle={styles.jobTagsTitle}
                        parentStyle={{ marginRight: 5 }}
                    />
                    <TagButton
                        title={experienceLevel}
                        containerStyle={styles.jobTagsContainer}
                        buttonStyle={styles.jobTagsButton}
                        titleStyle={styles.jobTagsTitle}
                        parentStyle={{ marginRight: 5 }}
                    />
                </View>
                <View style={{ alignItems: "flex-end", marginTop: 35 }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        if (applyNowModalRef !== null) {
                            applyNowModalRef.current.baseModal.showModal();
                        }
                    }} style={{ backgroundColor: !enableApply ? colors.textInputBorderColor : colors.lightgreen, height: 32, width: 120, borderColor: colors.lightgreen, justifyContent: "center", alignItems: "center", marginRight: 15, marginBottom: 5, borderRadius: 5 }} disabled={!enableApply}>
                        <Text style={{ color: colors.white, fontSize: 14 }}>Apply Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const _newTalent = (src) => {
        if (applyNowModalRef !== null) {
            applyNowModalRef.current.baseModal.showModal();
            src === 'TalentCommunity' ? setFlag(1) : setFlag(0);
        }
    }


    const tagsStyles = {
        p: {
            color: "#6B6767",
            fontSize: 12,
            fontWeight: '400'
        },
    };

    const JobRequirementComponent = ({ title, description }) => {
        return (
            <DropShadow
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 1,
                        height: 2,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                }}
            >
                <Card containerStyle={{ borderRadius: 2, marginHorizontal: 10, marginTop: 30, marginBottom: 10 }}>
                    <Text style={styles.jobRequirementTitle}>{title}</Text>
                    <RenderHtml
                        contentWidth={'100%'}
                        source={{ html: jobDetails.jobDescription }}
                        tagsStyles={tagsStyles}
                    />
                </Card>
            </DropShadow>
        )
    }

    const onCrossPress = () => {
        applyNowModalRef.current.baseModal.hideModal();
        setFlag(0);
    }

    const JobRequirementSkills = ({ title, skills }) => {
        console.log(skills);
        return (
            <DropShadow
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 1,
                        height: 2,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                }}
            >
                <Card containerStyle={{ borderRadius: 2, marginHorizontal: 10, paddingBottom: 20 }}>
                    <Text style={styles.requiredSkillsTitle}>{title}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {
                            skills !== undefined && skills.map((requiredSkills) => {
                                return (
                                    <TagButton
                                        title={requiredSkills}
                                        containerStyle={[styles.jobTagsContainer]}
                                        buttonStyle={styles.jobTagsButton}
                                        titleStyle={styles.jobTagsTitle}
                                        parentStyle={{ marginRight: 5 }}
                                    />
                                )
                            })
                        }
                    </View>
                </Card>
            </DropShadow>
        )
    }

    if (loading) {
        return (
            <View style={styles.loadingStyle}>
                <ActivityIndicator size={'large'} animating color={colors.accent} />
            </View>
        )

    }

    return (
        <BaseView
            hasStatusBar
            ref={baseViewRef}
            statusBarColor={colors.black}
            hasHigh5Logo
            // hasTitle headerTitle={'Job Details'}
            hasHeader headerParentStyle={{ backgroundColor: colors.white }}
            hasLogin={!session}
            onLogin={() => props.navigation.navigate('Login')}
            hasMenuView={session ? true : false}
            {...props}
            route={useRoute()}
        >
            <View style={styles.parent}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}>
                    <JobHeaderComponent
                        jobTitle={jobDetails?.jobTitle}
                        jobLocation={
                            jobDetails?.workPlaceType != 'Remote'
                                ? `${jobDetails?.workPlaceType}: ${jobDetails?.location?.address}`
                                : `${jobDetails?.workPlaceType}`
                        }
                        jobSalary={`$${minSalary} to $${maxSalary} Annual`}
                        jobType={jobDetails?.jobType}
                        experienceLevel={jobDetails?.experienceLevel}
                    />

                    <JobRequirementComponent
                        title='Job Requirement'
                        description='Ability to translate Wireframes and PSD Designs into functional web apps using HTML5, AngularJS, React , Node.js, and Mongo. Binding of UI elements to JavaScript object models. Creating RESTful services with Node.js. Architect scalable web architectures.'
                    />

                    <JobRequirementSkills
                        title='Required Skills'
                        skills={jobDetails.primarySkills}
                    />

                    {
                        !session &&
                        <View style={{ marginTop: 20 }}>
                            <TalentCommunityCard
                                onJoin={() => _newTalent('TalentCommunity')}
                            />
                        </View>
                    }

                </ScrollView>
                {
                    session ?
                        <TouchableOpacity onPress={() => session ? props.navigation.goBack() : BackHandler.exitApp()}>
                            <View style={styles.goBackButton}>
                                <Icon
                                    name={'keyboard-backspace'}
                                    type='MaterialIcons'
                                    color={colors.white}
                                    size={36}
                                // containerStyle={{ marginRight: 8 }}
                                />
                            </View>
                        </TouchableOpacity> : null
                }
                <ApplyNowModal
                    ref={applyNowModalRef}
                    setEmail={_applyWithEmail}
                    _onCrossPress={onCrossPress}
                />
            </View>
            <View style={{ backgroundColor: colors.white }}>
                <View style={styles.footer}>
                    <Footer privacyTextVisible />
                </View>
            </View>
        </BaseView>
    )
}

export default JobDescription

const styles = StyleSheet.create({
    parent: {
        backgroundColor: colors.white,
        flex: 1,
    },
    jobHeaderComponent: {
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingBottom: 5
    },
    jobTagsView: {
        flexDirection: "row",
        marginHorizontal: 20,
        flex: 1,
        flexWrap: "wrap",
        marginTop: -10
    },
    jobTagsContainer: {
        borderRadius: 5,
        height: 25,
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 8
    },
    jobTagsButton: {
        backgroundColor: colors.lightSkyBlue,
        borderColor: colors.lightSkyBlue,
        activeOpacity: 0.9
    },
    jobTagsTitle: {
        color: colors.black,
        textAlign: "center",
        fontSize: 11,
        marginTop: 5
    },
    textWithShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        margin: 10,
        padding: 10,
        marginTop: 20,
        color: colors.white,
        fontWeight: "bold",
        fontSize: 22,
        letterSpacing: 0.2
    },
    jobRequirementTitle: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 15,
    },
    jobRequirementDescription: {
        color: "#6B6767",
        fontSize: 12,
        fontWeight: '400'
    },
    requiredSkillsTitle: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 15,
        marginBottom: 8
    },
    footer: {
        alignSelf: 'center',
        backgroundColor: colors.white,
        paddingBottom: 16,
    },
    loadingStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    goBackButton: {
        position: "absolute",
        margin: 5,
        padding: 5,
        right: 10,
        bottom: 10,
        borderRadius: 50,
        borderWidth: 2,
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.newColor,
        borderColor: colors.newColor
    }
})



{/* <JobDetailBottomView 
                    onShare={() => _onShare()}
                    onFav={() => alert()}
                    onApply={() => alert()}
                    onDiscard={() => alert()}
                    // onDiscard={() => _updateJob()}
                    // isFavoriteJob={isFavoriteJob}
                    style={{paddingVertical:16,paddingBottom:24,backgroundColor:'#fff'}}
                /> */}