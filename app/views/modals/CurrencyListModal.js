import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { currencyList } from '../../json/currencyList'
import ButtonView from '../components/ButtonView'
import InputView2 from '../components/InputView2'
import BaseBottomSheet from '../hoc/BaseBottomSheet'
import SingleSelectItem from '../items/SingleSelectItem'

class CurrencyListModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // isVisible : false,
            searchText: '',
            currencyList: []
        }

        this.searchedList = []

    };



    componentDidMount = () => {
        this._init()
    };


    _init = () => {
        this.setState({
            currencyList: currencyList
        })
        this.searchedList = currencyList
    }



    // setModal = (flag) => {
    //     this.setState({
    //         isVisible : flag
    //     })
    // }

    renderItem = ({ item, index }) => {
        return (
            <SingleSelectItem
                title={`${item.name}, ${item.short_name} ( ${item.symbol} )`}
                onPress={() => {
                    this.props.onItemPress(item)
                    // this.setModal(false)
                    this.baseModal.hideModal()
                }}
            />
        )
    }



    _onSearchText = (text) => {
        this.setState({ searchText: text })
        if (this.searchedList !== undefined) {
            const newData = this.searchedList.filter(item => {
                if (Object.entries(item).length != 0 && item !== null) {
                    const itemData = `${item.name.toUpperCase()} ${item.short_name.toUpperCase()}}`;
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
            })
            if (text != null) {
                this.setState({
                    currencyList: newData
                })
            } else if (text == "") {
                this.setState({
                    currencyList: []
                })
            }
        }
    }



    render() {

        const { isVisible, searchText, currencyList } = this.state;

        return (
            <BaseBottomSheet
                ref={ref => this.baseModal = ref}
            >
                <View style={styles.parent}>
                    <InputView2
                        placeholder={'Search currency here...'}
                        value={searchText}
                        onChangeText={text => this._onSearchText(text)}
                    />
                    <FlatList
                        data={currencyList}
                        renderItem={this.renderItem}
                    />
                    <ButtonView
                        title='Cancel'
                        onPress={() => {
                            // this.setModal(false)
                            this.baseModal.hideModal()
                        }}
                    />
                </View>
            </BaseBottomSheet>
        )
    }
}

export default CurrencyListModal

const styles = StyleSheet.create({
    parent: {
        backgroundColor: '#fff',
        height: 560,
        borderRadius: 8,
        // paddingTop:8
        // marginHorizontal:20,
        paddingBottom: 8,
        // paddingHorizontal:16,
        // paddingTop:16
    }
})
