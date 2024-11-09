import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatBot from '../components/Chatbot';

function ChatScreen() {
  return (
    <View style={styles.container}>
      <ChatBot />
    </View>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
