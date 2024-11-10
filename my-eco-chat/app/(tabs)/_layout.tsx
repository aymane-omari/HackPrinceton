// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useActions } from '../../contexts/ActionsContext';

export default function TabLayout() {
  const { hasNewActions, clearNewActionFlag } = useActions();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#22C55E',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          height: 80,
          paddingTop: 0,     // Removed top padding
          paddingBottom: 15,  // Reduced bottom padding
        },
        tabBarIconStyle: {
          marginTop: 4,      // Reduced top margin for icon
          marginBottom: -3,   // Negative margin to pull label up
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 8,   // Added bottom margin to label
          marginTop: 2,
        },
        headerStyle: {
          backgroundColor: '#22C55E',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
          headerTitle: "Eco Companion"
        }}
      />
      <Tabs.Screen
        name="actions"
        options={{
          title: 'Actions',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="list-outline" size={size} color={color} />
              {hasNewActions && (
                <View 
                  style={{
                    position: 'absolute',
                    right: -6,
                    top: -3,
                    backgroundColor: '#EF4444',
                    borderRadius: 6,
                    width: 12,
                    height: 12,
                    borderWidth: 2,
                    borderColor: 'white',
                  }} 
                />
              )}
            </View>
          ),
          headerTitle: "Eco Actions"
        }}
        listeners={{
          tabPress: () => {
            clearNewActionFlag();
          },
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
          headerTitle: "Sustainability News"
        }}
      />
    <Tabs.Screen
      name="insights"
      options={{
        title: 'Insights',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="bar-chart-outline" size={size} color={color} />
        ),
        headerTitle: "Sustainability Insights"
      }}
    />
    <Tabs.Screen
        name="connect"
        options={{
          title: 'Connect',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="link-outline" size={size} color={color} />
          ),
          headerTitle: "Connect Services"
        }}
      />
    </Tabs>
  );
}
