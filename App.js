import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Welcome To My First Mobile Application</Text>
      <Text></Text>
      <Text style={{ fontSize: 50 }}>ConFusion</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff698' ,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
