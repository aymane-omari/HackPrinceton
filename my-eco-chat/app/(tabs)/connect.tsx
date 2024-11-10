// app/(tabs)/connect.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Switch,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const services = [
  {
    id: 'maps',
    name: 'Google Maps',
    icon: 'map-outline',
    category: 'Transportation',
    color: '#4285F4',
    description: 'Connect your Google Maps to track your transportation modes and calculate carbon savings.',
    permissions: [
      'Location History',
      'Transportation Modes',
      'Trip Duration'
    ],
    benefits: [
      'Automatic transport mode detection',
      'Carbon footprint calculation',
      'Route optimization suggestions'
    ],
    isConnected: true
  },
  {
    id: 'wallet',
    name: 'Digital Wallet',
    icon: 'wallet-outline',
    category: 'Spending',
    color: '#000000',
    description: 'Link your digital wallet to analyze your sustainable purchases and track green spending.',
    permissions: [
      'Transaction History',
      'Merchant Information',
      'Purchase Categories'
    ],
    benefits: [
      'Sustainable product tracking',
      'Green spending insights',
      'Eco-friendly store recommendations'
    ],
    isConnected: true
  },
  {
    id: 'utility',
    name: 'Utility Provider',
    icon: 'flash-outline',
    category: 'Energy',
    color: '#22C55E',
    description: 'Connect your utility account to monitor energy usage and get efficiency recommendations.',
    permissions: [
      'Energy Usage Data',
      'Billing Information',
      'Usage Patterns'
    ],
    benefits: [
      'Real-time energy monitoring',
      'Usage optimization tips',
      'Cost-saving suggestions'
    ],
    isConnected: false
  },
  {
    id: 'health',
    name: 'Apple Health',
    icon: 'fitness-outline',
    category: 'Activity',
    color: '#FF2D55',
    description: 'Link your health data to track walking, cycling, and other sustainable activities.',
    permissions: [
      'Step Count',
      'Cycling Distance',
      'Activity Data'
    ],
    benefits: [
      'Automatic activity tracking',
      'Health impact insights',
      'Sustainable exercise suggestions'
    ],
    isConnected: true
  },
  {
    id: 'transit',
    name: 'Transit Card',
    icon: 'train-outline',
    category: 'Transportation',
    color: '#3B82F6',
    description: 'Connect your transit card to track public transportation usage and savings.',
    permissions: [
      'Trip History',
      'Route Information',
      'Usage Patterns'
    ],
    benefits: [
      'Public transit usage tracking',
      'Carbon saving calculations',
      'Route optimization'
    ],
    isConnected: false
  }
];

export default function Connect() {
  const [expandedService, setExpandedService] = useState(null);
  const [connectionStates, setConnectionStates] = useState(
    services.reduce((acc, service) => ({
      ...acc,
      [service.id]: service.isConnected
    }), {})
  );

  const toggleConnection = (serviceId) => {
    setConnectionStates(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const renderService = (service) => {
    const isExpanded = expandedService === service.id;
    const isConnected = connectionStates[service.id];

    return (
      <View key={service.id} style={styles.serviceCard}>
        <TouchableOpacity 
          style={styles.serviceHeader}
          onPress={() => setExpandedService(isExpanded ? null : service.id)}
        >
          <View style={styles.serviceMain}>
            <View style={[styles.iconContainer, { backgroundColor: service.color }]}>
              <Ionicons name={service.icon} size={24} color="white" />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceCategory}>{service.category}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Switch
              value={isConnected}
              onValueChange={() => toggleConnection(service.id)}
              trackColor={{ false: '#D1D5DB', true: '#22C55E' }}
              thumbColor="white"
            />
            <Ionicons 
              name={isExpanded ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color="#6B7280"
              style={{ marginLeft: 8 }}
            />
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.description}>{service.description}</Text>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Required Permissions</Text>
              {service.permissions.map((permission, index) => (
                <View key={index} style={styles.listItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
                  <Text style={styles.listText}>{permission}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Benefits</Text>
              {service.benefits.map((benefit, index) => (
                <View key={index} style={styles.listItem}>
                  <Ionicons name="leaf" size={16} color="#22C55E" />
                  <Text style={styles.listText}>{benefit}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity 
              style={[
                styles.actionButton,
                isConnected ? styles.disconnectButton : styles.connectButton
              ]}
              onPress={() => toggleConnection(service.id)}
            >
              <Text style={styles.actionButtonText}>
                {isConnected ? 'Disconnect' : 'Connect'} {service.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Connected Services</Text>
        <Text style={styles.headerSubtitle}>
          Connect your accounts to get better insights into your sustainable lifestyle
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {Object.values(connectionStates).filter(Boolean).length}
          </Text>
          <Text style={styles.statLabel}>Connected</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {services.length - Object.values(connectionStates).filter(Boolean).length}
          </Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
      </View>

      <View style={styles.servicesContainer}>
        {services.map(renderService)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  divider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  servicesContainer: {
    padding: 16,
    gap: 16,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  serviceCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandedContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  listText: {
    fontSize: 14,
    color: '#4b5563',
  },
  actionButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  connectButton: {
    backgroundColor: '#22C55E',
  },
  disconnectButton: {
    backgroundColor: '#EF4444',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});