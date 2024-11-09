// src/utils/calculateStreak.js
export function calculateStreak(completedActions) {
    let streak = 0;
    let currentDate = new Date();
  
    // Sort actions by completedAt descending
    completedActions.sort(
      (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
    );
  
    for (let action of completedActions) {
      const actionDate = new Date(action.completedAt);
      const diffTime = currentDate - actionDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
      if (diffDays === 0) {
        // Action completed today
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (diffDays === 1) {
        // Action completed yesterday
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        // Streak broken
        break;
      }
    }
  
    return streak;
  }
  