import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import BaseView from '../hoc/BaseView'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'
import TagButton from '../components/TagButton'
import CircularProgress from 'react-native-circular-progress-indicator'
import ButtonView from '../components/ButtonView'
import { StackActions } from '@react-navigation/native';
import { addDsTalent, invitedUser } from '../../redux/actions/careerActions'
import { showAlert } from '../../utils/Message'
import { findTenantid, loginUser } from '../../redux/actions/loginActions'


const ScoreCard = (props) => {
    const baseViewRef = useRef(null);


    // const jobData = {
    //     "@search.score": 1,
    //     "jobId": "394861235",
    //     "jobTitle": "Database Admin",
    //     "jobTenant": "Adobe",
    //     "jobType": "Full Time",
    //     "isRemote": true,
    //     "prefferedStartDate": "2023-04-20T13:22:23.897Z",
    //     "positionCount": 1,
    //     "allowedSubmittals": 5,
    //     "annualSalary": "25000",
    //     "activeFrom": "2023-02-20T13:22:23.898Z",
    //     "expiresOn": "2023-04-20T13:22:23.898Z",
    //     "placementFee": "8",
    //     "placementCurrency": "USD",
    //     "usePrefferedSupplier": null,
    //     "projectCompletionDate": null,
    //     "contractDurationMonths": "1",
    //     "contractDurationDays": "0",
    //     "hourlyRate": "",
    //     "projectBudjet": null,
    //     "referalBonus": "",
    //     "referalBonusCurrency": "USD",
    //     "submittal": "",
    //     "jobDescription": "<ul>\n  <li>establish the needs of users and monitor user access and security</li>\n  <li>monitor performance and manage parameters to provide fast responses to front-end users</li>\n  <li>consider both back-end organisation of data and front-end accessibility for end-users</li>\n</ul>",
    //     "primarySkills": [
    //         "ReactJS",
    //         "HTML",
    //         "CSS"
    //     ],
    //     "secondarySkills": [],
    //     "skillSet": [],
    //     "jobPostDate": "2023-03-01T09:15:58.611Z",
    //     "jobStatus": "active",
    //     "jobCreatedBy": "1140325278",
    //     "jobCreatedByName": "Jenus Burl",
    //     "isPublic": true,
    //     "isHotJob": false,
    //     "isFexible": true,
    //     "education": [
    //         "Bachelor's Degree"
    //     ],
    //     "certifications": [],
    //     "industries": [],
    //     "workStart": "",
    //     "workEnd": "",
    //     "travel": "",
    //     "drugTest": false,
    //     "backgroundCheck": false,
    //     "securityClearance": "",
    //     "domainName": "https://uat.high5hire.com",
    //     "recruiterId": null,
    //     "hiringManagerId": "",
    //     "tenantId": "1",
    //     "jobUpdatedTime": "2023-02-24T07:08:53.514Z",
    //     "favorites": null,
    //     "visaRequirement": "[\"H1B\"]",
    //     "companyName": "",
    //     "companyJobId": "",
    //     "intakeId": null,
    //     "isFeePercentage": true,
    //     "experienceLevel": "1-3 years",
    //     "licenceRequirement": "",
    //     "notes": "",
    //     "minimumPay": "20000",
    //     "maximumPay": "25000",
    //     "additionalInfo": "[{\"name\":\"Visa Requirement\",\"question\":\"Please add visa requirement for the job\"}]",
    //     "QandA": "[]",
    //     "workPlaceType": "Remote",
    //     "salaryType": "Annual",
    //     "salaryCurrency": "USD",
    //     "documents": "[]",
    //     "intakeDetails": null,
    //     "onsiteWorkDays": "",
    //     "weightage": {
    //         "primarySkills": [
    //             "ReactJS",
    //             "HTML",
    //             "CSS"
    //         ],
    //         "secondarySkills": [],
    //         "jobTitle": false,
    //         "location": false,
    //         "experienceLevel": false,
    //         "education": [],
    //         "industries": []
    //     },
    //     "vettingRequired": false,
    //     "screeningRequired": false,
    //     "vettingDetails": null,
    //     "isPublished": "Yes",
    //     "jobTenantId": "1",
    //     "prevJobStatus": "active",
    //     "isDisqualifiedMailSend": "No",
    //     "location": {
    //         "address": "",
    //         "city": "",
    //         "state": "",
    //         "zipcode": null,
    //         "country": ""
    //     },
    //     "tierData": [],
    //     "JobTierData": [],
    //     "fullText": {
    //         "jobTitle": "Database Admin",
    //         "jobTenant": "Adobe",
    //         "primarySkills": [
    //             "ReactJS",
    //             "HTML",
    //             "CSS"
    //         ],
    //         "secondarySkills": [],
    //         "location": {
    //             "address": null,
    //             "city": "",
    //             "state": "",
    //             "zipcode": null,
    //             "country": ""
    //         }
    //     },
    //     "screeningQuestions": null
    // }

    // const candidateData = {
    //     "@search.score": 1,
    //     "candidateID": "690600961",
    //     "typeName": "tc",
    //     "firstName": "Rodrik",
    //     "middleName": "",
    //     "lastName": "Clarke",
    //     "candidateTenant": "Adobe",
    //     "role": [
    //         "candidate"
    //     ],
    //     "preferredSalary": "5",
    //     "preferredSalaryCurrency": "USD",
    //     "email": "alngale@eteaminc.com",
    //     "skillSet": [],
    //     "facebook": "",
    //     "linkedIn": "",
    //     "twitter": "",
    //     "website": null,
    //     "workPhoneCode": "",
    //     "workPhone": "",
    //     "homePhoneCode": "",
    //     "homePhone": "",
    //     "mobilePhoneCode": "",
    //     "mobilePhone": "+91 83699 64052",
    //     "address": "NA",
    //     "addressCity": "Mumbai",
    //     "addressState": "NA",
    //     "country": "India",
    //     "zipCode": "234234",
    //     "experienceLevel": "",
    //     "primarySkills": [
    //         "ReactJS",
    //         "JavaScript",
    //         "Scheduling",
    //         "Prototyping",
    //         "Distributed Computing",
    //         "Storage Area Network (SAN)",
    //         "Presentations",
    //         "Unix",
    //         "Software Development",
    //         "Collaboration",
    //         "Systems Development",
    //         "Communications",
    //         "Interactive Data Language (IDL)",
    //         "Release Management",
    //         "Planning",
    //         "Integration",
    //         "Coordinating",
    //         "Operations",
    //         "Automation",
    //         "Java (Programming Language)",
    //         "Application Programming Interface (API)",
    //         "Sarbanes-Oxley Act (SOX) Compliance",
    //         "Product Support",
    //         "Software Engineering",
    //         "Product Planning",
    //         "Sales",
    //         "Infrastructure",
    //         "Management",
    //         "Customer Satisfaction",
    //         "Product Testing",
    //         "Product Design",
    //         "Embedded Systems",
    //         "Product Quality (QA/QC)",
    //         "Regulatory Compliance",
    //         "Operability",
    //         "Scripting",
    //         "Scalability",
    //         "Configuration Management",
    //         "Compilers",
    //         "Fault",
    //         "Debugging",
    //         "Software Design",
    //         "DBase",
    //         "MVS (OS)",
    //         "Peripheral Component Interconnect (PCI)",
    //         "Technical Training",
    //         "Network Management",
    //         "Digital Logic"
    //     ],
    //     "secondarySkills": [],
    //     "autoMatchedCount": 0,
    //     "currentEmployer": "Mc Loren",
    //     "designation": "",
    //     "preferedLocations": [
    //         "R",
    //         "e",
    //         "m",
    //         "o",
    //         "t",
    //         "e",
    //         "Remote"
    //     ],
    //     "createdDate": "2023-03-09T15:01:32.566Z",
    //     "createdBy": "1162263934",
    //     "createdByTenant": "Adobe",
    //     "createdByName": "Homes Phale",
    //     "updatedDate": "2023-03-10T16:48:31.687Z",
    //     "updatedBy": "",
    //     "candidateStatus": "active",
    //     "description": " Substantial industry experience with enterprise solutions, mission-critical applications development, inter-operability, product testing, validation, migration and Systems Development Life Cycle (SDLC).  Significant experience in project and program management, regulatory compliance, risk assessment and mitigation. Demonstrated record of creating strategic processes and procedures, identifying process deficiencies and improvements.  Extensive knowledge of cross-platform software development tools, programming and scripting languages, embedded systems, distributed computing, scalability and application optimization  Strong verbal and written communications skills. Exceptional ability to drive collaboration between technical and business communities with a proven record of execution and accountability. Interface extremely well with customers, staff and management from diverse disciplines and backgrounds.",
    //     "source": "Career Page",
    //     "preferredRecruiterSkills": [],
    //     "preferredRecruiterLocations": [],
    //     "minContractRate": "",
    //     "minContractRateCurrency": "USD",
    //     "contactMode": [],
    //     "preferredPositionType": [],
    //     "visaStatus": "",
    //     "domainName": "https://uat.high5hire.com",
    //     "storyInfo": null,
    //     "MCQ": false,
    //     "onewayvetting": false,
    //     "twowayvetting": false,
    //     "profileID": "",
    //     "isFresher": false,
    //     "ImageURL": "",
    //     "travel": null,
    //     "tovutiUserId": null,
    //     "codesignalvetting": false,
    //     "experienceYear": "0",
    //     "experienceMonth": "3",
    //     "currentJobTitle": "Software Engineer",
    //     "createdByEmail": null,
    //     "tag": [],
    //     "jobId": "527544514",
    //     "talentPool": null,
    //     "talentPoolName": [],
    //     "sourceChannel": "",
    //     "recruiterAgency": "",
    //     "reffererName": "",
    //     "legallyAuthorized": true,
    //     "requireSponsorship": false,
    //     "tenantId": "1",
    //     "recruiterId": "1162263934",
    //     "isRecruiterAssignedVet": false,
    //     "certificates": [
    //         {
    //             "certificationName": "",
    //             "certificate": "",
    //             "issueDate": "",
    //             "expiryDate": "",
    //             "issuedby": null
    //         }
    //     ],
    //     "SkillsandIndustry": [],
    //     "AwardsandHonors": [],
    //     "language": [],
    //     "license": [],
    //     "experience": [
    //         {
    //             "employerName": "Testing ",
    //             "industry": "Audio/Video Technology",
    //             "jobTitle": "Check",
    //             "startDate": "2023-03-01",
    //             "endDate": "",
    //             "description": "Check This is Experience ",
    //             "isSelect": true
    //         }
    //     ],
    //     "education": [
    //         {
    //             "graduatedYear": "2023",
    //             "educationType": "GED",
    //             "educationProgram": "BS in Computer Engineering",
    //             "school": "Mumbai University",
    //             "major": "B.E in Computer Engineering"
    //         },
    //         {
    //             "graduatedYear": "2019",
    //             "educationType": "Secondary education",
    //             "educationProgram": "BS in Computer Engineering",
    //             "school": "California State University",
    //             "major": "B.E in Computer Engineering"
    //         }
    //     ],
    //     "customsection": [],
    //     "fullText": {
    //         "firstName": "Rodrik",
    //         "middleName": "",
    //         "lastName": "Clarke",
    //         "tenent": "Adobe",
    //         "cityName": "Mumbai",
    //         "stateName": "NA",
    //         "countryName": "India",
    //         "candidatePrimarySkills": [
    //             "ReactJS",
    //             "JavaScript",
    //             "Scheduling",
    //             "Prototyping",
    //             "Distributed Computing",
    //             "Storage Area Network (SAN)",
    //             "Presentations",
    //             "Unix",
    //             "Software Development",
    //             "Collaboration",
    //             "Systems Development",
    //             "Communications",
    //             "Interactive Data Language (IDL)",
    //             "Release Management",
    //             "Planning",
    //             "Integration",
    //             "Coordinating",
    //             "Operations",
    //             "Automation",
    //             "Java (Programming Language)",
    //             "Application Programming Interface (API)",
    //             "Sarbanes-Oxley Act (SOX) Compliance",
    //             "Product Support",
    //             "Software Engineering",
    //             "Product Planning",
    //             "Sales",
    //             "Infrastructure",
    //             "Management",
    //             "Customer Satisfaction",
    //             "Product Testing",
    //             "Product Design",
    //             "Embedded Systems",
    //             "Product Quality (QA/QC)",
    //             "Regulatory Compliance",
    //             "Operability",
    //             "Scripting",
    //             "Scalability",
    //             "Configuration Management",
    //             "Compilers",
    //             "Fault",
    //             "Debugging",
    //             "Software Design",
    //             "DBase",
    //             "MVS (OS)",
    //             "Peripheral Component Interconnect (PCI)",
    //             "Technical Training",
    //             "Network Management",
    //             "Digital Logic"
    //         ],
    //         "candidateSecondarySkills": [],
    //         "currentEmployer": "Mc Loren",
    //         "preferedLocation": [],
    //         "createdByTenant": "Adobe",
    //         "preferredRecSkills": [],
    //         "preferredRecLocations": [],
    //         "skillSet": []
    //     },
    //     "Privacy": []
    // }
    const params = props.route.params || {};
    const { candidateDetails, newCandidateEmail, parsedData, jobDetails, candidateData, recruiterData } = params;
    const [mandatoryScore, setMandatoryScore] = useState(0);
    const [locationScore, setLocationScore] = useState(0);
    const [educationScore, setEducationScore] = useState(0);
    const [experienceScore, setExperienceScore] = useState(0);
    const [jobTitleScore, setJobTitleScore] = useState(0);
    const [overallScore, setOverallScore] = useState(0);
    const [jobLowerCase, setJobLowerCase] = useState([]);
    const [primaryLowerCase, setPrimaryLowerCase] = useState([]);
    const popAction = StackActions.pop(7);
    const _popAction = StackActions.pop(10);
    // const [mandatoryScore, setMandatoryScore] = useState(0);
    // const [mandatoryScore, setMandatoryScore] = useState(0);

    useEffect(() => {
        if (jobDetails !== undefined && candidateData !== undefined) {

            calculateScore(jobDetails, candidateData);
        }
    }, [])

    // const [progressValue, setProgressValue] = useState(40);

    const AutomatchingParametersCard = ({ progressValue, title }) => {
        return (
            <View style={{ flex: 1, paddingHorizontal: 4, marginHorizontal: 10, paddingBottom: 10 }}>
                <CircularProgress
                    title={`${progressValue}%`}
                    radius={40}
                    value={progressValue}
                    maxValue={100}
                    initialValue={progressValue} // Change the progres bar 
                    progressValueColor={'#fff'}
                    activeStrokeWidth={3}
                    inActiveStrokeWidth={3}
                    activeStrokeColor={colors.newColor}
                    inActiveStrokeColor={'lightgray'}
                    circleBackgroundColor={colors.white}
                    titleColor={colors.black}
                    titleStyle={{ fontWeight: 'bold', flex: 1, marginTop: 5 }}
                    strokeColorConfig={[
                        { color: colors.hotJobColor, value: 10 },
                        { color: colors.notAttemptColor, value: 40 },
                        { color: colors.newColor, value: 100 },
                    ]}
                />
                <Text style={{ marginTop: 5, textAlign: "center", color: colors.black, fontSize: 10 }}>{title}</Text>
            </View>
        )
    }

    const login = (userName, passWord) => {
        if (baseViewRef !== null) {
            baseViewRef.current.showLoader();
            setTimeout(() => {
                loginUser(userName, passWord)
                    .then((response) => {
                        console.log(response);
                        findTenantid(userName)
                            .then((response) => {
                                baseViewRef.current.hideLoader();
                                props.navigation.reset({ // I did reset my stack using navigation.reset() instead of using popToTop
                                    index: 0,
                                    routes: [
                                        {
                                            name: "Home", //name of screen which you wan't to come back to it
                                            params: { isDialogOpen: true }, // params you wanna pass to the screen
                                        },
                                    ],
                                });
                            })
                            .catch((error) => {
                                baseViewRef.current.hideLoader();
                                showAlert('error', error);
                            })
                    })
                    .catch((error) => {
                        baseViewRef.current.hideLoader()
                        showAlert('error', error);
                    })
            }, 7000);
        }
    }

    const OverallBackgroundColor = (progressValue) => {

        if (progressValue >= 50)
            return colors.newColor;
        else if (progressValue >= 21)
            return colors.notAttemptColor;
        else
            return colors.hotJobColor;

    }

    const OverallScoreCard = ({ progressValue, title }) => {
        return (
            <View style={{ flex: 1, paddingHorizontal: 4, marginHorizontal: 10, paddingBottom: 10 }}>
                <CircularProgress
                    // title={`${progressValue}%`}
                    value={progressValue}
                    radius={40}
                    maxValue={100}
                    valueSuffix={'%'}
                    initialValue={progressValue} // Change the progres bar 
                    progressValueColor={'#fff'}
                    activeStrokeWidth={4}
                    inActiveStrokeWidth={4}
                    activeStrokeColor={colors.black}
                    inActiveStrokeColor={'lightgray'}
                    circleBackgroundColor={OverallBackgroundColor(progressValue)}
                    progressValueStyle={{ fontWeight: '500', color: colors.white, fontSize: 14 }}
                />
                <Text style={{ marginTop: 5, textAlign: "center", color: colors.black, fontSize: 10 }}>{title}</Text>
            </View>
        )
    }


    const _onApply = () => {
        if (baseViewRef !== null) {
            baseViewRef.current.showLoader();
            const _QandA = JSON.parse(jobDetails.QandA);

            const data = {
                ...candidateData,
            }

            if (_QandA.length > 0) {
                baseViewRef.current.hideLoader();
                props.navigation.navigate('Screening', { newCandidateEmail: newCandidateEmail, candidateData: data, parsedData: parsedData, jobDetails: jobDetails, recruiterData: recruiterData, _addTalent: _addTalent });
            } else {
                _addTalent(candidateData, data);
            }
        }


    }

    const _addTalent = (candidateData, data) => {
        addDsTalent(candidateData)
            .then((response) => {
                console.log('Add Dss Talent Api Passed');
                baseViewRef.current.hideLoader();
                if (response.data.value[0].key) {
                    const userName = response.userName;
                    const passWord = response.password;
                    const inviteUserPayload = {
                        candidateEmail: newCandidateEmail,
                        candidateFname: candidateData.firstName,
                        candidateId: response.data.value[0].key,
                        candidateImageURL: "",
                        candidateLname: candidateData.lastName,
                        candidateLocation: `${candidateData.addressCity},${candidateData.addressState},`,//Check this
                        candidateMname: "",
                        candidateStatus: "",
                        candidateTenant: candidateData.createdByTenant,
                        highestEducation: candidateData.highestLevelEducationType,
                        jobId: jobDetails.jobId,
                        jobLocation: jobDetails.workPlaceType, //Check by applying...
                        jobStatus: jobDetails.jobStatus,
                        jobTenant: jobDetails.jobTenant,
                        jobTitle: jobDetails.jobTitle,
                        jobType: jobDetails.jobType,
                        newInvite: true, // Change this later  // false this in 
                        payRate: candidateData.preferredSalary,
                        payRateCurrency: candidateData.preferredSalaryCurrency,
                        primarySkills: jobDetails.primarySkills,
                        recruiterName: candidateData.createdByName,
                        recruiterTenant: candidateData.createdByTenant,
                        tenantId: jobDetails.tenantId,
                        tenant_id: ""
                    }
                    invitedUser(inviteUserPayload)
                        .then((response) => {
                            if (response) {
                                baseViewRef.current.hideLoader();
                                console.log("Vetting Response");
                                console.log(response);
                                if (jobDetails.vettingDetails && jobDetails.vettingDetails.length > 0) {
                                    props.navigation.navigate('Vetting', { newCandidateEmail: newCandidateEmail, candidateData: data, parsedData: parsedData, jobDetails: jobDetails, recruiterData: recruiterData, inviteUserPayload: inviteUserPayload, userName: userName, passWord: passWord });
                                } else {
                                    showAlert('success', 'You have successfully applied for the job');
                                    login(userName, passWord);
                                    // async () => {
                                    //     dispatch(setSessionDetails(data));
                                    //     props.navigation.dispatch(_popAction)
                                    // }

                                    // navigate the user to login page ;
                                }
                            }
                        })
                        .catch((error) => {
                            console.log("Vetting error");
                            console.log(error);
                            baseViewRef.current.hideLoader();
                        })

                } else {
                    baseViewRef.current.hideLoader();
                    showAlert('error', 'Something went wrong');
                }

            })
            .catch((error) => {
                console.log('Add Dss Talent Api failed');
                baseViewRef.current.hideLoader();
                console.log(error);
                showAlert('error', 'Something went wrong');
            })
    }

    const calculateScore = (jobData, candidateData) => {
        let primary = 0;
        let location = 0;
        let education = 0;
        let jobTitle = 0;
        let experience = 0;
        let sum = 0;

        const jobLower = jobData.primarySkills.map(word => word.toLowerCase());
        const primaryLower = candidateData.primarySkills.map(word => word.toLowerCase());
        setJobLowerCase(jobLower);
        setPrimaryLowerCase(primaryLower);

        if (jobData) {
            jobLower.forEach((skill) => {
                if (primaryLower.includes(skill)) {
                    sum++;
                    primary++;
                }
            });
        }


        if (
            candidateData?.highestLevelEducationType?.toLowerCase().includes(jobData.education[0].toLowerCase())
        ) {
            sum++;
            education++;
        }
        if (
            candidateData?.education.map((item) => item?.educationType?.toLowerCase()).includes(jobData?.education[0].toLowerCase())
        ) {
            sum++;
            education++;
        }

        if (
            [
                candidateData.addressCity,
                ...candidateData.preferredLocation,
            ].includes(jobData.location.city)
        ) {
            sum++;
            location++;
        }
        if (
            jobData.isRemote &&
            candidateData.preferredLocation.includes("Remote")
        ) {
            sum++;
            location++;
        }

        if (candidateData.currentJobTitle === jobData.jobTitle) {
            sum++;
            jobTitle++;
        }
        if (candidateData.experienceLevel === jobData.experienceLevel) {
            sum++;
            experience++;
        } else if (
            candidateData?.experienceYear >= jobData?.experienceLevel?.charAt(0)
        ) {
            sum++;
            experience++;
        }
        let primaryAverage =
            jobData.primarySkills.length > 0
                ? Math.round((primary * 100) / jobData.primarySkills.length)
                : 0;

        let locationAverage = location ? 100 : 0;
        let jobTitleAverage = jobTitle ? 100 : 0;
        let experienceAvg = experience ? 100 : 0;
        let educationAvg = education ? 100 : 0;
        let totalAvg = Math.round((primaryAverage + locationAverage + jobTitleAverage + experienceAvg + educationAvg) / 5);

        console.log(primaryAverage, locationAverage, jobTitleAverage, experienceAvg, educationAvg, totalAvg);
        setMandatoryScore(primaryAverage);
        setLocationScore(locationAverage);
        setEducationScore(educationAvg);
        setExperienceScore(experienceAvg);
        setJobTitleScore(jobTitleAverage);
        setOverallScore(totalAvg);
    };






    const GeneralCard = () => {
        return (
            <View style={{ flex: 1, borderColor: "red" }}>
                <View style={{ flexDirection: "row", padding: 10, borderBottomWidth: 0.2, borderColor: 'gray' }}>

                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={styles.headerTitle}>Parameter</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={styles.headerTitle}>Matched</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={styles.headerTitle}>Gap</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.paramterBodyText}>Mandatory Skills</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", flexDirection: "row", flexWrap: 'wrap', justifyContent: "center" }}>
                        {
                            jobLowerCase?.map((skill) => (
                                primaryLowerCase.includes(skill) ?
                                    <TagButton
                                        disabled
                                        title={skill.toUpperCase()}
                                        containerStyle={styles.jobTagsContainer}
                                        disabledStyle={styles.jobTagsButton}
                                        disabledTitleStyle={styles.jobTagsTitle}
                                        parentStyle={{ marginRight: 5 }}
                                    />
                                    :
                                    null
                            ))
                        }

                    </View>
                    <View style={{ flex: 1, alignItems: "center", flexDirection: "row", flexWrap: 'wrap', justifyContent: "center" }}>
                        {
                            jobLowerCase?.map((skill) => (
                                primaryLowerCase.includes(skill) ?
                                    null
                                    :
                                    <TagButton
                                        disabled
                                        title={skill.toUpperCase()}
                                        containerStyle={styles.jobTagsContainer}
                                        disabledStyle={[styles.jobTagsButton, { backgroundColor: colors.hotJobColor, borderColor: colors.hotJobColor }]}
                                        disabledTitleStyle={styles.jobTagsTitle}
                                        parentStyle={{ marginRight: 5 }}
                                    />
                            ))
                        }
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.paramterBodyText}>Location</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <TagButton
                            disabled
                            title={jobDetails?.workPlaceType}
                            containerStyle={styles.jobTagsContainer}
                            disabledStyle={styles.jobTagsButton}
                            disabledTitleStyle={styles.jobTagsTitle}
                            parentStyle={{ marginRight: 5 }}
                        />
                    </View>
                    <View style={{ flex: 1, alignItems: "center", flexWrap: 'wrap' }}>
                        <Text></Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.paramterBodyText}>Job Title</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        {
                            candidateData?.currentJobTitle === jobDetails?.jobTitle ?
                                <TagButton
                                    disabled
                                    title={jobDetails?.jobTitle}
                                    containerStyle={styles.jobTagsContainer}
                                    disabledStyle={[styles.jobTagsButton]}
                                    disabledTitleStyle={styles.jobTagsTitle}
                                    parentStyle={{ marginRight: 5 }}
                                />
                                : null

                        }
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        {
                            candidateData?.currentJobTitle === jobDetails?.jobTitle ?
                                null
                                :
                                <TagButton
                                    disabled
                                    title={jobDetails?.jobTitle}
                                    containerStyle={styles.jobTagsContainer}
                                    disabledStyle={[styles.jobTagsButton, { backgroundColor: colors.hotJobColor, borderColor: colors.hotJobColor }]}
                                    disabledTitleStyle={styles.jobTagsTitle}
                                    parentStyle={{ marginRight: 5 }}
                                />
                        }
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.paramterBodyText}>Education</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        {
                            educationScore ?
                                <TagButton
                                    disabled
                                    title={jobDetails?.education[0]}
                                    containerStyle={styles.jobTagsContainer}
                                    disabledStyle={styles.jobTagsButton}
                                    disabledTitleStyle={styles.jobTagsTitle}
                                    parentStyle={{ marginRight: 5 }}
                                /> : null

                        }

                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        {
                            educationScore ?
                                null
                                :
                                <TagButton
                                    disabled
                                    title={jobDetails?.education[0]}
                                    containerStyle={styles.jobTagsContainer}
                                    disabledStyle={[styles.jobTagsButton, { backgroundColor: colors.hotJobColor, borderColor: colors.hotJobColor }]}
                                    disabledTitleStyle={styles.jobTagsTitle}
                                    parentStyle={{ marginRight: 5 }}
                                />

                        }
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={styles.paramterBodyText}>Experience Level</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        {
                            experienceScore ?
                                <TagButton
                                    disabled
                                    title={jobDetails?.experienceLevel}
                                    containerStyle={styles.jobTagsContainer}
                                    disabledStyle={styles.jobTagsButton}
                                    disabledTitleStyle={styles.jobTagsTitle}
                                    parentStyle={{ marginRight: 5 }}
                                />
                                :
                                null

                        }
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 3, justifyContent: "center" }}>
                        {
                            experienceScore ?
                                null
                                :
                                <TagButton
                                    disabled
                                    title={jobDetails?.experienceLevel}
                                    containerStyle={styles.jobTagsContainer}
                                    disabledStyle={[styles.jobTagsButton, { backgroundColor: colors.hotJobColor, borderColor: colors.hotJobColor }]}
                                    disabledTitleStyle={styles.jobTagsTitle}
                                    parentStyle={{ marginRight: 5 }}
                                />
                        }
                    </View>
                </View>
            </View>
        )
    }
    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            statusBarColor={colors.black}
            hasHeader headerParentStyle={{ backgroundColor: colors.white }}
            hasTitle headerTitle={'Score Card'}
            hasBack onBackPress={() => props.navigation.goBack()}
            {...props}
        >
            <View style={styles.parent}>
                <ScrollView contentContainerStyle={{ margin: 15, paddingBottom: 50 }}>
                    <Text style={{ color: colors.black, fontWeight: "bold", marginVertical: 20 }}>Automatching Parameters</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: "row" }}>
                        <OverallScoreCard progressValue={overallScore} title={'Overall'} />
                        <AutomatchingParametersCard progressValue={mandatoryScore} title={'Mandatory'} />
                        <AutomatchingParametersCard progressValue={locationScore} title={'Location'} />
                        <AutomatchingParametersCard progressValue={educationScore} title={'Education'} />
                        <AutomatchingParametersCard progressValue={experienceScore} title={'Experience'} />
                        <AutomatchingParametersCard progressValue={jobTitleScore} title={'Job Title'} />
                    </ScrollView>

                    <Text style={{ color: colors.black, fontWeight: "bold", marginVertical: 20 }}>General:</Text>
                    <GeneralCard />
                    <View style={{ marginTop: 20, marginLeft: 10 }}>
                        {
                            overallScore >= 50 ?
                                <>
                                    <Text style={{ color: colors.black, fontWeight: "bold", marginVertical: 20 }}>Great! You have made it. Your profile has matched, proceed to apply for the job.</Text>
                                    <View style={{ flex: 1 }}>
                                        <ButtonView
                                            title={'Apply'}
                                            containerStyle={{}}
                                            buttonStyle={{ backgroundColor: colors.accent, borderColor: colors.accent }}
                                            onPress={() => _onApply()}
                                        />
                                    </View>
                                </>
                                :
                                <>
                                    <Text style={{ color: colors.black, fontWeight: "bold", marginVertical: 20 }}>Unfortunately, your resume do not match with the job. In order to complete your application fulfill the gap mentioned above and apply again or you can join our community.</Text>
                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                                        <TagButton
                                            title={'Update Resume'}
                                            onPress={() => props.navigation.dispatch(popAction)}
                                            buttonStyle={{ backgroundColor: colors.acceptBtn, borderColor: colors.acceptBtn, paddingHorizontal: 20 }}
                                            titleStyle={{ color: '#fff' }}
                                        />
                                        <TagButton
                                            title={'Join our community'}
                                            onPress={() => alert()}
                                            buttonStyle={{ backgroundColor: colors.acceptBtn, borderColor: colors.acceptBtn, paddingHorizontal: 20 }}
                                            titleStyle={{ color: '#fff', alignItems: "center" }}
                                        />
                                    </View>
                                </>

                        }
                    </View>

                </ScrollView>
            </View>
        </BaseView>
    )
}

const styles = StyleSheet.create({
    parent: {
        backgroundColor: '#EEEEEE',
        flex: 1
    },
    headerTitle: {
        color: colors.black,
        fontSize: 14
    },
    paramterBodyText: {
        color: colors.black,
        fontSize: 12
    },
    jobTagsView: {
        flexDirection: "row",
        marginHorizontal: 20,
        flex: 1,
        flexWrap: "wrap",
        marginTop: -10
    },
    jobTagsContainer: {
        borderRadius: 3,
        // flexWrap: "nowrap"
        // height: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    jobTagsButton: {
        backgroundColor: colors.appliedColor,
        borderColor: colors.appliedColor,
        activeOpacity: 0.9,
    },
    jobTagsTitle: {
        color: colors.white,
        textAlign: "center",
        fontSize: 10,
    },
    circleView: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderRadius: 40
    }
})
export default ScoreCard