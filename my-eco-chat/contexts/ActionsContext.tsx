import { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ActionCompletion {
  date: string;
  points: number;
}

interface Action {
  id: string;
  description: string;
  impact: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'pending' | 'active' | 'completed';
  frequency: 'daily' | 'weekly' | 'monthly' | 'once';
  pointsPerCompletion: number;
  completionHistory: ActionCompletion[];
  streak: number;
  lastCompletedDate?: string;
}

interface ActionsContextType {
  actions: Action[];
  totalPoints: number;
  addAction: (action: Omit<Action, 'id' | 'status' | 'completionHistory' | 'streak'>) => Promise<void>;
  updateActionStatus: (id: string, status: Action['status']) => Promise<void>;
  recordCompletion: (id: string) => Promise<void>;
  hasNewActions: boolean;
  clearNewActionFlag: () => void;
}

const ActionsContext = createContext<ActionsContextType | null>(null);

const calculatePointsForDifficulty = (difficulty: Action['difficulty']): number => {
  switch (difficulty) {
    case 'easy': return 10;
    case 'medium': return 20;
    case 'hard': return 30;
    default: return 10;
  }
};

export function ActionsProvider({ children }: { children: React.ReactNode }) {
  const [actions, setActions] = useState<Action[]>([]);
  const [hasNewActions, setHasNewActions] = useState(false);

  const calculateTotalPoints = (): number => {
    return actions.reduce((total, action) => {
      return total + action.completionHistory.reduce((sum, completion) => sum + completion.points, 0);
    }, 0);
  };

  async function addAction(newAction: Omit<Action, 'id' | 'status' | 'completionHistory' | 'streak'>) {
    try {
      const action: Action = {
        ...newAction,
        id: String(Date.now()),
        status: 'pending',
        completionHistory: [],
        streak: 0,
        pointsPerCompletion: calculatePointsForDifficulty(newAction.difficulty),
      };

      const updatedActions = [...actions, action];
      setActions(updatedActions);
      setHasNewActions(true);
    } catch (error) {
      console.error('Error adding action:', error);
    }
  }

  async function updateActionStatus(id: string, status: Action['status']) {
    try {
      const updatedActions = actions.map(action =>
        action.id === id ? { ...action, status } : action
      );
      setActions(updatedActions);
    } catch (error) {
      console.error('Error updating action:', error);
    }
  }

  async function recordCompletion(id: string) {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const updatedActions = actions.map(action => {
        if (action.id !== id) return action;

        const lastCompletion = action.lastCompletedDate;
        let newStreak = action.streak;
        let bonusPoints = 0;

        // Calculate streak and bonus points
        if (action.frequency === 'daily') {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          if (lastCompletion === yesterdayStr) {
            newStreak += 1;
            bonusPoints = Math.floor(newStreak / 7) * 5; // Bonus points for every week of streak
          } else {
            newStreak = 1;
          }
        }

        const points = action.pointsPerCompletion + bonusPoints;

        return {
          ...action,
          lastCompletedDate: today,
          streak: newStreak,
          completionHistory: [
            ...action.completionHistory,
            { date: today, points }
          ]
        };
      });

      setActions(updatedActions);
    } catch (error) {
      console.error('Error recording completion:', error);
    }
  }

  const clearNewActionFlag = () => {
    setHasNewActions(false);
  };

  return (
    <ActionsContext.Provider value={{
      actions,
      totalPoints: calculateTotalPoints(),
      addAction,
      updateActionStatus,
      recordCompletion,
      hasNewActions,
      clearNewActionFlag,
    }}>
      {children}
    </ActionsContext.Provider>
  );
}

export function useActions() {
  const context = useContext(ActionsContext);
  if (!context) {
    throw new Error('useActions must be used within an ActionsProvider');
  }
  return context;
}