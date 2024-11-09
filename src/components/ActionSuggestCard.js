// src/components/ActionSuggestionCard.js
import React from 'react';

function ActionSuggestionCard({ action, onAccept, onLater }) {
  return (
    <div className="border p-4 rounded-lg mb-2">
      <p>{action.description}</p>
      <div className="mt-2">
        <button
          className="bg-green-500 text-white px-4 py-1 rounded mr-2"
          onClick={() => onAccept(action)}
        >
          Accept
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-1 rounded"
          onClick={() => onLater(action)}
        >
          Later
        </button>
      </div>
    </div>
  );
}

export default ActionSuggestionCard;
