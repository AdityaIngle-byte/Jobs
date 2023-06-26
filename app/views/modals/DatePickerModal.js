import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { dateFormatYYYYMMDD } from '../../utils/DateTimeValidations';

class DatePickerModal extends Component {

    state = {
        isVisible : false
    }


    showModal = () => {
        this.setState({
            isVisible : true
        })
    }


    hideModal = () => {
        this.setState({
            isVisible : false
        })
    }

    _handleConfirm = (date) => {
        // console.log(date)
        this.props.setDate(dateFormatYYYYMMDD(date))
        this.hideModal()
    }


    render() { 

        const {isVisible} = this.state

        return (
            <DateTimePickerModal
                isVisible={isVisible}
                mode="date"
                onConfirm={this._handleConfirm}
                onCancel={() => this.hideModal()}
                display={Platform.OS==='ios' ? 'inline' : 'default'}
            />
        )
    }
}

export default DatePickerModal

const styles = StyleSheet.create({})
