import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { Card } from 'react-native-elements'
import { colors } from '../../../values/colors';
import { Switch } from "@rneui/themed";
import { fonts } from '../../../values/fonts';
import InputView2 from '../../components/InputView2';
import { profileStyles } from '../profile/profileStyles';
import SelectDropdown from 'react-native-select-dropdown';
import ButtonView from '../../components/ButtonView';


const ScreeningQuestionItem = ({ QandA, setQandA, QandAValidation, enableApply, setEnableApply, _onApply }) => {
    const [pref, setPref] = useState([
        { title: 'Beginner' }, { title: 'Intermediate' }, { title: 'Expert' }]);
    const [flag, setFlag] = useState(0);



    const handleRadioChange = (index, checked) => {
        console.log("This is handle radio chgange");
        let current = [...QandA]
        console.log(current);
        current[index] = { ...current[index], answer: current[index].answer === 'Yes' ? 'No' : 'Yes' }
        console.log(current[index]);
        _checkApply(current)
        setQandA(current)
    }

    const handleChange = (value, index) => {
        console.log("This is handle  chgange");
        let current = [...QandA]
        current[index] = { ...current[index], answer: value }
        console.log(current[index]);
        _checkApply(current);
        setQandA(current)
    }

    const _checkApply = (current) => {
        let flag = 0
        current.map((it) => {
            if ('answer' in it) {
                if (it.answer === 'No' || it.answer === '') {
                    flag = flag + 1;
                }
            } else {
                flag = flag + 1;
            }
        })

        if (flag == 0) {
            setEnableApply(true);
        } else {
            setEnableApply(false);
        }
    }



    // return (
    //     <div className='card card-flat bg-gray4 m-3'>
    //         <div className='card-body'>
    //             <div className='d-flex'>
    //                 <label className='ml-auto'>*Denotes Mandatory Question</label>
    //             </div>
    //             {
    //                 QandA.map((item, index) => 
    //                     <div className='d-flex m-3'>
    //                         <div>
    //                             <span>{index+1}</span>
    //                         </div>
    //                         <div className='ml-3 mb-3'>
    //                             {item.question}{item.isMandatory ? '*' : null}
    //                             { ['Industry Experience', 'Education'].includes(item.name) &&
    //                             <div className='m-1'>
    //                                 <small><strong>{item.input}</strong></small>
    //                             </div>} 
    //                             <div className='row mt-2'>
    //                                 {   
    //                                     !['Industry Experience', 'Work Experience', 'Custom Question', 'Language'].includes(item.name) &&
    //                                     <div className='col-lg-12 d-flex m-2'>
    //                                         <div className="form-check font-14 form-switch d-flex align-items-center">

    //                                             <input
    //                                                 name="isHotJob"
    //                                                 className="form-check-input mr-2"
    //                                                 type="checkbox"
    //                                                 id="hotJobSwitch"
    //                                                 //checked={item.answer === 'Yes'} 
    //                                                 onChange={(e) => handleRadioChange(index, e.target.checked)}
    //                                             />
    //                                             <label
    //                                                 className="form-check-label pt-0"
    //                                             >
    //                                                 Yes
    //                                             </label>
    //                                         </div>
    //                                     </div>
    //                                 }
    //                                 {
    //                                     item.name === 'Custom Question' &&
    //                                     <div>
    //                                         { item.input === 'Yes/No' &&
    //                                             <div className='d-flex m-2'>
    //                                                 <div className="form-check font-14 form-switch d-flex align-items-center">
    //                                                     <label
    //                                                         className="form-check-label pt-0"
    //                                                     >
    //                                                         Yes
    //                                                     </label>
    //                                                     <input
    //                                                         name="isHotJob"
    //                                                         className="form-check-input ml-2"
    //                                                         type="checkbox"
    //                                                         id="hotJobSwitch"
    //                                                         checked={item.answer === 'Yes'} 
    //                                                         onChange={(e) => handleRadioChange(index, e.target.checked, 'Yes')}
    //                                                     />
    //                                                 </div>
    //                                                 <div className="form-check font-14 form-switch d-flex align-items-center">
    //                                                     <label
    //                                                         className="form-check-label pt-0"
    //                                                     >
    //                                                         No
    //                                                     </label>
    //                                                     <input
    //                                                         name="isHotJob"
    //                                                         className="form-check-input ml-2"
    //                                                         type="checkbox"
    //                                                         id="hotJobSwitch"
    //                                                         checked={item.answer === 'No'} 
    //                                                         onChange={(e) => handleRadioChange(index, e.target.checked, 'No')}                            
    //                                                     />
    //                                                 </div>
    //                                             </div>
    //                                         }
    //                                         {
    //                                             item.input === 'Numeric' &&
    //                                             <div className='d-flex' style={{ width: '7rem' }}>
    //                                                 <div>
    //                                                     <input                                  
    //                                                         type="number"
    //                                                         min='0'
    //                                                         className={QandAValidation[index] ? "border border-danger" : ""}
    //                                                         placeholder="Years"
    //                                                         onChange={(e) => handleChange(e.target.value, index)}
    //                                                         value={item.answer}                      
    //                                                     />                    
    //                                                 </div>
    //                                             </div>
    //                                         }
    //                                         {
    //                                             item.input === 'Text' &&
    //                                             <div>
    //                                                 <div className='form-floating'>
    //                                                     <input
    //                                                         type='text'
    //                                                         className={ QandAValidation[index] ? 'form-control border border-danger' : 'form-control'}
    //                                                         value={item.answer}
    //                                                         placeholder='Answer'
    //                                                         onChange={(e) => handleChange(e.target.value, index)}
    //                                                     />
    //                                                     <label>Answer</label>
    //                                                     { QandAValidation[index] &&
    //                                                     <small className='ml-1 mt-1 validation'>{QandAValidation[index]}</small> }
    //                                                 </div>
    //                                             </div>
    //                                         }
    //                                         {
    //                                             item.input === 'Long Text' &&
    //                                             <div>
    //                                                 <div className='form-floating'>
    //                                                     <textarea                              
    //                                                         className={ QandAValidation[index] ? 'form-control border border-danger' : 'form-control'}
    //                                                         value={item.answer}
    //                                                         onChange={(e) => handleChange(e.target.value, index)}
    //                                                     />
    //                                                     { QandAValidation[index] &&
    //                                                     <small className='ml-1 mt-1 validation'>{QandAValidation[index]}</small> }
    //                                                 </div>
    //                                             </div>
    //                                         }
    //                                     </div>
    //                                 }
    //                                 {
    //                                     ['Industry Experience', 'Work Experience'].includes(item.name) &&
    //                                     <>
    //                                         <div className='d-flex' style={{ width: '7rem' }}>
    //                                             <div>
    //                                                 <input                                  
    //                                                     type="number"
    //                                                     min='0'
    //                                                     className={QandAValidation[index] ? "border border-danger" : "form-contro"}
    //                                                     placeholder="Years"
    //                                                     onChange={(e) => handleChange(e.target.value, index)}
    //                                                     value={item.answer}                      
    //                                                 />                    
    //                                             </div>
    //                                         </div>
    //                                         { QandAValidation[index] &&
    //                                         <small className='ml-1 mt-1 validation'>{QandAValidation[index]}</small> } 
    //                                     </>                      
    //                                 }
    //                                 {
    //                                     item.name === 'Language' &&
    //                                     <div className='col-lg-12'>
    //                                         {
    //                                             item.answer.map((item2, index2) => 
    //                                                 <div className='row m-2 d-flex align-items-center'>
    //                                                     <div className='col-lg-4'>
    //                                                         <strong>{item2.name}</strong>
    //                                                     </div>
    //                                                     <div className='col-lg-7'>
    //                                                         <div className='form-floating w-100'>
    //                                                             <select 
    //                                                                 className='form-control' 
    //                                                                 onChange={(e) => {
    //                                                                     console.log('VALUE', e.target.value)
    //                                                                     let QA = [...QandA]
    //                                                                     let ans = [...item.answer]
    //                                                                     ans[index2] = { ...ans[index2], proficiency: e.target.value }
    //                                                                     QA[index] = { ...QA[index], answer: ans }
    //                                                                     console.log('QA', QA)
    //                                                                     setQandA(QA)
    //                                                                 }}
    //                                                             >
    //                                                                 <option selected={item2.proficiency === ''} disabled>Select</option>
    //                                                                 {
    //                                                                     ['Beginner', 'Intermediate', 'Expert'].map(val =>                                                                           
    //                                                                         <option selected={val === item2.proficiency} value={val}>{val}</option>
    //                                                                     )
    //                                                                 }
    //                                                             </select>
    //                                                             <label>Proficiency</label>
    //                                                         </div>
    //                                                     </div>
    //                                                 </div>
    //                                             )
    //                                         }
    //                                     </div>
    //                                 }
    //                             </div>                         
    //                         </div>
    //                     </div>
    //                 )
    //             }
    //         </div>
    //     </div>
    // )
    return (
        <View>

            {QandA.map((item, index) => {
                console.log(QandA);
                return (

                    <View style={{ flex: 1, padding: 10, margin: 5 }}>
                        <View style={{ flexDirection: "row" }}>
                            <View>
                                <Text style={{ fontWeight: "bold", fontFamily: fonts.notoSansMedium }}>{index + 1 + ')'}</Text>
                            </View>
                            <View>
                                <Text style={styles.textColor}> {item.question}{item.isMandatory ? ' *' : null}</Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            {['Industry Experience', 'Education'].includes(item.name) &&
                                <View>
                                    <Text style={{ fontWeight: "bold", fontFamily: fonts.notoSansMedium }}>{item.input}</Text>
                                </View>
                            }
                        </View>
                        {
                            !['Industry Experience', 'Work Experience', 'Custom Question', 'Language'].includes(item.name) &&
                            <View style={{ padding: 5 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Switch
                                        value={item.answer === 'Yes'}
                                        onValueChange={() => handleRadioChange(index)}
                                        color={item.answer === 'Yes' ? colors.newColor : colors.placeholderTextColor}
                                    />
                                    <Text>Yes</Text>
                                </View>
                            </View>
                        }
                        {
                            item.name === 'Custom Question' &&
                            <View>
                                {
                                    item.input === 'Yes/No' &&
                                    <View>
                                        <View style={{ padding: 5 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <Switch
                                                    value={item.answer === 'Yes'}
                                                    onValueChange={() => handleRadioChange(index)}
                                                    color={item.answer === 'Yes' ? colors.newColor : colors.placeholderTextColor}
                                                />
                                                <Text>Yes</Text>
                                            </View>
                                        </View>
                                        <View style={{ padding: 5 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <Switch
                                                    value={item.answer === 'No'}
                                                    onValueChange={() => handleRadioChange(index)}
                                                    color={item.answer === 'No' ? colors.newColor : colors.placeholderTextColor}
                                                />
                                                <Text>No</Text>
                                            </View>
                                        </View>
                                    </View>
                                }
                            </View>
                        }
                        {
                            (item.input === 'Numeric' || ['Industry Experience', 'Work Experience'].includes(item.name)) &&
                            <>
                                <View style={{ padding: 5, alignItems: 'flex-end' }}>
                                    <View style={{ width: 80, height: 40, borderRadius: 3, borderWidth: 1, justifyContent: "center", alignItems: "center" }}>
                                        {/* <input                                  
                                        type="number"
                                        min='0'
                                        className={QandAValidation[index] ? "border border-danger" : ""}
                                        placeholder="Years"
                                        onChange={(e) => handleChange(e.target.value, index)}
                                        value={item.answer}                      
                                    /> */}
                                        <TextInput
                                            placeholder='Years'
                                            value={item.answer}
                                            keyboardType='number-pad'
                                            onChangeText={text => handleChange(text, index)}
                                        />
                                    </View>
                                </View>
                                <View style={{ alignItems: "flex-end" }}>
                                    {QandAValidation[index] ?
                                        <Text style={styles.error}>{QandAValidation[index]}</Text> : null
                                    }
                                </View>
                            </>

                        }

                        {/* {
                            item.input === 'Text' &&
                            <div>
                                <div className='form-floating'>
                                    <input
                                        type='text'
                                        className={ QandAValidation[index] ? 'form-control border border-danger' : 'form-control'}
                                        value={item.answer}
                                        placeholder='Answer'
                                        onChange={(e) => handleChange(e.target.value, index)}
                                    />
                                    <label>Answer</label>
                                    { QandAValidation[index] &&
                                    <small className='ml-1 mt-1 validation'>{QandAValidation[index]}</small> }
                                </div>
                            </div>
                        } */}
                        {
                            item.input === 'Text' &&
                            <View style={{ padding: 5, margin: 10, flex: 1 }}>
                                <View style={{ height: 40, borderRadius: 3, borderWidth: 1, flex: 1 }}>
                                    <TextInput
                                        placeholder='Answer'
                                        value={item.answer}
                                        onChangeText={text => handleChange(text, index)}
                                    />
                                </View>
                                <View style={{ alignItems: "flex-end" }}>
                                    {QandAValidation[index] ?
                                        <Text style={styles.error}>{QandAValidation[index]}</Text> : null
                                    }
                                </View>
                            </View>
                        }
                        {/* {
                            item.input === 'Long Text' &&
                            <div>
                                <div className='form-floating'>
                                    <textarea                              
                                        className={ QandAValidation[index] ? 'form-control border border-danger' : 'form-control'}
                                        value={item.answer}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                    />
                                    { QandAValidation[index] &&
                                    <small className='ml-1 mt-1 validation'>{QandAValidation[index]}</small> }
                                </div>
                            </div>
                        } */}
                        {
                            item.input === 'Long Text' &&
                            <View style={{ padding: 5, margin: 10, flex: 1 }}>
                                <View style={{ borderRadius: 3, borderWidth: 1, flex: 1 }}>
                                    <TextInput
                                        value={item.answer}
                                        onChangeText={text => handleChange(text, index)}
                                        multiline
                                        style={profileStyles.multiLineTextInputStyle}
                                    />
                                </View>
                                <View style={{ alignItems: "flex-end" }}>
                                    {QandAValidation[index] ?
                                        <Text style={styles.error}>{QandAValidation[index]}</Text> : null
                                    }
                                </View>
                            </View>
                        }


                        {
                            item.name === 'Language' &&
                            <View>
                                {
                                    item.answer.map((item2, index2) =>
                                        <View style={{ flex: 1, margin: 5, padding: 5, marginLeft: 15, flexDirection: "row", alignItems: "center" }}>
                                            <View>
                                                <Text style={{ fontWeight: "bold" }}>{item2.name}</Text>
                                            </View>
                                            <View style={{ alignItems: "flex-end", justifyContent: "flex-end", flex: 1 }}>
                                                <SelectDropdown
                                                    data={pref}
                                                    onSelect={(selectedItem) => {
                                                        console.log("Dropdown")
                                                        console.log(selectedItem, index);
                                                        let QA = [...QandA]
                                                        let ans = [...item.answer]
                                                        ans[index2] = { ...ans[index2], proficiency: selectedItem.title }
                                                        QA[index] = { ...QA[index], answer: ans }
                                                        console.log('QA', QA)
                                                        setQandA(QA)
                                                    }}
                                                    defaultButtonText={'Beginner'}

                                                    buttonTextAfterSelection={(selectedItem, index) => {
                                                        return selectedItem.title;
                                                    }}
                                                    rowTextForSelection={(item, index) => {
                                                        return item.title;
                                                    }}
                                                    buttonStyle={styles.dropdown1BtnStyle}
                                                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                                    // renderDropdownIcon={isOpened => {
                                                    //     return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                                                    // }}
                                                    dropdownIconPosition={'right'}
                                                    dropdownStyle={styles.dropdown1DropdownStyle}
                                                    rowStyle={styles.dropdown1RowStyle}
                                                    rowTextStyle={styles.dropdown1RowTxtStyle}
                                                />
                                            </View>
                                        </View>
                                    )
                                }
                            </View>
                        }

                    </View>


                )
            })}
            <ButtonView
                title='Apply'
                disabled={!enableApply}
                containerStyle={{ justifyContent: "flex-end", margin: 16 }}
                buttonStyle={{ backgroundColor: colors.accent, borderColor: colors.accent }}
                onPress={_onApply}
            />
        </View>
    )

}

export default ScreeningQuestionItem

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    textColor: {
        color: colors.black
    },
    header: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
    },
    headerTitle: { color: '#000', fontWeight: 'bold', fontSize: 16 },
    saveAreaViewContainer: { flex: 1, backgroundColor: '#FFF' },
    viewContainer: { flex: 1, backgroundColor: '#FFF' },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '10%',
    },
    dropdownsRow: { flexDirection: 'row', width: '100%', paddingHorizontal: '5%' },

    dropdown1BtnStyle: {
        flex: 1,
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444'
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
    divider: { width: 12 },
    dropdown2BtnStyle: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown2BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown2DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown2RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown2RowTxtStyle: { color: '#444', textAlign: 'left' },
    error: {
        color: "red",
    }
});