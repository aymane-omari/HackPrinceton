import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, { text: inputText, sender: 'user' }]);
      // Placeholder for bot response
      setMessages(prevMessages => [
        ...prevMessages,
        { text: inputText, sender: 'user' },
        { text: 'Here is a sustainability suggestion for you.', sender: 'bot' },
      ]);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {item.text}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputArea: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
});
