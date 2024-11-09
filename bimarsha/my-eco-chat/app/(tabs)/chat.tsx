import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: "Hi! I'm your eco-companion. How can I help you today?", sender: 'ai' }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      // Add user message
      const newMessage = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: 'user',
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');

      // Mock AI response
      setTimeout(() => {
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message! I'm here to help with eco-friendly advice.",
          sender: 'ai',
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userBubble : styles.aiBubble
            ]}
          >
            <Text style={[
              styles.messageText,
              msg.sender === 'user' ? styles.userText : styles.aiText
            ]}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          placeholderTextColor="#666"
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#22C55E',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: 'white',
  },
  aiText: {
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 20,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 20,
  },
  sendButtonDisabled: {
    backgroundColor: '#A1A1AA',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});