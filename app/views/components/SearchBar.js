import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { colors } from '../../values/colors';
import InputView from './InputView'
import DropShadow from "react-native-drop-shadow";

export default function SearchBar(props) {
  const { search, setSearch, masterDataSource, setFilteredDataSource } = props;

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.jobTitle
            ? item.jobTitle.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  return (
    <DropShadow
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      }}
    >
      <InputView
        value={search}
        onChangeText={(text) => searchFilterFunction(text)}
        placeholder='Enter key word, Role name or ID '
        placeholderTextColor={'#A9A6A6'}
        parentStyle={styles.parentStyle}
        focusedColor={'#A9A6A6'}
        iconName={'magnify'}
        iconColor={'#A9A6A6'}
        outlineStyle={styles.outlineStyle} // changes the borderColor and and borderRadius when set to outline mode 
      />
    </DropShadow>
  )
}

const styles = StyleSheet.create({
  parentStyle: {
    width: '90%',
    alignSelf: "center",
    marginTop: 20,
    // shadowColor: '#000',
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 3,  
    // elevation: 50,  
    backgroundColor: colors.white
  },
  outlineStyle: {
    borderColor: "#A9A6A6",
    borderWidth: 0.4,
  }
})