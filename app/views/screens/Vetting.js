import React, { useState, useRef, useEffect } from 'react';
import { Alert, StyleSheet, Text, Pressable, View } from 'react-native';
import BaseModal from '../hoc/BaseModal';
import HeaderModal from '../components/HeaderModal';
import TagButton from '../components/TagButton';
import { colors } from '../../values/colors';
import axios from 'axios';
import { invitedMail } from '../../redux/actions/careerActions';
import { showAlert } from '../../utils/Message';
import BaseView from '../hoc/BaseView';
import { loginUser, findTenantid } from '../../redux/actions/loginActions';


const Vetting = (props) => {

    const params = props.route.params || {};
    const { candidateDetails, newCandidateEmail, parsedData, jobDetails, candidateData, recruiterData, inviteUserPayload, userName, passWord } = params;

    const [modalVisible, setModalVisible] = useState(false);
    const [vettingDB, setVettingDB] = useState([]);
    const baseModalRef = useRef(null);
    const [vettingAssign, setVettingAssign] = useState([]);
    const [testAssign, setTestAssign] = useState([]);
    const [invited, setInvited] = useState(false);

    const baseViewRef = useRef(null);

    useEffect(() => {
        _init();
    }, [])

    const _init = () => {
        if (baseModalRef !== null) {
            baseModalRef.current.showModal();
            setModalVisible(true);
        }
        if (jobDetails.vettingDetails && jobDetails.vettingDetails.length > 0) {
            let vettingData = typeof (jobDetails.vettingDetails) === 'string' ? JSON.parse(jobDetails.vettingDetails) : jobDetails.vettingDetails
            // setVettingDetails(vettingData)
            fetchVetting(vettingData)
        }
    }


    // const fetchVetting = async (vetting) => {
    //     debugger;
    //     // baseViewRef.current.showLoader()
    //     const res = await axios.get(
    //         "https://high5newuat-api.azurewebsites.net/vetting/tests/all",
    //         {
    //             headers: { token: "df$rtu*om*xc:d11m05h5hzsAqrCh" },
    //         }
    //     );
    //     let vett = res.data.filter((i) => i.skills.length === 1);
    //     setVettingDB(vett);
    //     let vettings = [];
    //     let skills = vett.map((i) => i.skills[0]);
    //     let DB = [...vetting].map((i) => ({
    //         ...i,
    //         duration: i.duration?.split(" ")[0],
    //         type: i.type === "Video MCQ" ? "Video" : i.type,
    //     }));
    //     DB.map((item) => {
    //         if (skills.includes(item.name)) {
    //             let obj = vett.find((i) => i.skills.includes(item.name));
    //             if (
    //                 obj.testCategory === item.type &&
    //                 obj.details.duration === item.duration
    //             ) {
    //                 vettings.push(obj._id);
    //             }
    //         }
    //     });
    //     setVettingAssign(vettings);
    //     // baseViewRef.current.hideLoader()
    // };



    const fetchVetting = async (vetting) => {
        await axios.get(`https://high5newuat-api.azurewebsites.net/vetting/tests/all`, { headers: { token: "df$rtu*om*xc:d11m05h5hzsAqrCh" } })
            .then((res) => {
                let vett = res.data;
                setVettingDB(vett);
                let vettings = [];
                let vettingDetails = [];
                let arr = [];
                let skill = vett?.map((i) => i.skills);
                let skills = Array.prototype.concat.apply([], skill);
                let DB =
                    vetting !== null &&
                    [...vetting]?.map((i) => ({
                        ...i,
                        duration: i.duration?.split(" ")[0],
                        type: i.type === "Video MCQ" ? "Video" : i.type,
                    }));
                DB.map((item) => {
                    // if (skills.includes(item.name)) {
                    const myArrayFiltered = vett.filter((el) => {
                        return vetting.map((f) => {
                            return el.skills.filter((e) => {
                                if (f.name === e) arr.push(el);
                            });
                        });
                    });
                    arr.forEach((element) => {
                        if (
                            element.testName.toLowerCase() == item.name.toLowerCase() &&
                            element.testCategory == item.type &&
                            element.details.duration == item.duration &&
                            element.difficulty == item.difficulty
                        ) {
                            vettings.push(element._id);
                            let vetObj = {
                                testId: element._id,
                                testName: element.testName,
                                testCategory: element.testCategory,
                                duration: element.details.duration,
                            };
                            vettingDetails.push(vetObj);
                        }
                    });
                    // }
                });
                let temp = [...new Set(vettings)];
                let arrVet = [];
                let brr = [];
                vettingDetails.map((elem) => {
                    if (!arrVet.includes(elem.testId)) {
                        arrVet.push(elem.testId);
                        brr.push(elem);
                    }
                });

                setVettingAssign(temp);
                setTestAssign(brr);
                // props.setFetchVettingData(temp);
                // props.setVettingData(brr);
                // setLoading(false);
            })
            .catch((error) => {
                console.log("ERR", error);
                // setLoading(false);
            });
    }


    const proceedToVetting = () => {
        if (vettingAssign.length > 0) {

            const reviewer = {
                firstName: recruiterData?.firstName,
                lastName: recruiterData?.lastName,
                reviewerEmail: recruiterData?.email,
                instructions: "",
            };


            let body = {
                reviewer: reviewer,
                createdBy: {
                    id: recruiterData.ID_user,
                    firstName: recruiterData.firstName,
                    lastName: recruiterData.lastName,
                    role: "user",
                },
                modifiedBy: {
                    id: "62fb9ad4cb6714dd6540e2cf",
                    firstName: "John",
                    lastName: "Wang",
                    role: "user",
                },
                companyInfo: { companyName: candidateData.createdByTenant },
                name: candidateData.firstName,
                firstName: candidateData.firstName,
                lastName: candidateData.lastName,
                email: candidateData.email,
                recruiterEmail: "",
                high5hireCandidateId: inviteUserPayload.candidateId, // Check if userId is present 
                jobId: jobDetails.jobId,
                jobTitle: jobDetails.jobTitle,
                testsAssign: testAssign,
                testInvited: true,
                expiryDays: 7,
                takesForTest: 3,
                tenantid: candidateData.tenantId,
            };

            console.log(body);
            invitedMail(body)
                .then((response) => {
                    console.log(response);
                    setInvited(true);
                    showAlert('success', 'You have successfully applied for the job');
                })
                .catch((error) => {
                    console.log(error);
                    showAlert('error', 'Something went wrong');
                    props.navigation.goBack();
                })
        }
    }

    const _closeModal = () => {
        setModalVisible(false);
        baseModalRef.current.hideModal();
        props.navigation.goBack();
    }

    const login = (userName, passWord) => {
        props.navigation.reset({
            index: 0,
            routes: [
                {
                    name: "JobDescription",
                    params: { login: true, userName: userName, passWord: passWord }
                },
            ],
        });
    }




    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            statusBarColor={colors.black}
            hasHeader headerParentStyle={{ backgroundColor: colors.white }}
            hasTitle headerTitle={'Vetting'}
            hasBack onBackPress={() => props.navigation.goBack()}
            {...props}
        >
            <BaseModal
                ref={baseModalRef}
                easing="linear"
            >
                <View
                    style={{ borderRadius: 12 }}
                >
                    <HeaderModal
                        title={'Vetting Requirement'}
                        // onCrossPress={_closeModal}
                        noCross
                    />
                    <View style={styles.container}>
                        {
                            !invited ?
                                <>
                                    <Text style={styles.bodyText}>One last step! The hiring manager is looking for the vetted talent.</Text>
                                    <View style={styles.row}>
                                        <Text style={styles.proceed}>To proceed</Text>
                                        <TagButton
                                            modalVisible={modalVisible}
                                            title={'Click here'}
                                            onPress={proceedToVetting}
                                            buttonStyle={{ backgroundColor: colors.newColor, borderColor: colors.newColor }}
                                            containerStyle={{ marginBottom: 5 }}
                                            titleStyle={{ color: '#fff' }}
                                            size={'large'}
                                        />
                                    </View>
                                </>
                                :
                                <>
                                    <Text style={styles.bodyText}>We have mailed you the details of all the assigned assessments.</Text>
                                    <Text style={[styles.bodyText, { marginHorizontal: 4 }]}>Please check and complete the assessment.</Text>
                                    <TagButton
                                        modalVisible={modalVisible}
                                        title={'Close'}
                                        onPress={() => login(userName, passWord)}
                                        buttonStyle={{ backgroundColor: colors.newColor, borderColor: colors.newColor }}
                                        containerStyle={{ marginBottom: 5, width: '50%', alignSelf: "center" }}
                                        titleStyle={{ color: '#fff' }}
                                        size={'large'}
                                    />

                                </>
                        }

                    </View>
                </View>
            </BaseModal>
        </BaseView>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    row: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6
    },
    container: {
        paddingBottom: 24,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        width: '100%',
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16
    },
    proceed: {
        marginRight: 8,
        color: colors.black,
        fontWeight: '500',
        fontSize: 13
    },
    bodyText: {
        // paddingHorizontal: 10,
        color: colors.black,
        fontWeight: '500',
        fontSize: 13,
        marginTop: 10
    }
});

export default Vetting;