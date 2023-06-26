import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Icon } from 'react-native-elements'
import MapView, { Marker } from 'react-native-maps'
import { connect } from 'react-redux'
import { colors } from '../../../values/colors'
import { fonts } from '../../../values/fonts';
import HeaderView from '../../components/HeaderView'
import ButtonView from '../../components/ButtonView'
import MyStatusBar from '../../components/MyStatusBar'
import InputView2 from '../../components/InputView2'
import AddAddress from '../add/AddAddress'
import { getAddressFromLatLong, getCurrentLocation, getFormattedAddress, getSearchedLocation } from './LocationServices'
import { checkLocationPermissions } from '../../../utils/PermissionsCheck'

class SelectAddress extends Component {

    constructor(props) {
        super(props)
        this.state = {
            initialRegion: {
                latitude: 30.747560,
                longitude: 76.596995,
                latitudeDelta: 0.04,
                longitudeDelta: 0.05,
            },
            title: '',
            description: '',
            mapTypeIndex: 0,
            mapType: 'standard',
            isAddressViewCollapsed: false,
            searchText: '',
            addressesList: [],
            isRefreshing: false,
            isModalVisible: false,
            fullAddress: null,
            googleApiAddress: null
        }
    }


    componentDidMount = () => {
        this._init()
    }


    _init = () => {
        // this._getCurrentLocation()
        this._checkLocationPermissions()
    }

    _checkLocationPermissions = () => {
        checkLocationPermissions()
            .then(response => {
                this._getCurrentLocation()
            })
            .catch(error => {

            })
    }


    _getCurrentLocation = () => {
        getCurrentLocation()
            .then(location => {
                // console.log('[SelectAddress.js] Current Location : ',location)
                this._getLocationFromLatLong(location.coords.latitude, location.coords.longitude)
            })
    }


    _onBackPress = () => {
        this.props.navigation.goBack()
    }


    _onMapPress = (data) => {
        const coordinates = data.nativeEvent.coordinate
        console.log('On Map Press :', coordinates)

        this.setState({
            initialRegion: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.05,
            }
        })

        this._getLocationFromLatLong(coordinates.latitude, coordinates.longitude)

    }


    _getLocationFromLatLong = (lat, lng) => {
        getAddressFromLatLong(lat, lng)
            .then(response => {
                // console.log('[SelectAddress.js] Get Address from location response : ',response)
                if (response.length > 0) {
                    const { formatted_address, geometry } = response[0]
                    this.setState({
                        title: '',
                        description: formatted_address,
                        initialRegion: {
                            latitude: geometry.location.lat,
                            longitude: geometry.location.lng,
                            latitudeDelta: 0.04,
                            longitudeDelta: 0.05,
                        },
                        googleApiAddress: response[0],
                        // isAddressViewCollapsed : !this.state.isAddressViewCollapsed
                    }, () => {
                        this.mapView.animateToRegion(this.state.initialRegion, 2000)
                    })
                }
            })
            .catch(error => {
                console.log('[SelectAddress.js] Get Address from location error : ', error)
            })
    }



    _updateMapIndex = (index) => {
        console.log('Index : ', index)

        let mapType = 'standard'
        if (index === 1) {
            mapType = 'satellite'
        } else if (index === 2) {
            mapType = 'hybrid'
        }

        this.setState({
            mapTypeIndex: index,
            mapType: mapType
        })
    }


    _setRefreshing = (flag) => {
        this.setState({
            isRefreshing: flag
        })
    }

    _onSearchText = (text) => {
        this.setState({
            searchText: text
        })

        this._setRefreshing(true)
        if (text.length > 2) {
            getSearchedLocation(text)
                .then(response => {
                    this._setRefreshing(false)
                    // console.log('[SelectAddress.js] Address Searched List : ',response)
                    this.setState({
                        addressesList: response
                    })

                })
                .catch(error => {
                    this._setRefreshing(false)
                    console.log('[SelectAddress.js] Address Searched Error : ', error)
                })
        }
    }


    _renderAddressItem = ({ item, index }) => {

        const { icon, name, formatted_address } = item
        return (

            <TouchableOpacity onPress={() => this._onItemPress(item)}>
                <View style={styles.itemParent}>
                    <Image
                        source={{ uri: icon }}
                        style={{ height: 16, width: 16, marginRight: 8, tintColor: '#888' }}
                        resizeMode={'contain'}
                    />
                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#d4d4d4', flex: 1, paddingBottom: 4 }}>
                        <Text style={styles.itemName}>{name}</Text>
                        <Text
                            style={styles.itemAddress}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >{formatted_address}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    _onItemPress = (item) => {
        const { geometry, name, formatted_address } = item

        // console.log('[SelectAddress.js] On Item Press : ',item)
        this.setState({
            title: name,
            description: formatted_address,
            initialRegion: {
                latitude: geometry.location.lat,
                longitude: geometry.location.lng,
                latitudeDelta: 0.04,
                longitudeDelta: 0.05,
            },
            googleApiAddress: item,
            isAddressViewCollapsed: !this.state.isAddressViewCollapsed
        }, () => {
            this.mapView.animateToRegion(this.state.initialRegion, 2000)
        })

    }


    _onSave = (address) => {


        const { initialRegion } = this.state;

        // const data = {
        //     ...address,
        //     ...initialRegion
        // }
        // console.log('[SelectAddress.js] On Save :',data)


        this.props.route.params.onGoBack(address)
        this._onBackPress()
    }



    _onConfirmLocation = () => {
        // console.log('[SelectAddress.js] On Confirm Location :',this.props)

        const { title, description, initialRegion } = this.state;

        const data = {
            title: title,
            address: description,
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude
        }

        getAddressFromLatLong(initialRegion.latitude, initialRegion.longitude)
            .then(response => {
                // console.log('[SelectAddress.js] On Confirm :',response)
                if (response.length > 0) {
                    const address = getFormattedAddress(response[0].address_components);
                    address['latlong'] = {
                        latitude: initialRegion.latitude,
                        longitude: initialRegion.longitude
                    }
                    // console.log('[SelectAddress.js] On Confirm Address:',address)
                    // this.props.route.params.onGoBack(address)
                    // this._onBackPress()
                    this.addAddressModal.baseModal.showModal();
                    this.addAddressModal.init(address)
                }
            })
            .catch(error => {
                console.log('[SelectAddress.js] On Save Error:', error)
            })


        // this.props.navigation.navigate('AddAddress',{'address' : data})
        // this.addAddressModal.showModal(data)
        // this.setState({
        //     isModalVisible : true,
        //     fullAddress : data
        // })

    }


    _onChooseOtherLocation = () => {
        this.setState({
            initialRegion: {
                latitude: 30.747560,
                longitude: 76.596995,
                latitudeDelta: 0.04,
                longitudeDelta: 0.05,
            },
            title: '',
            description: '',
            isAddressViewCollapsed: false,
            fullAddress: null,
            googleApiAddress: null
        })
    }



    render() {

        const { initialRegion, title, description, mapTypeIndex, mapType, isAddressViewCollapsed,
            searchText, addressesList, isRefreshing, isModalVisible, fullAddress
        } = this.state;

        const mapTypeButtons = ['Standard', 'Satellite', 'Hybrid']

        return (

            <View style={{ flex: 1 }}
            // ref={ref=>this.baseView=ref}
            // hasStatusBar
            // hasHeader
            // hasBack
            // onBackPress={() => this.props.navigation.goBack()}
            // headerTitle='SELECT ADDRESS'
            // navigation={this.props.navigation}
            // hasRefreshing
            // onRefresh={() => {}}
            >

                <MyStatusBar
                    statusBarColor={colors.black}

                />

                <HeaderView
                    parentStyle={{ backgroundColor: colors.white }}
                    hasBack
                    onBackPress={() => this.props.navigation.goBack()}
                    title='Select Address'
                    hasTitle
                    onNotificationPress={() => this.props.navigation.navigate('Notifications')}
                />
                <View style={styles.parent}>
                    {
                        initialRegion !== null
                        &&
                        <MapView
                            initialRegion={initialRegion}
                            style={styles.mapView}
                            onPress={this._onMapPress}
                            mapType={mapType}
                            ref={ref => this.mapView = ref}
                            showsUserLocation
                        >

                            <Marker
                                coordinate={{ latitude: initialRegion.latitude, longitude: initialRegion.longitude }}
                                draggable
                                title={title}
                                description={description}
                            >
                                {/* <Image 
                                source={localImagesPath.locationPin}
                                style={{height:56,width:56}}
                                resizeMode='contain'
                            /> */}
                            </Marker>
                        </MapView>
                    }
                    {
                        !isAddressViewCollapsed
                        &&
                        <View style={styles.addressParent}>

                            <Collapsible collapsed={isAddressViewCollapsed}>
                                <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
                                    <InputView2
                                        placeholder={'Search Your Location city, state, zipcode'}
                                        value={searchText}
                                        onChangeText={text => this._onSearchText(text)}
                                    />

                                    {/* Current location view */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._getCurrentLocation()
                                            this.setState({
                                                isAddressViewCollapsed: !isAddressViewCollapsed
                                            })
                                        }}
                                    >
                                        <View style={styles.itemParent}>
                                            <Icon
                                                name='locate'
                                                type='ionicon'
                                                containerStyle={{ paddingRight: 4 }}
                                                color={colors.primary}
                                            />
                                            <Text style={styles.itemName}>Use Current Location</Text>
                                        </View>
                                    </TouchableOpacity>

                                    {/* searched locations list */}
                                    <FlatList
                                        data={addressesList}
                                        renderItem={this._renderAddressItem}
                                        style={{ backgroundColor: '#fff' }}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={isRefreshing}
                                                onRefresh={() => { }}
                                            />
                                        }
                                        contentContainerStyle={{ paddingBottom: 48 }}
                                        showsVerticalScrollIndicator={false}
                                    />
                                </View>
                            </Collapsible>
                        </View>
                    }
                </View>
                {
                    isAddressViewCollapsed
                    &&
                    <Collapsible
                        collapsed={!isAddressViewCollapsed}
                        style={styles.confirmAddressView}
                    >
                        <View>
                            <Text style={styles.yourLocationText}>Your Location</Text>
                            <Text style={styles.addressText}>{title !== '' ? title + ',' : ''} {description}</Text>
                        </View>
                        <ButtonView
                            title={'Confirm Location'}
                            onPress={() => this._onConfirmLocation()}
                            parentStyle={{}}
                        />
                        <TouchableOpacity
                            style={{ marginBottom: 24 }}
                            onPress={() => this._onChooseOtherLocation()}
                        >
                            <Text style={styles.chooseOtherLocation}>Choose other location</Text>
                        </TouchableOpacity>
                    </Collapsible>
                }
                <AddAddress
                    ref={ref => this.addAddressModal = ref}
                    onSavePress={this._onSave}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mapView: {
        flex: 1,
        position: 'absolute',
        top: 0, bottom: 0, right: 0, left: 0
    },
    mapTypeButtons: {
        position: 'absolute',
        width: 164,
        height: 24,
        zIndex: 100,
        right: 0, top: 12
    },
    addressParent: {
        backgroundColor: '#fff',
        paddingBottom: 24,
        // paddingTop:8,
        // height:'100%'
        // paddingHorizontal:16,
        flex: 1,
        // // height:560,
        // position:'absolute',
        // top:0,bottom:0,right: 0,left:0
    },
    selectAddressText: {
        fontSize: 10,
        fontFamily: fonts.poppinsSemiBold
    },
    yourLocationText: {
        fontSize: 12,
        fontFamily: fonts.poppinsSemiBold,
        color: '#888'
    },
    addressText: {
        fontSize: 14,
        fontFamily: fonts.poppinsSemiBold,
        color: colors.accent
    },
    addressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemParent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#fff'
    },
    itemName: {
        fontSize: 14,
        fontFamily: fonts.poppinsSemiBold,
        color: colors.accent
    },
    itemAddress: {
        fontSize: 12,
        fontFamily: fonts.poppinsSemiBold,
        color: '#888',
    },
    confirmAddressView: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        // flex:1
        // position:'absolute',
        // bottom:0,left:0,right:0
    },
    chooseOtherLocation: {
        fontSize: 14,
        fontFamily: fonts.notoSansMedium,
        color: colors.darkBlueColor,
        fontWeight: '700',
        textAlign: 'center',
        padding: 4
    }

});

const mapStateToProps = () => ({

})

const mapDispatchToProps = () => {
    return {

    }

}

export default SelectAddress

