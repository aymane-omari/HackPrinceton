import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Sustainability App</Text>
      <Button
        title="Chat with Assistant"
        onPress={() => navigation.navigate('Chat')}
      />
      <Button
        title="Read Sustainability Articles"
        onPress={() => navigation.navigate('Articles')}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
