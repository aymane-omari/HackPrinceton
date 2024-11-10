// app/(tabs)/chat.tsx
import { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useActions } from '../../contexts/ActionsContext';
import { getChatResponse } from '../../services/groqService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

// Helper function to generate unique IDs
const generateId = (() => {
  let counter = 0;
  return (prefix: string) => `${prefix}_${Date.now()}_${counter++}`;
})();

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'initial_message', 
      text: "Hi! I'm your eco-companion. I'd love to learn about your daily routines and help you develop more sustainable habits. What's your typical day like?", 
      sender: 'ai' 
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { addAction } = useActions();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const formatChatHistory = useCallback(() => {
    return messages
      .slice(-10)
      .map(msg => `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.text}`)
      .join('\n');
  }, [messages]);

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = {
        id: generateId('user'),
        text: message.trim(),
        sender: 'user',
      };
      
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      Keyboard.dismiss();
      setLoading(true);

      try {
        const response = await getChatResponse(
          message.trim(),
          formatChatHistory()
        );
        
        // Add AI's response message
        const aiMessage = {
          id: generateId('ai'),
          text: response.message,
          sender: 'ai',
        };
        setMessages(prev => [...prev, aiMessage]);

        // If there's an action suggestion, handle it
        if (response.type === 'action_suggestion' && response.action) {
          // Add the action first
          await addAction({
            description: response.action.description,
            impact: response.action.impact,
            difficulty: response.action.difficulty,
          });
        
          // Then add the suggestion message to chat
          setMessages(prev => [...prev, {
            id: generateId('suggestion'),
            text: `💡 I've added a suggestion to your Actions tab: ${response.action.description}`,
            sender: 'ai',
          }]);
        }

      } catch (error) {
        console.error('Error:', error);
        const errorMessage = {
          id: generateId('error'),
          text: 'Sorry, I encountered an error. Please try again.',
          sender: 'ai',
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userBubble : styles.aiBubble
            ]}
          >
            <Text 
              style={[
                styles.messageText,
                msg.sender === 'user' ? styles.userText : styles.aiText
              ]}
            >
              {msg.text}
            </Text>
          </View>
        ))}
        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          placeholderTextColor="#666"
          multiline
          maxHeight={100}
          editable={!loading}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!message.trim() || loading) && styles.sendButtonDisabled
          ]}
          onPress={handleSend}
          disabled={!message.trim() || loading}
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
    backgroundColor: '#f5f5f5',
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 32,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    maxWidth: '80%',
    minWidth: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: '#22C55E',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: 'white',
  },
  aiText: {
    color: '#1F2937',
  },
  loadingContainer: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  loadingText: {
    color: '#4B5563',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 20,
    marginRight: 8,
    fontSize: 16,
    maxHeight: 100,
    color: '#1F2937',
  },
  sendButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    minWidth: 64,
  },
  sendButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});