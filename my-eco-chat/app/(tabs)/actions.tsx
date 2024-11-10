// import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// import { useActions } from '../../contexts/ActionsContext';
// import { Ionicons } from '@expo/vector-icons';

// export default function Actions() {
//   const { actions, updateActionStatus, recordCompletion, totalPoints } = useActions();

//   const renderActionCard = (action) => {
//     const today = new Date().toISOString().split('T')[0];
//     const completedToday = action.completionHistory.some(
//       completion => completion.date === today
//     );

//     const getNextDueDate = () => {
//       if (action.frequency === 'daily') return 'Today';
//       if (action.frequency === 'weekly') {
//         // Calculate days until next due date
//         const lastCompletion = action.lastCompletedDate
//           ? new Date(action.lastCompletedDate)
//           : new Date(0);
//         const daysUntilDue = 7 - Math.floor((new Date().getTime() - lastCompletion.getTime()) / (1000 * 60 * 60 * 24));
//         return daysUntilDue <= 0 ? 'Today' : `In ${daysUntilDue} days`;
//       }
//       return 'Anytime';
//     };

//     return (
//       <View key={action.id} style={styles.actionCard}>
//         <View style={styles.actionHeader}>
//           <Text style={styles.actionTitle}>{action.description}</Text>
//           <View style={styles.pointsBadge}>
//             <Text style={styles.pointsText}>+{action.pointsPerCompletion}pts</Text>
//           </View>
//         </View>

//         <Text style={styles.actionImpact}>{action.impact}</Text>

//         <View style={styles.statsContainer}>
//           <View style={styles.statItem}>
//             <Text style={styles.statLabel}>Streak</Text>
//             <Text style={styles.statValue}>{action.streak} days</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Text style={styles.statLabel}>Completions</Text>
//             <Text style={styles.statValue}>{action.completionHistory.length}</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Text style={styles.statLabel}>Next due</Text>
//             <Text style={styles.statValue}>{getNextDueDate()}</Text>
//           </View>
//         </View>

//         <View style={styles.actionFooter}>
//           <View style={styles.badges}>
//             <Text style={[
//               styles.difficultyBadge,
//               styles[`${action.difficulty}Badge`]
//             ]}>
//               {action.difficulty}
//             </Text>
//             <Text style={styles.frequencyBadge}>
//               {action.frequency}
//             </Text>
//           </View>

//           {action.status === 'pending' && (
//             <TouchableOpacity
//               style={styles.acceptButton}
//               onPress={() => updateActionStatus(action.id, 'active')}
//             >
//               <Text style={styles.buttonText}>Accept Challenge</Text>
//             </TouchableOpacity>
//           )}
          
//           {action.status === 'active' && (
//             <TouchableOpacity
//               style={[styles.completeButton, completedToday && styles.completedButton]}
//               onPress={() => recordCompletion(action.id)}
//               disabled={completedToday}
//             >
//               <Text style={styles.buttonText}>
//                 {completedToday ? 'Completed Today' : 'Complete'}
//               </Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     );
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.pointsSummary}>
//         <Ionicons name="star" size={24} color="#FFD700" />
//         <Text style={styles.totalPoints}>{totalPoints} Points</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Active Challenges</Text>
//         {actions.filter(a => a.status === 'active').map(renderActionCard)}
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Suggested Actions</Text>
//         {actions.filter(a => a.status === 'pending').map(renderActionCard)}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   pointsSummary: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//     backgroundColor: 'white',
//     marginBottom: 8,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   totalPoints: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginLeft: 8,
//     color: '#1F2937',
//   },
//   section: {
//     padding: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#1F2937',
//   },
//   actionCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 2,
//   },
//   actionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   actionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1F2937',
//     flex: 1,
//     marginRight: 8,
//   },
//   pointsBadge: {
//     backgroundColor: '#DCF7E3',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   pointsText: {
//     color: '#166534',
//     fontWeight: '600',
//     fontSize: 12,
//   },
//   actionImpact: {
//     fontSize: 14,
//     color: '#4B5563',
//     marginBottom: 12,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#F3F4F6',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   statItem: {
//     alignItems: 'center',
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   statValue: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   actionFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   badges: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   difficultyBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     fontSize: 12,
//   },
//   frequencyBadge: {
//     backgroundColor: '#E0E7FF',
//     color: '#3730A3',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     fontSize: 12,
//   },
//   easyBadge: {
//     backgroundColor: '#DCF7E3',
//     color: '#166534',
//   },
//   mediumBadge: {
//     backgroundColor: '#FEF9C3',
//     color: '#854D0E',
//   },
//   hardBadge: {
//     backgroundColor: '#FEE2E2',
//     color: '#991B1B',
//   },
//   acceptButton: {
//     backgroundColor: '#22C55E',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 16,
//   },
//   completeButton: {
//     backgroundColor: '#3B82F6',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 16,
//   },
//   completedButton: {
//     backgroundColor: '#9CA3AF',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
// });


// app/(tabs)/actions.tsx
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useActions } from '../../contexts/ActionsContext';
import { Ionicons } from '@expo/vector-icons';

const EmptyStateCard = ({ title, message, icon }) => (
  <View style={styles.emptyStateCard}>
    <Ionicons name={icon} size={48} color="#22C55E" style={styles.emptyStateIcon} />
    <Text style={styles.emptyStateTitle}>{title}</Text>
    <Text style={styles.emptyStateMessage}>{message}</Text>
  </View>
);

export default function Actions() {
  const { actions, updateActionStatus, recordCompletion, totalPoints } = useActions();

  const renderActionCard = (action) => {
    const today = new Date().toISOString().split('T')[0];
    const completedToday = action.completionHistory.some(
      completion => completion.date === today
    );

    const getNextDueDate = () => {
      if (action.frequency === 'daily') return 'Today';
      if (action.frequency === 'weekly') {
        // Calculate days until next due date
        const lastCompletion = action.lastCompletedDate
          ? new Date(action.lastCompletedDate)
          : new Date(0);
        const daysUntilDue = 7 - Math.floor((new Date().getTime() - lastCompletion.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntilDue <= 0 ? 'Today' : `In ${daysUntilDue} days`;
      }
      return 'Anytime';
    };

    return (
      <View key={action.id} style={styles.actionCard}>
        <View style={styles.actionHeader}>
          <Text style={styles.actionTitle}>{action.description}</Text>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>+{action.pointsPerCompletion}pts</Text>
          </View>
        </View>

        <Text style={styles.actionImpact}>{action.impact}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Streak</Text>
            <Text style={styles.statValue}>{action.streak} days</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Completions</Text>
            <Text style={styles.statValue}>{action.completionHistory.length}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Next due</Text>
            <Text style={styles.statValue}>{getNextDueDate()}</Text>
          </View>
        </View>

        <View style={styles.actionFooter}>
          <View style={styles.badges}>
            <Text style={[
              styles.difficultyBadge,
              styles[`${action.difficulty}Badge`]
            ]}>
              {action.difficulty}
            </Text>
            <Text style={styles.frequencyBadge}>
              {action.frequency}
            </Text>
          </View>

          {action.status === 'pending' && (
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => updateActionStatus(action.id, 'active')}
            >
              <Text style={styles.buttonText}>Accept Challenge</Text>
            </TouchableOpacity>
          )}
          
          {action.status === 'active' && (
            <TouchableOpacity
              style={[styles.completeButton, completedToday && styles.completedButton]}
              onPress={() => recordCompletion(action.id)}
              disabled={completedToday}
            >
              <Text style={styles.buttonText}>
                {completedToday ? 'Completed Today' : 'Complete'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pointsSummary}>
        <Ionicons name="star" size={24} color="#FFD700" />
        <Text style={styles.totalPoints}>{totalPoints} Points</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Challenges</Text>
        {actions.filter(a => a.status === 'active').length > 0 ? (
          actions.filter(a => a.status === 'active').map(renderActionCard)
        ) : (
          <EmptyStateCard
            title="No Active Challenges Yet!"
            message="Start your sustainability journey by accepting challenges below. Every small action counts! 🌱"
            icon="leaf-outline"
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suggested Actions</Text>
        {actions.filter(a => a.status === 'pending').length > 0 ? (
          actions.filter(a => a.status === 'pending').map(renderActionCard)
        ) : (
          <EmptyStateCard
            title="Looking for More Challenges?"
            message="Chat with your eco-companion to discover personalized sustainable actions based on your lifestyle! 💡"
            icon="chatbubble-ellipses-outline"
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pointsSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  totalPoints: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#1F2937',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1F2937',
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
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  pointsBadge: {
    backgroundColor: '#DCF7E3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    color: '#166534',
    fontWeight: '600',
    fontSize: 12,
  },
  actionImpact: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  actionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
  },
  frequencyBadge: {
    backgroundColor: '#E0E7FF',
    color: '#3730A3',
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
  completedButton: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  emptyStateCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  emptyStateIcon: {
    marginBottom: 16,
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 40,
    overflow: 'hidden',
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});