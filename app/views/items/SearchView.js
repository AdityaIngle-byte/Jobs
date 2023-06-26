// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { colors } from '../../values/colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Icon } from 'react-native-elements';
import { images } from '../../assets/images';
import TagButton from '../components/TagButton';
import { Card } from 'react-native-elements';
import { fonts } from '../../values/fonts';
import { getDiffInDaysFromToday } from '../../utils/DateTimeValidations';
import moment from 'moment';

const SearchView = (props) => {

  const { filteredDataSource, setFilteredDataSource, masterDataSource, setMasterDataSource, search, setSearch } = props;

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Card containerStyle={{ borderRadius: 6 }}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <View><Text style={{ fontWeight: "bold", color: colors.black, fontSize: 16 }}>{item.jobTitle}</Text></View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.row}>
                <Item
                  title={item.jobType}
                  iconName='briefcase'
                  iconType='feather'
                />
              </View>
              <View style={styles.row}>
                <Item
                  title={item.workPlaceType ? item.workPlaceType : 'NA'}
                  iconName='map-pin'
                  iconType='feather'
                />
              </View>
            </View>
            <View style={[styles.row, { marginTop: -6 }]}>
              <Item
                title={moment(new Date(item.jobPostDate), "MMDDYYYY").fromNow()}
                iconName='clock'
                iconType='feather'
              />
            </View>
          </View>
          <View style={{ alignItems: "flex-end", flex: 1, justifyContent: "center" }}>
            <TagButton
              title={'Apply Now'}
              onPress={() => props.onPress(item)}
              buttonStyle={{ backgroundColor: colors.newColor, borderColor: colors.newColor }}
              titleStyle={{ color: '#fff' }}
              size={'medium'}
              containerStyle={{ borderRadius: 3 }}
            />
          </View>
        </View>
      </Card>
    );
  };

  const Item = props => {
    const { iconName, iconType, title } = props;
    return (
      <View style={[styles.itemRow, props.style]}>
        <Icon
          name={iconName}
          type={iconType}
          color={colors.defaultTextColor}
          size={14}
        />
        <Text
          style={[styles.text1, { paddingLeft: 4 }]}
          numberOfLines={1}
          ellipsizeMode='tail'
        >{title}</Text>
      </View>
    )
  }


  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  parent: {
    height: 56,
    marginBottom: 10,
    paddingTop: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    flexDirection: 'row',
    // paddingHorizontal:12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: 1
  },
  profileCircle: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
    marginBottom: 6
  },
  logoImage: {
    height: 25,
    width: 80
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    paddingRight: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text1: {
    fontSize: 12,
    lineHeight: 20,
    color: '#666666',
    fontFamily: fonts.notoSansRegular,
    paddingBottom: 4,
    textAlignVertical: 'center',
    marginTop: 4
  },
  searchBarContainer: {
    flexDirection: 'row',
    borderWidth: 0.2,
    borderColor: colors.placeholderTextColor,
    flex: 1,
    marginRight: 8,
    borderRadius: 4,
    height: 38
  }
});

export default SearchView;