import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BaseView from '../hoc/BaseView'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'
import { Switch } from '@rneui/themed'
import InputView2 from '../components/InputView2'
import PickerView from '../components/PickerView'
import SingleSelectModal from '../modals/SingleSelectModal'
import { currencyList } from '../../json/currencyList'
import { acceptOnlyNumbers } from '../../utils/Validations'
import ButtonView from '../components/ButtonView'
import { editCandidateDetails } from '../../redux/actions/homeActions'
import { showAlert } from '../../utils/Message'
import { setPreferences } from '../../redux/actions/homeActions'
import { useDispatch, useSelector } from 'react-redux'

const EditPreferences = (props) => {

    const baseViewRef = useRef(null)
    const [fullTimeJobToggle, setFullTimeJobToggle] = useState(false);
    const [contractJobToggle, setContractJobToggle] = useState(false);
    const [remoteToggle, setRemoteToggle] = useState(false);
    const [hybridToggle, setHybridToggle] = useState(false);
    const [preferredAnnualSalary, setPreferredAnnualSalary] = useState('');
    const [preferredAnnualSalaryCurrency, setPreferredAnnualSalaryCurrency] = useState('USD');
    const [preferredHourlySalary, setPreferredHourlySalary] = useState('');
    const [preferredHourlySalaryCurrency, setPreferredHourlySalaryCurrency] = useState('USD');
    const [flag, setFlag] = useState(0);
    const preferences = useSelector(state => state.home.preferences)

    // const [fullTimeJobToggle, setFullTimeJobToggle] = useState(false);

    const params = props.route.params || {};
    const { candidateDetails } = params;
    const dispatch = useDispatch();

    const singleSelectModal = useRef(null)


    useEffect(() => {
        _init();
    }, [])

    const _init = () => {
        console.log("The redux preference");
        console.log(preferences);
        if (preferences.preferredSalary) {
            setFullTimeJobToggle(true);
            setPreferredAnnualSalary(preferences.preferredSalary);
            setPreferredAnnualSalaryCurrency(preferences.preferredSalaryCurrency)
        }

        if (preferences.minContractRate) {
            setContractJobToggle(true);
            setPreferredHourlySalary(preferences.minContractRate);
            setPreferredHourlySalaryCurrency(preferences.minContractRateCurrency)
        }

        if (preferences.preferedLocations.includes('Hybrid')) {
            setHybridToggle(true);
        }

        if (preferences.preferedLocations.includes('Remote')) {
            setRemoteToggle(true);
        }

    }

    const _onSave = () => {

        if (fullTimeJobToggle && preferredAnnualSalary === "") {
            showAlert("error", "please enter expected annual salary");
            return;
        }

        if (contractJobToggle && preferredHourlySalary === "") {
            showAlert("error", "please enter expected hourly salary");
            return;
        }

        const preferenceData = {
            minContractRate: preferredHourlySalary,
            minContractRateCurrency: preferredHourlySalaryCurrency,
            preferredSalary: preferredAnnualSalary,
            preferredSalaryCurrency: preferredAnnualSalaryCurrency,
            preferedLocations: hybridToggle ? ['Hybrid'] : ['Remote']
        }

        if (baseViewRef !== null) {
            baseViewRef.current.showLoader();
            const data = {
                ...candidateDetails,
                minContractRate: preferredHourlySalary,
                minContractRateCurrency: preferredHourlySalaryCurrency,
                preferredSalary: preferredAnnualSalary,
                preferredSalaryCurrency: preferredAnnualSalaryCurrency,
                preferedLocations: hybridToggle ? ['Hybrid'] : ['Remote']
            }
            editCandidateDetails(data)
                .then((response) => {
                    dispatch(setPreferences(preferenceData));
                    baseViewRef.current.hideLoader();
                    showAlert('success', 'Updated successfully');
                    props.navigation.goBack();
                })
                .catch((error) => {
                    console.log(error);
                    showAlert('error', 'Something went wrong');
                    baseViewRef.current.hideLoader();
                })
        }

    }

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar statusBarColor={colors.black}
            hasHeader headerParentStyle={{ backgroundColor: colors.white }}
            hasBack
            onBackPress={() => props.navigation.goBack()}
            hasTitle headerTitle='Preferences'
        >
            <View style={styles.parent}>
                <View style={styles.row}>
                    <Text>I'm intersted in Full-Time Job Types</Text>
                    <Switch
                        value={fullTimeJobToggle}
                        onValueChange={(value) => setFullTimeJobToggle(value)}
                        color={colors.newColor}
                    />
                </View>
                {
                    fullTimeJobToggle &&
                    <View>
                        <InputView2
                            // {...props}
                            style={{ marginHorizontal: 18, marginVertical: 4 }}
                            label={'Let us know your preferred annual salary*'}
                            onChangeText={salary => setPreferredAnnualSalary(acceptOnlyNumbers(salary))}
                            placeholder={'Let us know your preferred annual salary'}
                            value={preferredAnnualSalary}
                            // error={error}
                            // touched={touched}
                            keyboardType={'numeric'}
                        />

                        <PickerView
                            disabled={preferredAnnualSalary == '' ? true : false}
                            fontValueSize={16}
                            label={preferredAnnualSalaryCurrency === '' ? '' : 'Currency Type'}
                            value={preferredAnnualSalaryCurrency === '' ? 'Currency Type' : preferredAnnualSalaryCurrency}
                            parentStyle={{ marginHorizontal: 18, marginVertical: 10 }}
                            pickerStyle={{ height: 66 }}
                            onPress={() => {
                                setFlag(1)
                                if (singleSelectModal !== null) {
                                    singleSelectModal.current.baseModal.showModal()
                                    singleSelectModal.current.init(currencyList)
                                }
                            }}
                            rowStyle={{ backgroundColor: preferredAnnualSalary == '' ? colors.textInputBorderColor : colors.white }}
                        />
                    </View>
                }
                <View style={styles.row}>
                    <Text>I'm intersted in Contract Job Types</Text>
                    <Switch
                        value={contractJobToggle}
                        onValueChange={(value) => setContractJobToggle(value)}
                        color={colors.newColor}
                    />
                </View>
                {
                    contractJobToggle &&
                    <View>
                        <InputView2
                            // {...props}
                            style={{ marginHorizontal: 18, marginVertical: 4 }}
                            label={'Let us know your preferred hourly salary*'}
                            onChangeText={salary => setPreferredHourlySalary(acceptOnlyNumbers(salary))}
                            placeholder={'Let us know your preferred hourly salary*'}
                            value={preferredHourlySalary}
                            // error={error}
                            // touched={touched}
                            keyboardType={'numeric'}
                        />

                        <PickerView
                            disabled={preferredHourlySalaryCurrency == '' ? true : false}
                            fontValueSize={16}
                            label={preferredHourlySalaryCurrency === '' ? '' : 'Currency Type'}
                            value={preferredHourlySalaryCurrency === '' ? 'Currency Type' : preferredHourlySalaryCurrency}
                            parentStyle={{ marginHorizontal: 18, marginVertical: 10 }}
                            pickerStyle={{ height: 66 }}
                            onPress={() => {
                                setFlag(2)
                                if (singleSelectModal !== null) {
                                    singleSelectModal.current.baseModal.showModal()
                                    singleSelectModal.current.init(currencyList)
                                }
                            }}
                            rowStyle={{ backgroundColor: preferredAnnualSalary == '' ? colors.textInputBorderColor : colors.white }}
                        />
                    </View>
                }
                <View style={styles.row}>
                    <Text>Open for hybrid?</Text>
                    <Switch
                        value={hybridToggle}
                        onValueChange={(value) => setHybridToggle(value)}
                        color={colors.newColor}
                    />
                </View>
                <View style={styles.row}>
                    <Text>Open for remote?</Text>
                    <Switch
                        value={remoteToggle}
                        onValueChange={(value) => setRemoteToggle(value)}
                        color={colors.newColor}
                    />
                </View>
                <SingleSelectModal
                    ref={singleSelectModal}
                    onSetItem={(item) => {
                        if (flag == 1) {
                            setPreferredAnnualSalaryCurrency(item.name)
                        } else if (flag == 2) {
                            setPreferredHourlySalaryCurrency(item.name)
                        }
                    }}
                />

                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <ButtonView
                        title={'Save'}
                        containerStyle={{ margin: 16 }}
                        buttonStyle={{ backgroundColor: colors.accent, borderColor: colors.accent }}
                        onPress={_onSave}
                    />
                </View>
            </View>
        </BaseView>
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },
    row: {
        margin: 10,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export default EditPreferences