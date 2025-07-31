import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <View style={styles.searchContainer}>
      <Feather name="search" size={20} color="#aaa" style={styles.icon} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={onSearchChange}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#362C36',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 8
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14
  }
});

export default SearchBar;
