import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function Actions() {
  const [actions, setActions] = useState([
    {
      id: '1',
      description: 'Use a reusable water bottle',
      impact: 'Reduces plastic waste by ~7 bottles per week',
      status: 'pending',
      difficulty: 'Easy',
    },
    {
      id: '2',
      description: 'Switch to LED bulbs',
      impact: 'Reduces energy consumption by 75%',
      status: 'active',
      difficulty: 'Medium',
    },
  ]);

  const handleAcceptAction = (id) => {
    setActions(prev => 
      prev.map(action => 
        action.id === id 
          ? { ...action, status: 'active' } 
          : action
      )
    );
  };

  const handleCompleteAction = (id) => {
    setActions(prev => 
      prev.map(action => 
        action.id === id 
          ? { ...action, status: 'completed' } 
          : action
      )
    );
  };

  const renderActionCard = (action) => (
    <View key={action.id} style={styles.actionCard}>
      <Text style={styles.actionTitle}>{action.description}</Text>
      <Text style={styles.actionImpact}>{action.impact}</Text>
      <View style={styles.actionFooter}>
        <Text style={[
          styles.difficultyBadge,
          styles[`${action.difficulty}Badge`]
        ]}>
          {action.difficulty}
        </Text>
        {action.status === 'pending' && (
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => handleAcceptAction(action.id)}
          >
            <Text style={styles.buttonText}>Accept Challenge</Text>
          </TouchableOpacity>
        )}
        {action.status === 'active' && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => handleCompleteAction(action.id)}
          >
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Challenges</Text>
        {actions
          .filter(a => a.status === 'active')
          .map(renderActionCard)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suggested Actions</Text>
        {actions
          .filter(a => a.status === 'pending')
          .map(renderActionCard)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Completed</Text>
        {actions
          .filter(a => a.status === 'completed')
          .map(renderActionCard)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  actionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  actionImpact: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  actionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
  },
  easyBadge: {
    backgroundColor: '#DCF7E3',
    color: '#166534',
  },
  mediumBadge: {
    backgroundColor: '#FEF9C3',
    color: '#854D0E',
  },
  hardBadge: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
  },
  acceptButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  completeButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});