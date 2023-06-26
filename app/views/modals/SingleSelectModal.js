import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { StyleSheet, View } from 'react-native'
import ButtonView from '../components/ButtonView'
import InputView2 from '../components/InputView2'
import BaseBottomSheet from '../hoc/BaseBottomSheet'
import SingleSelectItem from '../items/SingleSelectItem'
import { colors } from '../../values/colors'

class SingleSelectModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            list: [],
            searchText: '',
        }
        this.searchedList = []
    }



    init = list => {
        this.setState({ list: list })
        this.searchedList = list
    }


    _onSearchText = (text) => {
        this.setState({ searchText: text })
        if (this.searchedList !== undefined) {
            const newData = this.searchedList.filter(item => {
                if (Object.entries(item).length != 0 && item !== null) {
                    const itemData = `${item.name.toUpperCase()}`;
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
            })
            if (text != null) {
                this.setState({
                    list: newData
                })
            } else if (text == "") {
                this.setState({
                    list: []
                })
            }
        }
    }


    renderItem = ({ item, index }) => {
        return (
            <SingleSelectItem
                title={item.name}
                onPress={() => {
                    this.props.onSetItem(item)
                    this.baseModal.hideModal()
                    this.setState({ searchText: '' })
                }}
            />
        )
    }

    render() {
        const { list, searchText } = this.state;
        return (
            <BaseBottomSheet
                ref={ref => this.baseModal = ref}
            >
                <View style={styles.parent}>
                    <InputView2
                        placeholder={'Search item here...'}
                        value={searchText}
                        onChangeText={text => this._onSearchText(text)}
                    />
                    <FlatList
                        data={list}
                        renderItem={this.renderItem}
                    />
                    <ButtonView
                        title='Cancel'
                        onPress={() => {
                            this.baseModal.hideModal()
                            this.setState({ searchText: '' })
                        }}
                        buttonStyle={{ backgroundColor: colors.accent, borderColor: colors.accent }}
                    />
                </View>
            </BaseBottomSheet>
        )
    }
}

export default SingleSelectModal

const styles = StyleSheet.create({
    parent: {
        backgroundColor: '#fff',
        // height:164,
        borderRadius: 8,
        // paddingTop:8
        // marginHorizontal:20,
        paddingBottom: 8,
        // paddingHorizontal:16,
        // maxHeight:480,
        height: 480
    }
})


