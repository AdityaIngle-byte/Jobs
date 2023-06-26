import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import ScreeningQuestionItem from './items/ScreeningQuestionItem'
import BaseView from '../hoc/BaseView'
import { colors } from '../../values/colors'
import ButtonView from '../components/ButtonView'

const Screening = (props) => {

    const detail = {
        "tenantData": "",
        "jobData": {
            "@search.score": 1,
            "jobId": "341827298",
            "jobTitle": "Mern Developer",
            "jobTenant": "Adobe",
            "jobType": "Full Time",
            "isRemote": false,
            "prefferedStartDate": "2023-05-22T14:37:58.467Z",
            "positionCount": 2,
            "allowedSubmittals": 10,
            "annualSalary": "145000",
            "activeFrom": "2023-03-22T14:37:58.468Z",
            "expiresOn": "2023-05-22T14:37:58.468Z",
            "placementFee": "1500",
            "placementCurrency": "USD",
            "usePrefferedSupplier": "",
            "projectCompletionDate": "",
            "contractDurationMonths": "1",
            "contractDurationDays": "0",
            "hourlyRate": "",
            "projectBudjet": "",
            "referalBonus": "",
            "referalBonusCurrency": "USD",
            "submittal": "",
            "jobDescription": "<p>Mern Developer</p>",
            "primarySkills": [
                "Java",
                "Python"
            ],
            "secondarySkills": [],
            "skillSet": [],
            "jobPostDate": "2023-03-27T11:41:12.392Z",
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
            "jobUpdatedTime": null,
            "favorites": null,
            "visaRequirement": "",
            "companyName": "",
            "companyJobId": "",
            "intakeId": null,
            "isFeePercentage": false,
            "experienceLevel": "1-3 years",
            "licenceRequirement": "",
            "notes": "",
            "minimumPay": "75000",
            "maximumPay": "145000",
            "additionalInfo": "[]",
            "QandA": "[{\"name\":\"Background Check\",\"question\":\"Are you willing to undergo a background check, in accordance with local law/regulations?\",\"isMandatory\":true},{\"name\":\"Drug Check\",\"question\":\"Are you willing to take a drug test, in accordance with local law/regulations?\",\"isMandatory\":true},{\"name\":\"Driving Licence\",\"question\":\"Do you have a valid driver's license?\",\"isMandatory\":true},{\"name\":\"Education\",\"question\":\"Have you completed the following level of education?\",\"input\":\"Bachelor's Degree\",\"isMandatory\":true},{\"name\":\"Industry Experience\",\"question\":\"How many years of following Industry experience do you currently have?\",\"input\":\"Information Technology\",\"isMandatory\":true},{\"name\":\"Work Experience\",\"question\":\"How many years of experience do you currently have?\",\"input\":\"Numeric\",\"isMandatory\":true},{\"name\":\"Location\",\"question\":\"Are you comfortable commuting to job's location?\",\"isMandatory\":true},{\"name\":\"Remote Work\",\"question\":\"Are you comfortable working in a remote setting?\",\"isMandatory\":true},{\"name\":\"Urgent Hiring Need\",\"question\":\"We must fill this position urgently. Can you start immediately?\",\"isMandatory\":true},{\"name\":\"Language\",\"question\":\"What is your level of proficiency in following Languages?\",\"input\":\"[\\\"English\\\"]\",\"isMandatory\":true}]",
            "workPlaceType": "Hybrid",
            "salaryType": "Annual",
            "salaryCurrency": "USD",
            "documents": "[]",
            "intakeDetails": null,
            "onsiteWorkDays": "3 days",
            "weightage": {
                "primarySkills": [
                    "Java",
                    "Python"
                ],
                "secondarySkills": [],
                "jobTitle": false,
                "location": false,
                "experienceLevel": true,
                "education": [],
                "industries": []
            },
            "vettingRequired": true,
            "screeningRequired": true,
            "vettingDetails": [
                {
                    "name": "Java",
                    "type": "General",
                    "status": false,
                    "duration": "",
                    "difficulty": ""
                }
            ],
            "isPublished": "No",
            "jobTenantId": "1",
            "prevJobStatus": null,
            "isDisqualifiedMailSend": null,
            "location": {
                "address": "Maricopa County, Arizona, United States",
                "city": "Maricopa County",
                "state": "Arizona",
                "zipcode": "85034",
                "country": "United States"
            },
            "tierData": [],
            "JobTierData": [],
            "fullText": {
                "jobTitle": "Mern Developer",
                "jobTenant": "Adobe",
                "primarySkills": [
                    "Java",
                    "Python"
                ],
                "secondarySkills": [],
                "location": {
                    "address": null,
                    "city": "Maricopa County",
                    "state": "Arizona",
                    "zipcode": null,
                    "country": "United States"
                }
            },
            "screeningQuestions": null
        }
    }
    const [QandA, setQandA] = useState([]);
    const [QandAValidation, setQandAValidation] = useState([])
    const baseViewRef = useRef(null);
    const [enableApply, setEnableApply] = useState(false);

    const params = props.route.params || {};
    const { candidateDetails, newCandidateEmail, parsedData, jobDetails, candidateData, recruiterData, _addTalent } = params;


    useEffect(() => {
        init()
        return () => {
            setEnableApply(false);
        };
    }, [])

    const init = () => {

        let QnA = JSON.parse(jobDetails.QandA)
        if (QnA.length > 0) {
            console.log("My Item");
            console.log(QnA);
            let finalQA = QnA.map(item => {
                if (!['Industry Experience', 'Work Experience', 'Custom Question', 'Language'].includes(item.name)) {
                    return { ...item, answer: 'No' }
                }
                else if (item.name === 'Language') {
                    return { ...item, answer: JSON.parse(item.input).map(i => ({ name: i, proficiency: 'Beginner' })) }
                }
                else if (item.name === 'Custom Question') {
                    return { ...item, answer: item.input === 'Yes/No' ? 'Yes' : '' }
                }
                else {
                    return item
                }
            })
            setQandA(finalQA)
            setQandAValidation(finalQA.map(i => ''))
        }
    }

    const onApply = () => {
        if (baseViewRef !== null) {
            baseViewRef.current.showLoader();
            const data = {
                ...candidateData
            }
            _addTalent(candidateData, data);
            baseViewRef.current.hideLoader();
        }
    }



    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            // statusBarColor={colors.black}
            hasHeader headerParentStyle={{ backgroundColor: colors.white }}
            hasTitle headerTitle={'Screening Questions'}
            hasBack onBackPress={() => props.navigation.goBack()}
        >
            <ScrollView style={styles.parent}>
                <View style={{ margin: 15 }}>
                    <Text style={{ fontWeight: "bold", color: colors.black, fontSize: 16, marginBottom: 10 }}>You are almost there, please answer the following screening questions and complete your application</Text>
                    <Text style={{ fontSize: 12, marginBottom: 10 }}>
                        *If answers of questions given below are "No", we are unable to proceed your application.
                    </Text>
                </View>
                <ScreeningQuestionItem
                    QandA={QandA}
                    setQandA={setQandA}
                    QandAValidation={QandAValidation}
                    setEnableApply={(value) => setEnableApply(value)}
                    enableApply={enableApply}
                    _onApply={onApply}
                />
            </ScrollView>
        </BaseView>
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

})

export default Screening



