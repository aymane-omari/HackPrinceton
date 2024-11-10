import { useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  // This will automatically redirect to the chat tab
  return <Redirect href="/chat" />;
}